import {Button, ColorPicker, ColorPickerProps, Row, theme, Tooltip} from "antd";
import {ToolbarButton, ToolbarDivider} from "../../components";
import {Bold, Code, Italic, Link, PaintBucket, PencilLine, Redo2, Underline, Undo2} from "lucide-react";

import './index.css'
import FormatDropDown from "../../components/FormatDropDown";
import FontStyleDropDown from "../../components/FontStyleDropDown";
import FontSize from "../../components/FontSize";
import {Dispatch, useState} from "react";
import {ElementFormatType, LexicalEditor} from "lexical";
import {cyan, generate, presetPalettes, red} from "@ant-design/colors";
import MarkDropDown from "../../components/MarkDropDown";
import InsertDropDown from "../../components/InsertDropDown";
import AlignDropDown from "../../components/AlignDropDown";

type ToolbarPluginProps = {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}

export default function ToolbarPlugin({editor, activeEditor, setActiveEditor, setIsLinkEditMode}: ToolbarPluginProps) {

  const {token} = theme.useToken();
  const [elementFormat, setElementFormat] = useState<ElementFormatType>('left');

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
            color: 'rgba(0, 0, 0, 0.88)',
            lineHeight: '20px',
            marginBottom: 8,
          }}>{title}</div>
        )}
        <Picker/>
      </Col>
      <AntDivider type="vertical" style={{height: 'auto'}}/>
      <Col span={12}>
        <Presets/>
      </Col>
    </Row>
  );


  return (
    <Row className={'toolbar'} style={{borderBottomColor: token.colorBorder}}>
      <ToolbarButton icon={<Undo2/>}/>
      <ToolbarButton icon={<Redo2/>}/>
      <ToolbarDivider/>
      <FormatDropDown/>
      <ToolbarDivider/>
      <FontStyleDropDown style={'font-family'}/>
      <ToolbarDivider/>
      <FontSize selectionFontSize={'15'} disabled={false} editor={editor}/>
      <ToolbarDivider/>
      <ToolbarButton
        tooltip={"加粗"}
        icon={<Bold/>}
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
        styles={{popupOverlayInner: {width: 480}}}
        panelRender={createCustomPanelRender("字体颜色")}
      >
        <Tooltip title={"字体颜色"}>
          <Button type={'text'} icon={<PencilLine/>}/>
        </Tooltip>
      </ColorPicker>
      <ColorPicker
        defaultValue={token.colorPrimary}
        styles={{popupOverlayInner: {width: 480}}}
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
