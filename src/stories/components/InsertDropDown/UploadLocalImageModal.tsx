import {LexicalEditor} from "lexical";
import {Button, Form, GetProp, Input, Modal, Upload, UploadFile, UploadProps} from "antd";
import {Upload as UploadIcon} from "lucide-react"
import {INSERT_IMAGE_COMMAND} from "../../plugins/ImagesPlugin";
import {useState} from "react";


type UploadLocalImageModalProps = {
  activeEditor: LexicalEditor;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export function UploadLocalImageModal({activeEditor, visible, onCancel, onOk}: UploadLocalImageModalProps) {

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    // TODO 自己处理图片上传逻辑
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file as FileType);
    });
    setUploading(true);
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        form.validateFields()
          .then(values => {
            activeEditor.dispatchCommand(
              INSERT_IMAGE_COMMAND,
              {
                ...values,
                showCaption: !!values.caption,
              }
            );
            onOk();
          })
      })
      .catch(() => {
      })
      .finally(() => {
        setUploading(false);
      });
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
        style={{marginTop: 20}}
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
  );
}
