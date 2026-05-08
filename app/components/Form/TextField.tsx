import { Form, Input } from "antd";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any[];
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export function TextField({ 
  name, 
  label, 
  placeholder, 
  rules = [],
  style = { marginBottom: 20 },
  inputStyle = { backgroundColor: '#ffffff', borderColor: '#ededed' }
}: TextFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>{label}</span>}
      rules={rules}
      style={style}
    >
      <Input
        placeholder={placeholder}
        style={inputStyle}
      />
    </Form.Item>
  );
}
