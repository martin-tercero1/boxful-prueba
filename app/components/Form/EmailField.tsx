import { Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

interface EmailFieldProps {
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  rules?: any[];
  style?: React.CSSProperties;
}

export function EmailField({ 
  name = "correo",
  label = "Correo electrónico",
  placeholder = "Digita tu correo",
  className = "",
  inputClassName = "bg-white border-[#ededed] w-full h-12",
  rules = [
    { required: true, message: 'Ingresa tu correo electrónico' },
    { type: 'email', message: 'Ingresa un correo electrónico válido' },
  ],
  style = { marginBottom: 20 }
}: EmailFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      rules={rules}
      className={className}
      style={style}
    >
      <Input
        placeholder={placeholder}
        className={inputClassName}
      />
    </Form.Item>
  );
}