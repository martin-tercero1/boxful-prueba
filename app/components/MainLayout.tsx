import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
  activeMenu: string;
  onMenuSelect: (key: string) => void;
  title: string;
  userName?: string | undefined;
  amountToSettle?: number;
}

export function MainLayout({ 
  children, 
  activeMenu, 
  onMenuSelect, 
  title, 
  userName,
  amountToSettle,
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar activeKey={activeMenu} onMenuSelect={onMenuSelect} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header title={title} userName={userName} amountToSettle={amountToSettle} />

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
