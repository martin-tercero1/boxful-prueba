"use client";
import { MainLayout } from "@/components/MainLayout";
import OrderHistory from "@/components/OrderHistory";
import { useState } from "react";

export default function HistorialPage() {
  const [activeMenu, setActiveMenu] = useState("historial");

  return (
    <MainLayout
      activeMenu={activeMenu}
      onMenuSelect={setActiveMenu}
      title="Historial de Órdenes"
    >
      <div className="w-full">
        <OrderHistory />
      </div>
    </MainLayout>
  );
}
