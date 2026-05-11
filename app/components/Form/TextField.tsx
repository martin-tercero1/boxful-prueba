import { Form, Input } from "antd";

interface TextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any[];
  className?: string;
  inputClassName?: string;
}

export function TextField({ 
  name, 
  label, 
  placeholder, 
  rules = [],
  className = "mb-5",
  inputClassName = "bg-white border-[#ededed] w-full h-12"
}: TextFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      rules={rules}
      className={className}
    >
      <Input
        placeholder={placeholder}
        className={inputClassName}
      />
    </Form.Item>
  );
}
