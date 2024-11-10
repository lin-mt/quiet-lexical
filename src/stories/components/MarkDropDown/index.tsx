import {Button, Dropdown} from "antd";
import {ChevronDown, RemoveFormatting, Strikethrough, Subscript, Superscript} from "lucide-react";

export default function MarkDropDown() {
  return (
    <Dropdown
      menu={{
        items: [{
          key: 'strikethrough',
          icon: <Strikethrough/>,
          label: '删除线',
        }, {
          key: 'subscript',
          icon: <Subscript/>,
          label: '下角标',
        }, {
          key: 'superscript',
          icon: <Superscript/>,
          label: '上角标',
        }, {
          key: 'clear',
          icon: <RemoveFormatting/>,
          label: '清除格式',
        }]
      }}
    >
      <Button type={'text'}>Aa<ChevronDown/></Button>
    </Dropdown>
  )
}
