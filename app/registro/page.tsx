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
import { useState, useEffect } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Image from 'next/image'
import { authService } from '@/services/auth.service'
import { message } from 'antd'
import PhoneConfirmationModal from '@/components/PhoneConfirmationModal'
import { NameFields } from '@/components/Form/NameFields'
import { SelectField } from '@/components/Form/SelectField'
import { DateField } from '@/components/Form/DateField'
import { EmailField } from '@/components/Form/EmailField'
import { WhatsAppField } from '@/components/Form/WhatsappField'
import { PasswordField } from '@/components/Form/PasswordField'
import { ConfirmPasswordField } from '@/components/Form/ConfirmPasswordField'

const { Title, Text } = Typography

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

export default function SignupView() {
  const router = useRouter()
  const [form] = Form.useForm<SignupFormValues>()
  const [loading, setLoading] = useState(false)
  const [showPhoneConfirmation, setShowPhoneConfirmation] = useState(false)

  // Check if user is already logged in and redirect
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/crear-orden');
    }
  }, [router]);

  const onFinish = async (values: SignupFormValues) => {
    setShowPhoneConfirmation(true)
  }

  const handlePhoneConfirm = async () => {
    try {
      setLoading(true)
      
      const formValues = form.getFieldsValue()
      const signupData = {
        firstName: formValues.nombre,
        lastName: formValues.apellido,
        sex: formValues.sexo,
        dateOfBirth: formValues.fechaNacimiento?.format('YYYY-MM-DD') || '',
        email: formValues.correo,
        phone: `${formValues.codigoPais}${formValues.whatsapp}`,
        password: formValues.contrasena,
        passwordRepeat: formValues.repetirContrasena,
      }

      await authService.signup(signupData)
      message.success('¡Cuenta creada exitosamente!')
      router.push('/')
    } catch (error: any) {
      console.error('Registration error:', error)
      message.error(error?.response?.data?.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
      setShowPhoneConfirmation(false)
    }
  }

  const handlePhoneCancel = () => {
    setShowPhoneConfirmation(false)
  }

  return (
    <ConfigProvider theme={THEME}>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left panel — form */}
        <div
          className="flex-1 flex items-start md:items-center justify-center px-6 py-12 md:py-0"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div className="w-full max-w-160">
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
                fontSize: 16,
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
                <NameFields />
              </div>

              {/* Row 2 — Sexo / Fecha de nacimiento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <SelectField
                  name="sexo"
                  label="Sexo"
                  placeholder="Seleccionar"
                  rules={[{ required: true, message: 'Selecciona tu sexo' }]}
                  options={[
                    { value: 'Masculino', label: 'Masculino' },
                    { value: 'Femenino',  label: 'Femenino'  },
                  ]}
                />

                <DateField
                  name="fechaNacimiento"
                  label="Fecha de nacimiento"
                  placeholder="Seleccionar"
                  rules={[
                    { required: true, message: 'Selecciona tu fecha de nacimiento' },
                    {
                      validator(_: any, value: any) {
                        if (!value) return Promise.resolve()
                        const age = dayjs().diff(value, 'year')
                        if (age < 18) {
                          return Promise.reject('Debes tener al menos 18 años')
                        }
                        if (age > 120) {
                          return Promise.reject('Ingresa una fecha de nacimiento válida')
                        }
                        return Promise.resolve()
                      }
                    },
                  ]}
                  disabledDate={(current) =>
                    current && current > dayjs().subtract(18, 'year').endOf('day')
                  }
                />
              </div>

              {/* Row 3 — Correo / WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <EmailField />

                <WhatsAppField />
              </div>

              {/* Row 4 — Contraseña / Repetir contraseña */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <PasswordField
                  name="contrasena"
                  label="Contraseña"
                  placeholder="Digitar contraseña"
                  style={{ marginBottom: 20 }}
                  rules={[
                    { required: true, message: 'Ingresa una contraseña' },
                    { min: 8, message: 'La contraseña debe tener al menos 8 caracteres' },
                    {
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        'Debe incluir al menos una mayúscula, una minúscula y un número',
                    },
                  ]}
                />

                <ConfirmPasswordField
                  passwordFieldName="contrasena"
                  label="Repetir contraseña"
                  placeholder="Digitar contraseña"
                  style={{ marginBottom: 32 }}
                />
              </div>

              {/* Submit */}
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  style={{
                    backgroundColor: '#2e49ce',
                    borderColor: '#2e49ce',
                    letterSpacing: '0.01em',
                    height: 48,
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

      {/* Phone Confirmation Modal */}
      <PhoneConfirmationModal
        visible={showPhoneConfirmation}
        onCancel={handlePhoneCancel}
        onConfirm={handlePhoneConfirm}
        phoneNumber={`+${form.getFieldsValue().codigoPais} ${form.getFieldsValue().whatsapp}`}
        loading={loading}
      />
    </ConfigProvider>
  )
}
