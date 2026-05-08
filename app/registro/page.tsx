'use client'

import {
  ConfigProvider,
  Form,
  Input,
  Button,
  Typography,
  Select,
  DatePicker,
  Space,
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Image from 'next/image'

const { Title, Text } = Typography

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
]

type SignupFormValues = {
  nombre: string
  apellido: string
  sexo: string
  fechaNacimiento: Dayjs
  correo: string
  codigoPais: string
  whatsapp: string
  contrasena: string
  repetirContrasena: string
}

const THEME = {
  token: {
    colorPrimary: '#2e49ce',
    borderRadius: 8,
    fontFamily:
      'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    Input: {
      borderRadius: 8,
      paddingBlock: 12,
      paddingInline: 16,
      fontSize: 15,
    },
    Select: {
      borderRadius: 8,
      fontSize: 15,
    },
    DatePicker: {
      borderRadius: 8,
      fontSize: 15,
    },
    Button: {
      borderRadius: 8,
      controlHeight: 52,
      fontSize: 16,
      fontWeight: 600,
    },
  },
}

const labelStyle: React.CSSProperties = {
  color: '#050817',
  fontWeight: 600,
  fontSize: 14,
}

export default function SignupView() {
  const router = useRouter()
  const [form] = Form.useForm<SignupFormValues>()

  const onFinish = (values: SignupFormValues) => {
    console.log('[v0] Register attempt:', values)
  }

  return (
    <ConfigProvider theme={THEME}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left panel — form */}
        <div
          className="flex-1 flex items-start md:items-center justify-center px-6 py-12 md:py-0"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div className="w-full max-w-[640px]">
            {/* Back + heading */}
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => router.push('/')}
                aria-label="Volver al inicio de sesión"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 8px 4px 0',
                  cursor: 'pointer',
                  color: '#4e4c4c',
                  fontSize: 18,
                  lineHeight: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = '#2e49ce')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = '#4e4c4c')
                }
              >
                <LeftOutlined />
              </button>
              <Title
                level={2}
                style={{
                  color: '#16163d',
                  fontWeight: 700,
                  margin: 0,
                  fontSize: 'clamp(22px, 3vw, 30px)',
                }}
              >
                Cuéntanos de ti
              </Title>
            </div>

            <Text
              style={{
                color: '#4e4c4c',
                fontSize: 15,
                display: 'block',
                marginBottom: 32,
              }}
            >
              Completa la información de registro
            </Text>

            {/* Form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="large"
            >
              {/* Row 1 — Nombre / Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Form.Item
                  name="nombre"
                  label={<span style={labelStyle}>Nombre</span>}
                  rules={[
                    { required: true, message: 'Ingresa tu nombre' },
                    { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                    {
                      pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                      message: 'El nombre solo puede contener letras',
                    },
                  ]}
                  style={{ marginBottom: 20 }}
                >
                  <Input
                    placeholder="Digita tu nombre"
                    style={{ backgroundColor: '#ffffff', borderColor: '#ededed' }}
                  />
                </Form.Item>

                <Form.Item
                  name="apellido"
                  label={<span style={labelStyle}>Apellido</span>}
                  rules={[
                    { required: true, message: 'Ingresa tu apellido' },
                    { min: 2, message: 'El apellido debe tener al menos 2 caracteres' },
                    {
                      pattern: /^[a-zA-ZÀ-ÿ\s]+$/,
                      message: 'El apellido solo puede contener letras',
                    },
                  ]}
                  style={{ marginBottom: 20 }}
                >
                  <Input
                    placeholder="Digita tu apellido"
                    style={{ backgroundColor: '#ffffff', borderColor: '#ededed' }}
                  />
                </Form.Item>
              </div>

              {/* Row 2 — Sexo / Fecha de nacimiento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Form.Item
                  name="sexo"
                  label={<span style={labelStyle}>Sexo</span>}
                  rules={[{ required: true, message: 'Selecciona tu sexo' }]}
                  style={{ marginBottom: 20 }}
                >
                  <Select
                    placeholder="Seleccionar"
                    style={{ backgroundColor: '#ffffff' }}
                    options={[
                      { value: 'masculino', label: 'Masculino' },
                      { value: 'femenino',  label: 'Femenino'  },
                      { value: 'otro',      label: 'Otro'      },
                      { value: 'prefiero_no_decir', label: 'Prefiero no decir' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="fechaNacimiento"
                  label={<span style={labelStyle}>Fecha de nacimiento</span>}
                  rules={[
                    { required: true, message: 'Selecciona tu fecha de nacimiento' },
                    {
                      validator(_, value) {
                        if (!value) return Promise.resolve()
                        const age = dayjs().diff(value, 'year')
                        if (age < 18) {
                          return Promise.reject('Debes tener al menos 18 años')
                        }
                        if (age > 120) {
                          return Promise.reject('Ingresa una fecha de nacimiento válida')
                        }
                        return Promise.resolve()
                      },
                    },
                  ]}
                  style={{ marginBottom: 20 }}
                >
                  <DatePicker
                    placeholder="Seleccionar"
                    format="DD/MM/YYYY"
                    style={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      borderColor: '#ededed',
                    }}
                    disabledDate={(current) =>
                      current && current > dayjs().subtract(18, 'year').endOf('day')
                    }
                  />
                </Form.Item>
              </div>

              {/* Row 3 — Correo / WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Form.Item
                  name="correo"
                  label={<span style={labelStyle}>Correo electrónico</span>}
                  rules={[
                    { required: true, message: 'Ingresa tu correo electrónico' },
                    { type: 'email', message: 'Ingresa un correo electrónico válido' },
                  ]}
                  style={{ marginBottom: 20 }}
                >
                  <Input
                    placeholder="Digitar correo"
                    style={{ backgroundColor: '#ffffff', borderColor: '#ededed' }}
                  />
                </Form.Item>

                <Form.Item
                  label={<span style={labelStyle}>Número de whatsapp</span>}
                  style={{ marginBottom: 20 }}
                  required
                >
                  <Space.Compact style={{ display: 'flex' }}>
                    <Form.Item name="codigoPais" noStyle initialValue="503">
                      <Select
                        style={{ width: 110, flexShrink: 0 }}
                        options={COUNTRY_CODES.map((c) => ({
                          value: c.value,
                          label: c.label,
                        }))}
                        popupMatchSelectWidth={180}
                      />
                    </Form.Item>
                    <Form.Item
                      name="whatsapp"
                      noStyle
                      rules={[
                        { required: true, message: 'Ingresa tu número de WhatsApp' },
                        {
                          pattern: /^\d{7,15}$/,
                          message: 'Ingresa un número válido (solo dígitos, 7-15 caracteres)',
                        },
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
              </div>

              {/* Row 4 — Contraseña / Repetir contraseña */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Form.Item
                  name="contrasena"
                  label={<span style={labelStyle}>Contraseña</span>}
                  rules={[
                    { required: true, message: 'Ingresa una contraseña' },
                    { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        'Debe incluir al menos una mayúscula, una minúscula y un número',
                    },
                  ]}
                  style={{ marginBottom: 20 }}
                >
                  <Input.Password
                    placeholder="Digitar contraseña"
                    style={{ backgroundColor: '#ffffff', borderColor: '#ededed' }}
                  />
                </Form.Item>

                <Form.Item
                  name="repetirContrasena"
                  label={<span style={labelStyle}>Repetir contraseña</span>}
                  dependencies={['contrasena']}
                  rules={[
                    { required: true, message: 'Repite tu contraseña' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('contrasena') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject('Las contraseñas no coinciden')
                      },
                    }),
                  ]}
                  style={{ marginBottom: 32 }}
                >
                  <Input.Password
                    placeholder="Digitar contraseña"
                    style={{ backgroundColor: '#ffffff', borderColor: '#ededed' }}
                  />
                </Form.Item>
              </div>

              {/* Submit */}
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    backgroundColor: '#2e49ce',
                    borderColor: '#2e49ce',
                    letterSpacing: '0.01em',
                  }}
                >
                  Siguiente
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Right panel — decorative */}
        <div className="hidden md:flex flex-1 relative">
          <Image
            src="/images/auth-right-panel.jpg"
            alt="Decorative background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </ConfigProvider>
  )
}
