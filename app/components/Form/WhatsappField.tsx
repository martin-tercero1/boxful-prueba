import { Form, Input, Select, Space } from "antd";

const COUNTRY_CODES = [
  { value: '503', label: '🇸🇻 +503' },
  { value: '502', label: '🇬🇹 +502' },
  { value: '504', label: '🇭🇳 +504' },
  { value: '505', label: '🇳🇮 +505' },
  { value: '506', label: '🇨🇷 +506' },
  { value: '507', label: '🇵🇦 +507' },
  { value: '52',  label: '🇲🇽 +52'  },
  { value: '57',  label: '🇨🇴 +57'  },
  { value: '1',   label: '🇺🇸 +1'   },
];

interface WhatsAppFieldProps {
  countryFieldName?: string;
  phoneFieldName?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  phoneRules?: any[];
  initialCountryCode?: string;
}

export function WhatsAppField({ 
  countryFieldName = "codigoPais",
  phoneFieldName = "whatsapp",
  label = "Número de whatsapp",
  placeholder = "7777 7777",
  className = "",
  style = { marginBottom: 20 },
  phoneRules = [
    { required: true, message: 'Ingresa tu número de WhatsApp' },
    { pattern: /^\d{7,15}$/, message: 'Ingresa un número válido (solo dígitos, 7-15 caracteres)' },
  ],
  initialCountryCode = "505"
}: WhatsAppFieldProps) {
  return (
    <Form.Item
      label={<span className="text-[#050817] font-semibold text-xs h-2.5">{label}</span>}
      className={className}
      style={style}
      required
    >
      <Space.Compact style={{ display: 'flex' }}>
        <Form.Item name={countryFieldName} noStyle initialValue={initialCountryCode}>
          <Select
            style={{ width: 110, flexShrink: 0 }}
            options={COUNTRY_CODES}
            popupMatchSelectWidth={180}
          />
        </Form.Item>
        <Form.Item
          name={phoneFieldName}
          noStyle
          rules={phoneRules}
        >
          <Input
            placeholder={placeholder}
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderColor: '#ededed',
              borderLeft: 'none',
              borderRadius: '0 8px 8px 0',
              height: 48,
            }}
          />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  );
}