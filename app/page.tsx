'use client'

import { ConfigProvider, Form, Input, Button, Typography } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

type LoginFormValues = {
  correo: string
  contrasena: string
}

export default function LoginView() {
  const [form] = Form.useForm<LoginFormValues>()

  const onFinish = (values: LoginFormValues) => {
    console.log('[v0] Login attempt:', values)
  }

  return (
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left panel — form */}
        <div
          className="flex-1 flex items-center justify-center px-6 py-16 md:py-0"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div className="w-full max-w-[520px]">
            {/* Heading */}
            <Title
              level={2}
              style={{
                color: '#16163d',
                fontWeight: 700,
                marginBottom: 8,
                fontSize: 'clamp(24px, 3vw, 32px)',
              }}
            >
              Bienvenido
            </Title>
            <Text
              style={{
                color: '#4e4c4c',
                fontSize: 15,
                display: 'block',
                marginBottom: 36,
              }}
            >
              Por favor ingresa tus credenciales
            </Text>

            {/* Form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              size="large"
              style={{ gap: 0 }}
            >
              {/* Email */}
              <Form.Item
                name="correo"
                label={
                  <span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>
                    Correo electrónico
                  </span>
                }
                rules={[
                  { required: true, message: 'Ingresa tu correo electrónico' },
                  { type: 'email', message: 'Ingresa un correo electrónico válido' },
                ]}
                style={{ marginBottom: 20 }}
              >
                <Input
                  prefix={<MailOutlined style={{ color: '#b8b7b7' }} />}
                  placeholder="Digita tu correo"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#ededed',
                    color: '#050817',
                  }}
                />
              </Form.Item>

              {/* Password */}
              <Form.Item
                name="contrasena"
                label={
                  <span style={{ color: '#050817', fontWeight: 600, fontSize: 14 }}>
                    Contraseña
                  </span>
                }
                rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
                style={{ marginBottom: 48 }}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#b8b7b7' }} />}
                  placeholder="Digita tu contraseña"
                  style={{
                    backgroundColor: '#ffffff',
                    borderColor: '#ededed',
                    color: '#050817',
                  }}
                />
              </Form.Item>

              {/* Submit */}
              <Form.Item style={{ marginBottom: 24 }}>
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
                  Iniciar sesión
                </Button>
              </Form.Item>
            </Form>

            {/* Register link */}
            <div style={{ textAlign: 'center' }}>
              <Text style={{ color: '#838282', fontSize: 14 }}>
                {'¿Necesitas una cuenta? '}
                <a
                  href="#"
                  style={{
                    color: '#050817',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#2e49ce')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#050817')
                  }
                >
                  Regístrate aquí
                </a>
              </Text>
            </div>
          </div>
        </div>

        {/* Right panel — decorative */}
        <div
          className="hidden md:flex flex-1"
          style={{ backgroundColor: '#ededed' }}
          aria-hidden="true"
        />
      </div>
  )
}
