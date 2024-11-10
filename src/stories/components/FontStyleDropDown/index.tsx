import {Button, Dropdown} from "antd";
import {ChevronDown, Type} from "lucide-react";

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['宋体', '宋体'],
  ['黑体', '黑体'],
  ['仿宋', '仿宋'],
  ['华文仿宋', '华文仿宋'],
  ['楷体', '楷体'],
  ['华文楷体', '华文楷体'],
  ['微软雅黑', '微软雅黑'],
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ['10px', '10px'],
  ['11px', '11px'],
  ['12px', '12px'],
  ['13px', '13px'],
  ['14px', '14px'],
  ['15px', '15px'],
  ['16px', '16px'],
  ['17px', '17px'],
  ['18px', '18px'],
  ['19px', '19px'],
  ['20px', '20px'],
];

type FontStyleDropDownProps = {
  style: 'font-family' | 'font-size';
}

export default function FontStyleDropDown({style}: FontStyleDropDownProps) {
  return (
    <Dropdown
      menu={{
        items: (style === 'font-family' ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
          ([option, text]) => (
            {
              key: option, label: text,
              style: style === 'font-family' ? {fontFamily: option} : {fontSize: option},
            }
          ),
        )
      }}
    >
      <Button type={'text'} icon={<Type/>}>字体<ChevronDown/></Button>
    </Dropdown>
  )
}
