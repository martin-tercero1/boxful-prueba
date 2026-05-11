import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface PasswordFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  rules?: any[];
}

export function PasswordField({ 
  name = "contrasena", 
  label = "Contraseña", 
  placeholder = "Digita tu contraseña",
  style = { marginBottom: 48 },
  rules = [{ required: true, message: 'Ingresa tu contraseña' }]
}: PasswordFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      rules={rules}
      style={style}
    >
      <Input.Password
        placeholder={placeholder}
        style={{ backgroundColor: '#ffffff', borderColor: '#ededed', color: '#050817', height: 48 }}
        iconRender={(visible) => (visible ? <EyeOutlined style={{ color: '#050817', fontSize: 18 }} /> : <EyeInvisibleOutlined style={{ color: '#050817', fontSize: 18 }} />)}
      />
    </Form.Item>
  );
}