import {Button, Dropdown, theme} from "antd";
import {ChevronDown, RemoveFormatting, Strikethrough, Subscript, Superscript} from "lucide-react";
import React, {useCallback} from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  FORMAT_TEXT_COMMAND,
  LexicalEditor
} from "lexical";
import {$isTableSelection} from "@lexical/table";
import {$getNearestBlockElementAncestorOrThrow} from "@lexical/utils";
import {$isHeadingNode, $isQuoteNode} from "@lexical/rich-text";
import {$isDecoratorBlockNode} from "@lexical/react/LexicalDecoratorBlockNode";
import {getActiveBgColor} from "../../utils/color.ts";

type MarkDropDownProps = {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  isStrikethrough: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
}

export default function MarkDropDown({
                                       editor,
                                       activeEditor,
                                       isStrikethrough,
                                       isSubscript,
                                       isSuperscript
                                     }: MarkDropDownProps): React.JSX.Element {

  const {token} = theme.useToken();

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || $isTableSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();
        const extractedNodes = selection.extract();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            // Use a separate variable to ensure TS does not lose the refinement
            let textNode = node;
            if (idx === 0 && anchor.offset !== 0) {
              textNode = textNode.splitText(anchor.offset)[1] || textNode;
            }
            if (idx === nodes.length - 1) {
              textNode = textNode.splitText(focus.offset)[0] || textNode;
            }
            /**
             * If the selected text has one format applied
             * selecting a portion of the text, could
             * clear the format to the wrong portion of the text.
             *
             * The cleared text is based on the length of the selected text.
             */
              // We need this in case the selected text only has one format
            const extractedTextNode = extractedNodes[0];
            if (nodes.length === 1 && $isTextNode(extractedTextNode)) {
              textNode = extractedTextNode;
            }

            if (textNode.__style !== '') {
              textNode.setStyle('');
            }
            if (textNode.__format !== 0) {
              textNode.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(textNode).setFormat('');
            }
            // node = textNode;
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat('');
          }
        });
      }
    });
  }, [activeEditor]);


  return (
    <Dropdown
      menu={{
        items: [{
          key: 'strikethrough',
          icon: <Strikethrough/>,
          label: '删除线',
          style: getActiveBgColor(isStrikethrough, token),
          onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
        }, {
          key: 'subscript',
          icon: <Subscript/>,
          label: '下角标',
          style: {marginTop: token.marginXXS, ...getActiveBgColor(isSubscript, token)},
          onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
        }, {
          key: 'superscript',
          icon: <Superscript/>,
          label: '上角标',
          style: {marginTop: token.marginXXS, ...getActiveBgColor(isSuperscript, token)},
          onClick: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')
        }, {
          key: 'clear',
          icon: <RemoveFormatting/>,
          label: '清除格式',
          style: {marginTop: token.marginXXS},
          onClick: clearFormatting
        }]
      }}
    >
      <Button type={'text'}>Aa<ChevronDown/></Button>
    </Dropdown>
  )
}
