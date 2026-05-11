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
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      rules={rules}
      style={style}
    >
      <Select
        placeholder={placeholder}
        style={{ backgroundColor: '#ffffff', height: 48 }}
        options={options}
      />
    </Form.Item>
  );
}
