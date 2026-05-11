"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthentication = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        router.push('/iniciar-sesion');
        return;
      }

      try {
        // Redirect authenticated users to create order page
        router.push('/crear-orden');
      } catch (error) {
        console.error('Token validation failed:', error);
        // Clear invalid token and redirect to login
        localStorage.removeItem('accessToken');
        router.push('/iniciar-sesion');
      }
    };

    handleAuthentication();
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}
