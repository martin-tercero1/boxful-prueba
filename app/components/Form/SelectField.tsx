import { Form, Select } from "antd";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  rules?: any[];
  style?: React.CSSProperties;
}

export function SelectField({ 
  name, 
  label, 
  placeholder = "Seleccionar", 
  options,
  rules = [],
  style = { marginBottom: 20 }
}: SelectFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>{label}</span>}
      rules={rules}
      style={style}
    >
      <Select
        placeholder={placeholder}
        style={{ backgroundColor: '#ffffff' }}
        options={options}
      />
    </Form.Item>
  );
}
