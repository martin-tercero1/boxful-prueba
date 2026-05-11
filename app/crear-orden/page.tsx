"use client";

import { useState, useEffect } from "react";
import { message } from "antd";
import { MainLayout } from "@/components/MainLayout";
import OrderStepOne, { OrderStepOneData } from "@/components/OrderStepOne";
import OrderStepTwo, { Product } from "@/components/OrderStepTwo";
import { ordersService } from "@/services/orders.service";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const initialStepOneData: OrderStepOneData = {
  direccionRecoleccion: "",
  fechaProgramada: null,
  nombres: "",
  apellidos: "",
  correoElectronico: "",
  codigoPais: "503",
  telefono: "",
  direccionDestinatario: "",
  departamento: "",
  municipio: "",
  puntoReferencia: "",
  indicaciones: "",
};

export default function CrearOrden() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("crear-orden");
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<OrderStepOneData>(initialStepOneData);
  const [products, setProducts] = useState<Product[]>([]);
  const [userName, setUserName] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/iniciar-sesion');
    }
    authService.getMe().then((response) => {
      setUserName(`${response.data.firstName} ${response.data.lastName}`);
    });
  }, [router]);

  const handleStepOneNext = (data: OrderStepOneData) => {
    setStepOneData(data);
    setCurrentStep(2);
  };

  const handleStepTwoBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async () => {
    try {
      const orderData = {
        pickUpAddress: stepOneData.direccionRecoleccion,
        scheduledDate: stepOneData.fechaProgramada?.toISOString() || '',
        firstNames: stepOneData.nombres,
        lastNames: stepOneData.apellidos,
        email: stepOneData.correoElectronico,
        phoneNumber: `${stepOneData.codigoPais}${stepOneData.telefono}`,
        destinationAddress: stepOneData.direccionDestinatario,
        department: stepOneData.departamento,
        municipality: stepOneData.municipio,
        referencePoint: stepOneData.puntoReferencia,
        indications: stepOneData.indicaciones,
        cashOnDelivery: false,
        products: products.map(p => ({
          height: parseFloat(p.alto) || 0,
          length: parseFloat(p.largo) || 0,
          width: parseFloat(p.ancho) || 0,
          weight: parseFloat(p.pesoLibras) || 0,
          content: p.contenido
        })),
      };
      
      await ordersService.create(orderData);
      message.success("¡Orden creada exitosamente!");
      
      // Reset form after successful submission
      setCurrentStep(1);
      setStepOneData(initialStepOneData);
      setProducts([]);
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Error al crear la orden. Por favor intenta nuevamente.");
    }
  };

  const handleMenuSelect = (key: string) => {
    setActiveMenu(key);
    if (key === "crear-orden") {
      // Reset form when navigating to create order
      setCurrentStep(1);
      setStepOneData(initialStepOneData);
      setProducts([]);
    }
  };

  return (
    <MainLayout 
      activeMenu={activeMenu} 
      onMenuSelect={handleMenuSelect}
      title="Crear un <strong>envío</strong>"
      userName={userName}
    >
      {activeMenu === "crear-orden" && (
        <div className="max-w-5xl mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#161734] mb-2">
              Crea una orden
            </h1>
            <p className="text-[#636060]">
              Dale una ventaja competitiva a tu negocio con entregas{" "}
              <strong>el mismo día</strong> (Área Metropolitana) y{" "}
              <strong>el día siguiente</strong> a nivel nacional.
            </p>
          </div>

          {/* Step Content */}
          {currentStep === 1 ? (
            <OrderStepOne
              initialData={stepOneData}
              onNext={handleStepOneNext}
            />
          ) : (
            <OrderStepTwo
              products={products}
              onProductsChange={setProducts}
              onBack={handleStepTwoBack}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}

      {activeMenu === "historial" && (
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-[#161734] mb-4">
            Historial de órdenes
          </h1>
          <p className="text-[#636060]">
            Aquí podrás ver el historial de tus órdenes anteriores.
          </p>
        </div>
      )}
    </MainLayout>
  );
}
