import {LexicalEditor} from "lexical";
import {Form, Input, Modal} from "antd";
import {INSERT_IMAGE_COMMAND} from "../../plugins/ImagesPlugin";


type InsertOnlineImageModalProps = {
  activeEditor: LexicalEditor;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

export function InsertOnlineImageModal({activeEditor, visible, onCancel, onOk}: InsertOnlineImageModalProps) {

  const [form] = Form.useForm();

  return (
    <Modal
      centered={true}
      title={"插入线上图片"}
      open={visible}
      width={500}
      afterClose={() => form.resetFields()}
      onCancel={onCancel}
      onOk={() => {
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
      }}
    >
      <Form
        form={form}
        name="insertOnlineImage"
        labelCol={{span: 5}}
      >
        <Form.Item
          label={'图片链接'}
          name="src"
          rules={[{required: true, message: '请输入图片链接'}]}
        >
          <Input placeholder="请输入图片链接"/>
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
