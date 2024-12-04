import {LexicalEditor} from "lexical";
import {Form, InputNumber, Modal} from "antd";
import {INSERT_TABLE_COMMAND} from "@lexical/table";


type InsertTableModalProps = {
  activeEditor: LexicalEditor;
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
}

export default function InsertTableModal({activeEditor, visible, onCancel, onOk}: InsertTableModalProps) {

  const [form] = Form.useForm();

  return (
    <Modal
      centered={true}
      title={"插入表格"}
      open={visible}
      width={260}
      afterClose={() => form.resetFields()}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields()
          .then(values => {
            activeEditor.dispatchCommand(
              INSERT_TABLE_COMMAND,
              values
            )
            onOk();
          })
      }}
    >
      <Form
        form={form}
        name="insertTable"
        initialValues={{rows: 6, columns: 6}}
      >
        <Form.Item
          label={'行数'}
          name="rows"
          rules={[{required: true, message: '请输入表格行数'}, {
            type: 'number',
            min: 1,
            max: 500,
            message: '行数在 1 ~ 500 之间'
          }]}
        >
          <InputNumber placeholder="请输入表格行数"/>
        </Form.Item>
        <Form.Item
          label={'列数'}
          name="columns"
          rules={[{required: true, message: '请输入表格列数'}, {
            type: 'number',
            min: 1,
            max: 50,
            message: '列数在 1 ~ 50 之间'
          }]}
        >
          <InputNumber placeholder="请输入表格列数"/>
        </Form.Item>
      </Form>
    </Modal>
  );
}
