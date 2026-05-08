import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface PasswordFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export function PasswordField({ 
  name = "contrasena", 
  label = "Contraseña", 
  placeholder = "Digita tu contraseña",
  style = { marginBottom: 48 }
}: PasswordFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>{label}</span>}
      rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
      style={style}
    >
      <Input.Password
        prefix={<LockOutlined style={{ color: '#b8b7b7' }} />}
        placeholder={placeholder}
        style={{ backgroundColor: '#ffffff', borderColor: '#ededed', color: '#050817' }}
      />
    </Form.Item>
  );
}