import {LexicalEditor} from "lexical";
import {Form, Input, Modal} from "antd";
import {INSERT_FILE_COMMAND} from "../../plugins/FilePlugin";

type InsertOnlineFileModalProps = {
  activeEditor: LexicalEditor;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

export function InsertOnlineFileModal({activeEditor, visible, onCancel, onOk}: InsertOnlineFileModalProps) {

  const [form] = Form.useForm();

  return (
    <Modal
      centered={true}
      title={"插入线上文件"}
      open={visible}
      width={500}
      afterClose={() => form.resetFields()}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            activeEditor.dispatchCommand(INSERT_FILE_COMMAND, values);
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
          label={'文件链接'}
          name="href"
          rules={[{required: true, message: '请输入文件链接'}]}
        >
          <Input placeholder="请输入文件链接"/>
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
  );
}
