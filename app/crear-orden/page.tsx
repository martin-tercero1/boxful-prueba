"use client";

import { useState, useEffect } from "react";
import { message } from "antd";
import { MainLayout } from "@/components/MainLayout";
import OrderStepOne, { OrderStepOneData } from "@/components/OrderStepOne";
import OrderStepTwo, { Product } from "@/components/OrderStepTwo";
import { ordersService } from "@/services/orders.service";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import OrderHistory from '@/components/OrderHistory';
import type { CashOnDeliveryData } from '@/types/order.types';
import OrderSuccessModal from "@/components/OrderSuccessModal";

const initialStepOneData: OrderStepOneData = {
  direccionRecoleccion: "",
  fechaProgramada: null,
  nombres: "",
  apellidos: "",
  correoElectronico: "",
  codigoPais: "505",
  telefono: "",
  direccionDestinatario: "",
  departamento: "",
  municipio: "",
  puntoReferencia: "",
  indicaciones: "",
  cashOnDelivery: true,
  cashAmount: undefined,
};

export default function CrearOrden() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("crear-orden");
  const [currentStep, setCurrentStep] = useState(1);
  const [stepOneData, setStepOneData] = useState<OrderStepOneData>(initialStepOneData);
  const [products, setProducts] = useState<Product[]>([]);
  const [cashOnDeliveryData, setCashOnDeliveryData] = useState<CashOnDeliveryData>({
    cashOnDelivery: false,
    cashAmount: undefined,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true);
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
        cashOnDelivery: cashOnDeliveryData.cashOnDelivery,
        cashAmount: cashOnDeliveryData.cashAmount,
        products: products.map(p => ({
          height: p.alto || 0,
          length: p.largo || 0,
          width: p.ancho || 0,
          weight: p.pesoLibras || 0,
          content: p.contenido
        })),
      };
      
      await ordersService.create(orderData);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error creating order:", error);
      message.error("Error al crear la orden. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setStepOneData(initialStepOneData);
    setProducts([]);
    setCashOnDeliveryData({ cashOnDelivery: false, cashAmount: undefined });
  };

  const handleCreateAnother = () => {
    setShowSuccessModal(false);
    resetForm();
  };

  const handleGoHome = () => {
    setShowSuccessModal(false);
    resetForm();
    setActiveMenu("historial");
  };

  const handleMenuSelect = (key: string) => {
    setActiveMenu(key);
    if (key === "crear-orden") {
      // Reset form when navigating to create order
      resetForm();
    }
  };

  const pageTitle = activeMenu === "historial" 
    ? "Mis <strong>envíos</strong>" 
    : "Crear un <strong>envío</strong>";
    
  return (
    <MainLayout 
      activeMenu={activeMenu} 
      onMenuSelect={handleMenuSelect}
      title={pageTitle}
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
              cashOnDeliveryData={cashOnDeliveryData}
              onCashOnDeliveryChange={setCashOnDeliveryData}
            />
          ) : (
            <OrderStepTwo
              products={products}
              onProductsChange={setProducts}
              onBack={handleStepTwoBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      )}

      {activeMenu === "historial" && (
        <div className="w-full">
          <OrderHistory />
        </div>
      )}

      {/* Success Modal */}
      <OrderSuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onCreateAnother={handleCreateAnother}
        onGoHome={handleGoHome}
      />
    </MainLayout>
  );
}
