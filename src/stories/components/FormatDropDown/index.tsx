import {Button, Dropdown} from "antd";
import {
  ChevronDown,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListTodo,
  ListTree,
  SquareCode,
  TextQuote,
  WrapText
} from "lucide-react";

export default function FormatDropDown() {
  return (
    <Dropdown
      menu={{
        items: [{
          key: 'paragraph',
          icon: <WrapText/>,
          label: '正文',
        }, {
          key: 'heading',
          icon: <Heading/>,
          label: '标题',
          children: [
            {
              key: 'h1',
              icon: <Heading1/>,
              label: '一级标题',
            }, {
              key: 'h2',
              icon: <Heading2/>,
              label: '二级标题',
            }, {
              key: 'h3',
              icon: <Heading3/>,
              label: '三级标题',
            }, {
              key: 'h4',
              icon: <Heading4/>,
              label: '四级标题',
            }, {
              key: 'h5',
              icon: <Heading5/>,
              label: '五级标题',
            }, {
              key: 'h6',
              icon: <Heading6/>,
              label: '六级标题',
            }
          ]
        }, {
          key: 'list',
          icon: <ListTree/>,
          label: '列表',
          children: [
            {
              key: 'bullet',
              icon: <List/>,
              label: '无序列表',
            }, {
              key: 'number',
              icon: <ListOrdered/>,
              label: '有序列表',
            }, {
              key: 'check',
              icon: <ListTodo/>,
              label: '待办列表',
            }]
        }, {
          type: 'divider',
        }, {
          key: 'code',
          icon: <SquareCode/>,
          label: '代码块',
        }, {
          key: 'quote',
          icon: <TextQuote/>,
          label: '引用',
        }],
      }}
    >
      <Button type={'text'}>格式化<ChevronDown/></Button>
    </Dropdown>
  )
}
