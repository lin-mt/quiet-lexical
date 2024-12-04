import {LexicalEditor} from "lexical";
import {Button, Form, Input, message, Modal, Upload, UploadFile, UploadProps} from "antd";
import {Upload as UploadIcon} from "lucide-react"
import {useState} from "react";
import {INSERT_FILE_COMMAND} from "../../plugins/FilePlugin";


type UploadLocalImageModalProps = {
  activeEditor: LexicalEditor;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  uploadFile: (file: UploadFile[]) => Promise<string[]>;
}

export function UploadLocalFileModal({
                                       activeEditor,
                                       visible,
                                       onCancel,
                                       onOk,
                                       uploadFile
                                     }: UploadLocalImageModalProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (fileList.length < 1) {
      messageApi.warning("请选择上传的文件");
      return;
    }
    setUploading(true);
    uploadFile(fileList).then((respUrls) => {
      setFileList([]);
      respUrls.forEach((href) => {
        form.validateFields()
          .then(values => {
            activeEditor.dispatchCommand(
              INSERT_FILE_COMMAND,
              {
                ...values,
                href,
              }
            );
            onOk();
          })
      })
    }).finally(() => {
      setUploading(false);
    })
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      {contextHolder}
      <Modal
        centered={true}
        title={"上传本地文件"}
        open={visible}
        width={500}
        afterClose={() => form.resetFields()}
        onCancel={onCancel}
        loading={uploading}
        onOk={handleUpload}
      >
        <Form
          form={form}
          name="insertLocalFile"
          labelCol={{span: 5}}
        >
          <Form.Item
            label={'本地文件'}
          >
            <Upload {...props}>
              <Button icon={<UploadIcon/>}>选择文件</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label={'文件名'}
            name="fileName"
            rules={[{required: true, message: '请输入文件名'}]}
          >
            <Input placeholder="请输入文件名"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
