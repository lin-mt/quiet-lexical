import {Button, Dropdown} from "antd";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ChevronDown,
  IndentDecrease,
  IndentIncrease,
} from "lucide-react";
import {
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND
} from "lexical";

type AlignDropDownProps = {
  editor: LexicalEditor;
  disabled: boolean;
  elementFormat: ElementFormatType;
}

function getElementFormatName(elementFormat: ElementFormatType) {
  switch (elementFormat) {
    case "left":
      return <Button icon={<AlignLeft/>} type={'text'}>左对齐<ChevronDown/></Button>;
    case "center":
      return <Button icon={<AlignCenter/>} type={'text'}>居中对齐<ChevronDown/></Button>;
    case "right":
      return <Button icon={<AlignRight/>} type={'text'}>右对齐<ChevronDown/></Button>;
    case "justify":
      return <Button icon={<AlignJustify/>} type={'text'}>两端对齐<ChevronDown/></Button>;
    default:
      return <Button type={'text'}>暂不支持</Button>
  }
}

export default function AlignDropDown({editor, elementFormat}: AlignDropDownProps) {

  return (
    <Dropdown
      menu={{
        items: [{
          key: 'left',
          icon: <AlignLeft/>,
          label: '左对齐',
          onClick: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
        }, {
          key: 'center',
          icon: <AlignCenter/>,
          label: '居中对齐',
          onClick: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
        }, {
          key: 'right',
          icon: <AlignRight/>,
          label: '右对齐',
          onClick: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
        }, {
          key: 'justify',
          icon: <AlignJustify/>,
          label: '两端对齐',
          onClick: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
        }, {
          type: 'divider'
        }, {
          key: 'indentDecrease',
          icon: <IndentDecrease/>,
          label: '减少缩进',
          onClick: () => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
        }, {
          key: 'IndentIncrease',
          icon: <IndentIncrease/>,
          label: '添加缩进',
          onClick: () => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }]
      }}
    >
      {getElementFormatName(elementFormat || 'left')}
    </Dropdown>
  )
}
