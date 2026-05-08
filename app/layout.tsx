import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Boxful Prueba Técnica',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2e49ce',
              borderRadius: 8,
              fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            },
            components: {
              Input: {
                borderRadius: 8,
                paddingBlock: 12,
                paddingInline: 16,
                fontSize: 15,
              },
              Button: {
                borderRadius: 8,
                controlHeight: 52,
                fontSize: 16,
                fontWeight: 600,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}