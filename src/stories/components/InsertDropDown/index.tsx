import {Button, Dropdown, UploadFile} from "antd";
import {
  ChevronDown,
  File,
  FilePlus,
  FileUp,
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
import {InsertOnlineFileModal} from "./InsertFileModal.tsx";
import {UploadLocalFileModal} from "./UploadLocalFileModal.tsx";

type InsertDropDownProps = {
  activeEditor: LexicalEditor;
  uploadFile?: (file: UploadFile[]) => Promise<string[]>;
}

export default function InsertDropDown({activeEditor, uploadFile}: InsertDropDownProps) {

  const [tableModelOpen, setTableModelOpen] = useState<boolean>(false);
  const [insertOnlineImageModelOpen, setInsertOnlineImageModelOpen] = useState<boolean>(false);
  const [insertOnlineFileModelOpen, setInsertOnlineFileModelOpen] = useState<boolean>(false);
  const [uploadLocalImageModelOpen, setUploadLocalImageModelOpen] = useState<boolean>(false);
  const [uploadLocalFileModelOpen, setUploadLocalFileModelOpen] = useState<boolean>(false);

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
                key: 'onlineImage',
                icon: <ImagePlus/>,
                label: '在线图片',
                onClick: () => setInsertOnlineImageModelOpen(true)
              },
              {
                key: 'localImage',
                icon: <ImageUp/>,
                label: '本地图片',
                disabled: !uploadFile,
                onClick: () => setUploadLocalImageModelOpen(true)
              }
            ]
          }, {
            key: 'file',
            icon: <File/>,
            label: '文件',
            children: [
              {
                key: 'onlineFile',
                icon: <FilePlus/>,
                label: '线上文件',
                onClick: () => setInsertOnlineFileModelOpen(true)
              },
              {
                key: 'localFile',
                icon: <FileUp/>,
                label: '本地文件',
                disabled: !uploadFile,
                onClick: () => setUploadLocalFileModelOpen(true)
              }
            ]
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
        visible={insertOnlineImageModelOpen}
        onCancel={() => setInsertOnlineImageModelOpen(false)}
        onOk={() => setInsertOnlineImageModelOpen(false)}
      />
      <InsertOnlineFileModal
        activeEditor={activeEditor}
        visible={insertOnlineFileModelOpen}
        onCancel={() => setInsertOnlineFileModelOpen(false)}
        onOk={() => setInsertOnlineFileModelOpen(false)}
      />
      {uploadFile && <UploadLocalImageModal
        activeEditor={activeEditor}
        visible={uploadLocalImageModelOpen}
        onCancel={() => setUploadLocalImageModelOpen(false)}
        onOk={() => setUploadLocalImageModelOpen(false)}
        uploadFile={uploadFile}
      />}
      {uploadFile && <UploadLocalFileModal
        activeEditor={activeEditor}
        visible={uploadLocalFileModelOpen}
        onCancel={() => setUploadLocalFileModelOpen(false)}
        onOk={() => setUploadLocalFileModelOpen(false)}
        uploadFile={uploadFile}
      />}
    </>
  )
}
