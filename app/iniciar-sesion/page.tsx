'use client'

import { useState } from 'react'
import { Button, Form, message } from 'antd'
import { useRouter } from 'next/navigation'
import { AuthLayout } from '@/components/AuthLayout'
import { AuthHeader } from '@/components/AuthHeader'
import { EmailField } from '@/components/Form/EmailField'
import { PasswordField } from '@/components/Form/PasswordField'
import { AuthFooter } from '@/components/AuthFooter'
import { authService } from '@/services/auth.service'

type LoginFormValues = {
  correo: string
  contrasena: string
}

export default function LoginView() {
  const [form] = Form.useForm<LoginFormValues>()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true)
      const loginData = {
        email: values.correo,
        password: values.contrasena
      }
      
      await authService.login(loginData)
      message.success('¡Inicio de sesión exitoso!')
      router.push('/crear-orden')
    } catch (error: any) {
      console.error('Login error:', error)
      message.error(error?.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
   <AuthLayout>
      <AuthHeader title="Bienvenido" subtitle="Por favor ingresa tus credenciales" />
      <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false} size="large" style={{ gap: 0 }}>
        <EmailField />
        <PasswordField />
        <Form.Item style={{ marginBottom: 24 }}>
          <Button type="primary" htmlType="submit" block loading={loading} style={{
                    backgroundColor: '#2e49ce',
                    borderColor: '#2e49ce',
                    letterSpacing: '0.01em',
                    height: 48
                  }}>Iniciar sesión</Button>
        </Form.Item>
      </Form>
      <AuthFooter linkText="Regístrate aquí" linkHref="/registro" prefixText="¿Necesitas una cuenta? " />
    </AuthLayout>
  )
}
