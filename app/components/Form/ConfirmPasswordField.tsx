import { Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";

interface ConfirmPasswordFieldProps {
  passwordFieldName?: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export function ConfirmPasswordField({ 
  passwordFieldName = "contrasena",
  label = "Repetir contraseña", 
  placeholder = "Digitar contraseña",
  style = { marginBottom: 32 }
}: ConfirmPasswordFieldProps) {
  return (
    <Form.Item
      name="repetirContrasena"
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      dependencies={[passwordFieldName]}
      rules={[
        { required: true, message: 'Repite tu contraseña' },
        ({ getFieldValue }: { getFieldValue: (name: string) => any }) => ({
          validator(_: any, value: any) {
            if (!value || getFieldValue(passwordFieldName) === value) {
              return Promise.resolve();
            }
            return Promise.reject('Las contraseñas no coinciden');
          },
        }),
      ]}
      style={style}
    >
      <Input.Password
        placeholder={placeholder}
        style={{ backgroundColor: '#ffffff', borderColor: '#ededed', color: '#050817', height: 48 }}
      />
    </Form.Item>
  );
}
