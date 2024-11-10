import {Button, Dropdown} from "antd";
import {ChevronDown, File, Image, Plus, Rows2, ScissorsLineDashed, Shapes, Sigma, Table} from "lucide-react";

export default function InsertDropDown() {
  return (
    <Dropdown

      menu={{
        items: [{
          key: 'separator',
          icon: <Rows2/>,
          label: '分割线',
        }, {
          key: 'scissors',
          icon: <ScissorsLineDashed/>,
          label: '分页线',
        }, {
          key: 'table',
          icon: <Table/>,
          label: '表格',
        }, {
          key: 'image',
          icon: <Image/>,
          label: '图片',
        }, {
          key: 'file',
          icon: <File/>,
          label: '文件',
        }, {
          key: 'equation',
          icon: <Sigma/>,
          label: '数学公式',
        }, {
          key: 'excalidraw',
          icon: <Shapes/>,
          label: 'Excalidraw',
        }]
      }}
    >
      <Button icon={<Plus/>} type={'text'}>
        插入<ChevronDown/>
      </Button>
    </Dropdown>
  )
}
