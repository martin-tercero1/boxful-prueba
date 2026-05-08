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

export function WhatsAppField() {
  return (
    <Form.Item
      label={<span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>Número de whatsapp</span>}
      style={{ marginBottom: 20 }}
      required
    >
      <Space.Compact style={{ display: 'flex' }}>
        <Form.Item name="codigoPais" noStyle initialValue="503">
          <Select
            style={{ width: 110, flexShrink: 0 }}
            options={COUNTRY_CODES}
            popupMatchSelectWidth={180}
          />
        </Form.Item>
        <Form.Item
          name="whatsapp"
          noStyle
          rules={[
            { required: true, message: 'Ingresa tu número de WhatsApp' },
            { pattern: /^\d{7,15}$/, message: 'Ingresa un número válido (solo dígitos, 7-15 caracteres)' },
          ]}
        >
          <Input
            placeholder="7777 7777"
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderColor: '#ededed',
              borderLeft: 'none',
              borderRadius: '0 8px 8px 0',
            }}
          />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  );
}