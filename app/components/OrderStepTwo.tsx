"use client";

import Image from "next/image";
import { Form, Input, Button, Card, Row, Col, message, InputNumber } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export interface Product {
  id: string;
  largo: number;
  alto: number;
  ancho: number;
  pesoLibras: number;
  contenido: string;
}

interface OrderStepTwoProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const BoxIcon = () => (
  <Image
    src="/images/IconoCaja.svg"
    alt="Box icon"
    width={40}
    height={40}
  />
);

export default function OrderStepTwo({
  products,
  onProductsChange,
  onBack,
  onSubmit,
  isSubmitting,
}: OrderStepTwoProps) {
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      const newProduct: Product = {
        id: Date.now().toString(),
        largo: values.largo || 0,
        alto: values.alto || 0,
        ancho: values.ancho || 0,
        pesoLibras: values.pesoLibras || 0,
        contenido: values.contenido,
      };
      onProductsChange([...products, newProduct]);
      form.resetFields();
      message.success("Producto agregado");
    }).catch(() => {
      message.error("Por favor completa todos los campos del producto");
    });
  };

  const handleDeleteProduct = (id: string) => {
    onProductsChange(products.filter((p) => p.id !== id));
    message.success("Producto eliminado");
  };

  return (
    <Card
      className="rounded-lg"
      style={{ border: "1px solid #e1e9e8" }}
      styles={{ body: { padding: "24px" } }}
    >
      <h2 className="text-lg font-bold text-[#161734] mb-6">
        Agrega tus productos
      </h2>

      {/* Add Product Form */}
      <div className="bg-[#f8f9fa] rounded-lg p-4 mb-6">
        <Form form={form} layout="vertical" requiredMark={false}>
          <Row gutter={[12, 0]} align="middle">
            <Col xs={24} sm={4} md={2} className="hidden sm:flex justify-center">
              <BoxIcon />
            </Col>
            <Col xs={8} sm={4} md={3}>
              <Form.Item
                label={
                  <span className="text-[#161734] font-semibold text-sm">
                    Largo
                  </span>
                }
                name="largo"
                rules={[{ required: true, message: "Requerido" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  placeholder="0"
                  suffix={<span className="text-[#acb3c5]">cm</span>}
                  style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col xs={8} sm={4} md={3}>
              <Form.Item
                label={
                  <span className="text-[#161734] font-semibold text-sm">
                    Alto
                  </span>
                }
                name="alto"
                rules={[{ required: true, message: "Requerido" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  placeholder="0"
                  suffix={<span className="text-[#acb3c5]">cm</span>}
                  style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col xs={8} sm={4} md={3}>
              <Form.Item
                label={
                  <span className="text-[#161734] font-semibold text-sm">
                    Ancho
                  </span>
                }
                name="ancho"
                rules={[{ required: true, message: "Requerido" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  placeholder="0"
                  suffix={<span className="text-[#acb3c5]">cm</span>}
                  style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Item
                label={
                  <span className="text-[#161734] font-semibold text-sm">
                    Peso en libras
                  </span>
                }
                name="pesoLibras"
                rules={[{ required: true, message: "Requerido" }]}
              >
                <InputNumber
                  min={0}
                  precision={2}
                  placeholder="0"
                  suffix={<span className="text-[#acb3c5]">libras</span>}
                  style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                  controls={false}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={10} md={9}>
              <Form.Item
                label={
                  <span className="text-[#161734] font-semibold text-sm">
                    Contenido
                  </span>
                }
                name="contenido"
                rules={[{ required: true, message: "Requerido" }]}
              >
                <Input
                  placeholder="Descripción del contenido"
                  style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end">
            <Button
              type="default"
              icon={<PlusOutlined />}
              iconPlacement="end"
              onClick={handleAddProduct}
              style={{ 
                height: "48px", 
                borderColor: "#d9d9d9", 
                color: "#161734",
                borderRadius: "8px",
                width: "159px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#2e49ce";
                e.currentTarget.style.color = "#2e49ce";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#d9d9d9";
                e.currentTarget.style.color = "#161734";
              }}
            >
              Agregar
            </Button>
          </div>
        </Form>
      </div>

      {/* Products List */}
      <div className="space-y-4 mb-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg p-4 bg-white"
            style={{ border: "2px solid #73bd28" }}
          >
            <Row gutter={[12, 12]} align="middle">
              <Col xs={12} sm={6} md={4}>
                <div>
                  <span className="text-xs text-[#050817] block mb-1 font-semibold">
                    Peso en libras
                  </span>
                  <InputNumber
                    value={product.pesoLibras}
                    onChange={(value) => {
                      const updatedProducts = products.map((p) => 
                        p.id === product.id ? { ...p, pesoLibras: value || 0 } : p
                      );
                      onProductsChange(updatedProducts);
                    }}
                    style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                    suffix={<span className="text-[#acb3c5]">libras</span>}
                    precision={2}
                    controls={false}
                  />
                </div>
              </Col>
              <Col xs={12} sm={10} md={7}>
                <div>
                  <span className="text-xs text-[#050817] block mb-1 font-semibold">
                    Contenido
                  </span>
                  <Input
                    value={product.contenido}
                    onChange={(e) => {
                      const updatedProducts = products.map((p) => 
                        p.id === product.id ? { ...p, contenido: e.target.value } : p
                      );
                      onProductsChange(updatedProducts);
                    }}
                    style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9" }}
                  />
                </div>
              </Col>
              <Col xs={0} sm={2} md={2} className="hidden sm:flex justify-center">
                <BoxIcon />
              </Col>
              <Col xs={8} sm={4} md={3}>
                <div>
                  <span className="text-sm text-[#050817] block mb-1 font-semibold">
                    Largo
                  </span>
                  <InputNumber
                    value={product.largo}
                    onChange={(value) => {
                      const updatedProducts = products.map((p) => 
                        p.id === product.id ? { ...p, largo: value || 0 } : p
                      );
                      onProductsChange(updatedProducts);
                    }}
                    suffix={<span className="text-[#acb3c5]">cm</span>}
                    style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                    precision={2}
                    controls={false}
                  />
                </div>
              </Col>
              <Col xs={8} sm={4} md={3}>
                <div>
                  <span className="text-sm text-[#050817] block mb-1 font-semibold">
                    Alto
                  </span>
                  <InputNumber
                    value={product.alto}
                    onChange={(value) => {
                      const updatedProducts = products.map((p) => 
                        p.id === product.id ? { ...p, alto: value || 0 } : p
                      );
                      onProductsChange(updatedProducts);
                    }}
                    suffix={<span className="text-[#acb3c5]">cm</span>}
                    style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                    precision={2}
                    controls={false}
                  />
                </div>
              </Col>
              <Col xs={8} sm={4} md={3}>
                <div>
                  <span className="text-sm text-[#050817] block mb-1 font-semibold">
                    Ancho
                  </span>
                  <InputNumber
                    value={product.ancho}
                    onChange={(value) => {
                      const updatedProducts = products.map((p) => 
                        p.id === product.id ? { ...p, ancho: value || 0 } : p
                      );
                      onProductsChange(updatedProducts);
                    }}
                    suffix={<span className="text-[#acb3c5]">cm</span>}
                    style={{ height: "48px", borderRadius: "8px", borderColor: "#d9d9d9", width: "100%" }}
                    precision={2}
                    controls={false}
                  />
                </div>
              </Col>
              <Col xs={24} sm={2} md={1} className="flex justify-end sm:justify-center mt-4">
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteProduct(product.id)}
                style={{ 
                  borderRadius: "12px",
                  border: "1px solid #EDEDED",
                  backgroundColor: "#fff",
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fee2e2"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              />
              </Col>
            </Row>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-[#71717a]">
          No hay productos agregados. Usa el formulario de arriba para agregar
          productos.
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          style={{ height: "44px", paddingLeft: "24px", paddingRight: "24px", borderRadius: "6px", borderColor: "#d9d9d9", color: "#161734" }}
        >
          Regresar
        </Button>
        <Button
          type="primary"
          icon={<ArrowRightOutlined />}
          iconPlacement="end"
          onClick={onSubmit}
          disabled={products.length === 0 || isSubmitting}
          loading={isSubmitting}
          style={{ 
            height: "44px", 
            paddingLeft: "24px", 
            paddingRight: "24px", 
            borderRadius: "6px", 
            borderColor: "#2e49ce", 
            color: "#ffffff",
            backgroundColor: "#2e49ce"
          }}
        >
          Enviar orden
        </Button>
      </div>
    </Card>
  );
}
