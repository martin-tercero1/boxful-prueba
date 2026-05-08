'use client'

import { Button, Form, Typography } from 'antd'
import { AuthLayout } from './components/AuthLayout'
import { AuthHeader } from './components/AuthHeader'
import { EmailField } from './components/Form/EmailField'
import { PasswordField } from './components/Form/PasswordField'
import { NameFields } from './components/Form/NameFields'
import { AuthFooter } from './components/AuthFooter'

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
   <AuthLayout>
      <AuthHeader title="Bienvenido" subtitle="Por favor ingresa tus credenciales" />
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} size="large" style={{ gap: 0 }}>
        <EmailField />
        <PasswordField />
        <Form.Item style={{ marginBottom: 24 }}>
          <Button type="primary" htmlType="submit" block style={{
                    backgroundColor: '#2e49ce',
                    borderColor: '#2e49ce',
                    letterSpacing: '0.01em',
                  }}>Iniciar sesión</Button>
        </Form.Item>
      </Form>
      <AuthFooter linkText="Regístrate aquí" linkHref="/registro" prefixText="¿Necesitas una cuenta?" />
    </AuthLayout>
  )
}
