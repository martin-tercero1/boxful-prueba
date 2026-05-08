import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

export function AuthLayout({ children, backgroundImage = "/images/auth-right-panel.jpg" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-0" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="w-full max-w-[520px]">
          {children}
        </div>
      </div>
      <div className="hidden md:flex flex-1 relative">
        <Image
          src={backgroundImage}
          alt="Decorative background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}