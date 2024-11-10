import {Button, Col, ColorPicker, ColorPickerProps, Row, theme, Tooltip} from "antd";
import {ToolbarButton, ToolbarDivider} from "../../components";
import {Bold, Code, Italic, Link, PaintBucket, PencilLine, Redo2, Underline, Undo2} from "lucide-react";

import './index.css'
import BlockTypeDropDown from "../../components/BlockTypeDropDown";
import FontStyleDropDown from "../../components/FontStyleDropDown";
import FontSize from "../../components/FontSize";
import {Dispatch, useCallback, useEffect, useRef, useState} from "react";
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  ElementFormatType,
  LexicalEditor,
  NodeKey,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from "lexical";
import {cyan, generate, presetPalettes, red} from "@ant-design/colors";
import MarkDropDown from "../../components/MarkDropDown";
import InsertDropDown from "../../components/InsertDropDown";
import AlignDropDown from "../../components/AlignDropDown";
import {$findMatchingParent, $getNearestNodeOfType, $isEditorIsNestedEditor, mergeRegister} from "@lexical/utils";
import {$isTableSelection} from "@lexical/table";
import {$isLinkNode} from "@lexical/link";
import {$isListNode, ListNode} from "@lexical/list";
import {$isHeadingNode} from "@lexical/rich-text";
import {$isCodeNode, CODE_LANGUAGE_MAP} from "@lexical/code";
import {$getSelectionStyleValueForProperty} from "@lexical/selection";
import {getSelectedNode} from "../../utils/getSelectedNode";
import {BlockTypeToBlockName} from "../../components/BlockTypeDropDown/constant";

const LowPriority = 1;

type ToolbarPluginProps = {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}

export default function ToolbarPlugin({editor, activeEditor, setActiveEditor, setIsLinkEditMode}: ToolbarPluginProps) {

  const {token} = theme.useToken();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] =
    useState<keyof typeof BlockTypeToBlockName>('paragraph');
  const [fontFamily, setFontFamily] = useState<string>('宋体');
  const [fontSize, setFontSize] = useState<string>('15px');
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontColor, setFontColor] = useState<string>('#000');
  const [bgColor, setBgColor] = useState<string>('#fff');
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);


  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');
  const [isImageCaption, setIsImageCaption] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>('');
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null,
  );

  type Presets = Required<ColorPickerProps>['presets'][number];

  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors,
    }));

  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    cyan,
  });

  const createCustomPanelRender = (title: string): ColorPickerProps['panelRender'] => (
    _,
    {components: {Picker, Presets}}
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col flex="auto">
        {title && (
          <div style={{
            fontSize: 12,
            color: token.colorText,
            lineHeight: '20px',
            marginBottom: 8,
          }}>{title}</div>
        )}
        <Picker/>
      </Col>
      <ToolbarDivider/>
      <Col span={12}>
        <Presets/>
      </Col>
    </Row>
  );

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        setIsImageCaption(
          !!rootElement?.parentElement?.classList.contains(
            'image-caption-container',
          ),
        );
      } else {
        setIsImageCaption(false);
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);
      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode,
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in BlockTypeToBlockName) {
            setBlockType(type as keyof typeof BlockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : '',
            );
            return;
          }
        }
      }
      // Handle buttons
      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', '#000'),
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          '#fff',
        ),
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, 'font-family', '宋体'),
      );
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      // If matchingParent is a valid node, pass it's format type
      setElementFormat(
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left',
      );
    }

    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));
      setFontSize(
        $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
      );
    }
  }, [activeEditor, editor]);


  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, $updateToolbar]);


  return (
    <Row className={'toolbar'} style={{borderBottomColor: token.colorBorder}}>
      <ToolbarButton
        disabled={!canUndo}
        icon={<Undo2/>}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
      />
      <ToolbarButton
        disabled={!canRedo}
        icon={<Redo2/>}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
      />
      <ToolbarDivider/>
      <BlockTypeDropDown editor={activeEditor} blockType={blockType}/>
      <ToolbarDivider/>
      <FontStyleDropDown editor={activeEditor} value={fontFamily} style={'font-family'}/>
      <ToolbarDivider/>
      <FontSize selectionFontSize={fontSize.slice(0, -2)} editor={activeEditor}/>
      <ToolbarDivider/>
      <ToolbarButton
        tooltip={"加粗"}
        icon={<Bold style={{strokeWidth: 2.6}}/>}
      />
      <ToolbarButton
        tooltip={"斜体"}
        icon={<Italic/>}
      />
      <ToolbarButton
        tooltip={"下划线"}
        icon={<Underline/>}
      />
      <ToolbarButton
        tooltip={"文本代码"}
        icon={<Code/>}
      />
      <ToolbarButton
        tooltip={"链接"}
        icon={<Link/>}
      />
      <ColorPicker
        defaultValue={token.colorPrimary}
        styles={{popupOverlayInner: {width: 399}}}
        presets={presets}
        panelRender={createCustomPanelRender("字体颜色")}
      >
        <Tooltip title={"字体颜色"}>
          <Button type={'text'} icon={<PencilLine/>}/>
        </Tooltip>
      </ColorPicker>
      <ColorPicker
        defaultValue={token.colorPrimary}
        styles={{popupOverlayInner: {width: 399}}}
        presets={presets}
        panelRender={createCustomPanelRender("背景色")}
      >
        <Tooltip title={"背景色"}>
          <Button type={'text'} icon={<PaintBucket/>}/>
        </Tooltip>
      </ColorPicker>
      <MarkDropDown/>
      <ToolbarDivider/>
      <InsertDropDown/>
      <ToolbarDivider/>
      <AlignDropDown editor={editor} disabled={false} elementFormat={elementFormat}/>
    </Row>
  )
}
