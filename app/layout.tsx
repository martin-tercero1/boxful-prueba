import { ConfigProvider, App as AntApp } from 'antd';
import type { Metadata } from 'next';
import './globals.css';
import { Mona_Sans } from 'next/font/google';

const monaSans = Mona_Sans({ subsets: ["latin"] });

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
      <body className={monaSans.className + " antialiased"}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2e49ce',
              borderRadius: 8,
              fontFamily: monaSans.style.fontFamily,
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
          <AntApp>
            {children}
          </AntApp>
        </ConfigProvider>
      </body>
    </html>
  );
}