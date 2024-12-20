import {LexicalEditor} from "lexical";
import {Button, Form, Input, message, Modal, Upload, UploadFile, UploadProps} from "antd";
import {Upload as UploadIcon} from "lucide-react"
import {INSERT_IMAGE_COMMAND} from "../../plugins/ImagesPlugin";
import {useState} from "react";


type UploadLocalImageModalProps = {
  activeEditor: LexicalEditor;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  uploadFile: (file: UploadFile[]) => Promise<string[]>;
}

export function UploadLocalImageModal({
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
      messageApi.warning("请选择上传的图片文件");
      return;
    }
    setUploading(true);
    uploadFile(fileList).then((respUrls) => {
      setFileList([]);
      respUrls.forEach((src, index) => {
        form.validateFields()
          .then(values => {
            const text = respUrls.length > 1 ? `${index + 1}_${values.caption}` : values.caption;
            activeEditor.dispatchCommand(
              INSERT_IMAGE_COMMAND,
              {
                altText: text,
                caption: text,
                src,
                showCaption: !!values.caption,
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
        title={"上传本地图片"}
        open={visible}
        width={500}
        afterClose={() => form.resetFields()}
        onCancel={onCancel}
        loading={uploading}
        onOk={handleUpload}
      >
        <Form
          form={form}
          name="insertOnlineImage"
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
            label={'图片说明'}
            name="caption"
          >
            <Input placeholder="请输入图片说明"/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
