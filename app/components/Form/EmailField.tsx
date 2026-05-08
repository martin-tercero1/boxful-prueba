import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

export function EmailField() {
  return (
    <Form.Item
      name="correo"
      label={<span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>Correo electrónico</span>}
      rules={[
        { required: true, message: 'Ingresa tu correo electrónico' },
        { type: 'email', message: 'Ingresa un correo electrónico válido' },
      ]}
      style={{ marginBottom: 20 }}
    >
      <Input
        prefix={<MailOutlined style={{ color: '#b8b7b7' }} />}
        placeholder="Digita tu correo"
        style={{ backgroundColor: '#ffffff', borderColor: '#ededed', color: '#050817' }}
      />
    </Form.Item>
  );
}