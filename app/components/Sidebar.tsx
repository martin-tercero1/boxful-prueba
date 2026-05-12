"use client";

import { useState } from "react";
import { Menu, Button, Drawer } from "antd";
import { PlusOutlined, FileSearchOutlined, MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

interface SidebarProps {
  activeKey: string;
  onMenuSelect: (key: string) => void;
}

const BoxfulLogo = () => (
  <div className="flex items-center gap-2">
    <Image src="/images/boxful-logo.svg" alt="Boxful Logo" width={260} height={40}/>
  </div>
);

const SidebarContent = ({
  activeKey,
  onMenuSelect,
}: {
  activeKey: string;
  onMenuSelect: (key: string) => void;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.push('/iniciar-sesion');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
    <div className="flex flex-col h-full p-10">
      <BoxfulLogo />
      <div className="py-8">
        <span className="text-sm font-semibold text-[#161734] uppercase tracking-wider">
          MENÚ
        </span>
      </div>
      <Button
        type={activeKey === "crear-orden" ? "primary" : "default"}
        icon={<PlusOutlined />}
        onClick={() => router.push('/crear-orden')}
        className="w-full flex items-center justify-start h-12"
        style={{
          borderRadius: "8px",
          border: '0px',
          backgroundColor: activeKey === "crear-orden" ? "#2e49ce" : "#ffffff",
          color: activeKey === "crear-orden" ? "#ffffff" : "#161734",
          height: "72px",
          marginBottom: '24px'
        }}
      >
        Crear orden
      </Button>
    <Menu
      mode="inline"
      selectedKeys={[activeKey]}
      onClick={({ key }) => {
        if (key === "historial") {
          router.push('/historial');
        } else {
          onMenuSelect(key);
        }
      }}
      className="border-none bg-transparent"
      style={{
        margin: 0
      }}
      items={[
        {
          key: "historial",
          icon: <FileSearchOutlined />,
          label: "Historial",
          style: {
            borderRadius: "8px",
            height: "72px",
            fontSize: "16px",
            backgroundColor: activeKey === "historial" ? "#2e49ce" : "#ffffff",
            color: activeKey === "historial" ? "#ffffff" : "#161734",
            marginBottom: "8px"
          }
        }
      ]}
    />
  </div>
  <div className="mt-auto p-4">
    <Button
      type="default"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      className="w-full flex items-center justify-center h-12"
      style={{
        borderRadius: "8px",
        border: "1px solid #e1e9e8",
        backgroundColor: "#ffffff",
        color: "#ef4444",
        height: "48px"
      }}
    >
      Cerrar sesión
    </Button>
  </div>
  </>
);
}

export default function Sidebar({ activeKey, onMenuSelect }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileOpen(true)}
          className="shadow-md"
          style={{ backgroundColor: "#ffffff" }}
        />
      </div>

      {/* Mobile drawer */}
      <Drawer
        placement="left"
        onClose={() => setMobileOpen(false)}
        open={mobileOpen}
        width={280}
        className="lg:hidden"
        styles={{ body: { padding: 0 } }}
      >
        <SidebarContent
          activeKey={activeKey}
          onMenuSelect={(key) => {
            onMenuSelect(key);
            setMobileOpen(false);
          }}
        />
      </Drawer>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-70 min-h-screen bg-white border-r border-[#e1e9e8]">
        <SidebarContent activeKey={activeKey} onMenuSelect={onMenuSelect} />
      </aside>
    </>
  );
}
