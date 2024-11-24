import {Button, Dropdown, UploadFile} from "antd";
import {
  ChevronDown,
  File,
  Image,
  ImagePlus,
  ImageUp,
  Plus,
  Rows2,
  ScissorsLineDashed,
  Shapes,
  Sigma,
  Table
} from "lucide-react";
import {LexicalEditor} from "lexical";
import {INSERT_HORIZONTAL_RULE_COMMAND} from "@lexical/react/LexicalHorizontalRuleNode";
import {INSERT_PAGE_BREAK} from "../../plugins/PageBreakPlugin";
import {useState} from "react";
import InsertTableModal from "./InsertTableModal.tsx";
import {InsertOnlineImageModal} from "./InsertImageModal.tsx";
import {UploadLocalImageModal} from "./UploadLocalImageModal.tsx";

type InsertDropDownProps = {
  activeEditor: LexicalEditor;
  uploadImage?: (image: UploadFile[]) => Promise<string[]>;
}

export default function InsertDropDown({activeEditor, uploadImage}: InsertDropDownProps) {

  const [tableModelOpen, setTableModelOpen] = useState<boolean>(false);
  const [insertOnlineModelOpen, setInsertOnlineModelOpen] = useState<boolean>(false);
  const [uploadLocalImageModelOpen, setUploadLocalImageModelOpen] = useState<boolean>(false);

  return (
    <>
      <Dropdown
        menu={{
          items: [{
            key: 'separator',
            icon: <Rows2/>,
            label: '分割线',
            onClick: () => {
              activeEditor.dispatchCommand(
                INSERT_HORIZONTAL_RULE_COMMAND,
                undefined,
              );
            }
          }, {
            key: 'scissors',
            icon: <ScissorsLineDashed/>,
            label: '分页线',
            onClick: () => {
              activeEditor.dispatchCommand(
                INSERT_PAGE_BREAK,
                undefined,
              );
            }
          }, {
            key: 'table',
            icon: <Table/>,
            label: '表格',
            onClick: () => setTableModelOpen(true)
          }, {
            key: 'image',
            icon: <Image/>,
            label: '图片',
            children: [
              {
                key: 'online',
                icon: <ImagePlus/>,
                label: '在线图片',
                onClick: () => setInsertOnlineModelOpen(true)
              },
              {
                key: 'local',
                icon: <ImageUp/>,
                label: '本地图片',
                disabled: !uploadImage,
                onClick: () => setUploadLocalImageModelOpen(true)
              }
            ]
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
      <InsertTableModal
        activeEditor={activeEditor}
        visible={tableModelOpen}
        onCancel={() => setTableModelOpen(false)}
        onOk={() => setTableModelOpen(false)}
      />
      <InsertOnlineImageModal
        activeEditor={activeEditor}
        visible={insertOnlineModelOpen}
        onCancel={() => setInsertOnlineModelOpen(false)}
        onOk={() => setInsertOnlineModelOpen(false)}
      />
      {uploadImage && <UploadLocalImageModal
        activeEditor={activeEditor}
        visible={uploadLocalImageModelOpen}
        onCancel={() => setUploadLocalImageModelOpen(false)}
        onOk={() => setUploadLocalImageModelOpen(false)}
        uploadImage={uploadImage}
      />}
    </>
  )
}
