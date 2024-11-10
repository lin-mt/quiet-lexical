import {Button} from "antd";
import {
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListTodo,
  SquareCode,
  TextQuote,
  WrapText
} from "lucide-react";

export const BlockTypeToBlockName = {
  paragraph: <Button icon={<WrapText/>} type={'text'}>正文<ChevronDown/></Button>,
  h1: <Button icon={<Heading1/>} type={'text'}>一级标题<ChevronDown/></Button>,
  h2: <Button icon={<Heading2/>} type={'text'}>二级标题<ChevronDown/></Button>,
  h3: <Button icon={<Heading3/>} type={'text'}>三级标题<ChevronDown/></Button>,
  h4: <Button icon={<Heading4/>} type={'text'}>四级标题<ChevronDown/></Button>,
  h5: <Button icon={<Heading5/>} type={'text'}>五级标题<ChevronDown/></Button>,
  h6: <Button icon={<Heading6/>} type={'text'}>六级标题<ChevronDown/></Button>,
  bullet: <Button icon={<List/>} type={'text'}>无序列表<ChevronDown/></Button>,
  number: <Button icon={<ListOrdered/>} type={'text'}>有序列表<ChevronDown/></Button>,
  check: <Button icon={<ListTodo/>} type={'text'}>待办列表<ChevronDown/></Button>,
  code: <Button icon={<SquareCode/>} type={'text'}>代码块<ChevronDown/></Button>,
  quote: <Button icon={<TextQuote/>} type={'text'}>引用<ChevronDown/></Button>,
}
