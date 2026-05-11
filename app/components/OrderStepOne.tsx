"use client";

import { Form, Button, Row, Col, Card, Input, Select } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { TextField } from "./Form/TextField";
import { DateField } from "./Form/DateField";
import { EmailField } from "./Form/EmailField";
import { SelectField } from "./Form/SelectField";
import { WhatsAppField } from "./Form/WhatsappField";

export interface OrderStepOneData {
  direccionRecoleccion: string;
  fechaProgramada: dayjs.Dayjs | null;
  nombres: string;
  apellidos: string;
  correoElectronico: string;
  codigoPais: string;
  telefono: string;
  direccionDestinatario: string;
  departamento: string;
  municipio: string;
  puntoReferencia: string;
  indicaciones: string;
}

interface OrderStepOneProps {
  initialData: OrderStepOneData;
  onNext: (data: OrderStepOneData) => void;
}

const countryCodes = [
  { value: "503", label: "503" },
  { value: "502", label: "502" },
  { value: "504", label: "504" },
  { value: "505", label: "505" },
  { value: "506", label: "506" },
  { value: "507", label: "507" },
  { value: "52", label: "52" },
  { value: "1", label: "1" },
];

export default function OrderStepOne({
  initialData,
  onNext,
}: OrderStepOneProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: OrderStepOneData) => {
    onNext(values);
  };

  return (
    <Card className="rounded-lg border border-[#e1e9e8]">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-[#161734] mb-6">
          Completa los datos
        </h2>

      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        onFinish={handleFinish}
        requiredMark={false}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} lg={18}>
            <TextField
              name="direccionRecoleccion"
              label="Dirección de recolección"
              placeholder="Ingresa la dirección de recolección"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
            />
          </Col>
          <Col xs={24} lg={6}>
            <DateField
              name="fechaProgramada"
              label="Fecha programada"
              placeholder="Selecciona fecha"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              style={{ marginBottom: 0 }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <TextField
              name="nombres"
              label="Nombres"
              placeholder="Ingresa nombres"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
            />
          </Col>
          <Col xs={24} md={8}>
            <TextField
              name="apellidos"
              label="Apellidos"
              placeholder="Ingresa apellidos"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
            />
          </Col>
          <Col xs={24} md={8}>
            <EmailField 
              name="correoElectronico"
              placeholder="correo@ejemplo.com"
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
              rules={[
                { required: true, message: "Este campo es requerido" },
                { type: "email", message: "Ingresa un correo válido" },
              ]}
            />
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <WhatsAppField 
              phoneFieldName="telefono"
              label="Teléfono"
              placeholder="0000 0000"
              className="mb-0"
              style={{ marginBottom: 0 }}
              phoneRules={[
                { required: true, message: "Este campo es requerido" },
              ]}
              initialCountryCode="503"
            />
          </Col>
          <Col xs={24} md={16}>
            <TextField
              name="direccionDestinatario"
              label="Dirección del destinatario"
              placeholder="Ingresa la dirección del destinatario"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
            />
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <TextField
              name="departamento"
              label="Departamento"
              placeholder="Ingresa el departamento"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
            />
          </Col>
          <Col xs={24} md={8}>
            <TextField
              name="municipio"
              label="Municipio"
              placeholder="Ingresa el municipio"
              rules={[{ required: true, message: "Este campo es requerido" }]}
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
            />
          </Col>
          <Col xs={24} md={8}>
            <TextField
              name="puntoReferencia"
              label="Punto de referencia"
              placeholder="Punto de referencia"
              className="mb-0"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
              rules={[{ required: true, message: "Este campo es requerido" }]}
            />
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={8}>
            <TextField
              name="indicaciones"
              label="Indicaciones adicionales"
              placeholder="Indicaciones adicionales"
              className="mb-6"
              inputClassName="bg-white border-[#d9d9d9] w-full h-12"
              rules={[{ required: true, message: "Este campo es requerido" }]}
            />
          </Col>
        </Row>

        <div className="flex justify-end mt-6">
          <Button
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
            type="primary"
            htmlType="submit"
            className="bg-[#2e49ce] border-[#2e49ce] hover:bg-[#1e39be] h-12 text-base font-semibold flex items-center px-6"
          >
            Siguiente
          </Button>
        </div>
      </Form>
      </div>
    </Card>
  );
}
