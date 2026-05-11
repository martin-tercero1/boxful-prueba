import { Form, DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface DateFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  format?: string;
  disabledDate?: (current: Dayjs) => boolean;
  rules?: any[];
  style?: React.CSSProperties;
}

export function DateField({ 
  name, 
  label, 
  placeholder = "Seleccionar", 
  format = "DD/MM/YYYY",
  disabledDate,
  rules = [],
  style = { marginBottom: 20 }
}: DateFieldProps) {
  return (
    <Form.Item
      name={name}
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      rules={rules}
      style={style}
    >
      <DatePicker
        placeholder={placeholder}
        format={format}
        style={{
          width: '100%',
          backgroundColor: '#ffffff',
          borderColor: '#ededed',
          height: 48,
        }}
        disabledDate={disabledDate}
      />
    </Form.Item>
  );
}
