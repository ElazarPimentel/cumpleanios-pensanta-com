import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PensaNIOS - Recordá los cumpleaños de tus hijos | App gratis",
  description: "¿Siempre te olvidás los cumpleaños? PensaNIOS te ayuda a recordar las fechas de cumpleaños de tus hijos, familia y amigos. Calculá edades automáticamente y recibí alertas. Gratis.",
  keywords: ["cumpleaños", "recordatorio cumpleaños", "edad hijos", "calculadora edad", "app cumpleaños", "recordar cumpleaños hijos", "calendario cumpleaños familia"],
  authors: [{ name: "Pensanta" }],
  robots: "index, follow",
  metadataBase: new URL("https://cumpleanios.pensanta.com"),
  alternates: {
    canonical: "https://cumpleanios.pensanta.com",
  },
  openGraph: {
    type: "website",
    url: "https://cumpleanios.pensanta.com/",
    title: "PensaNIOS - Nunca más te olvides un cumpleaños",
    description: "App gratis para recordar cumpleaños de tus hijos y familia. Calculá edades, días hasta el próximo cumple, y más. Para papás olvidadizos.",
    siteName: "PensaNIOS",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "PensaNIOS - Nunca más te olvides un cumpleaños",
    description: "App gratis para recordar cumpleaños de tus hijos y familia. Calculá edades, días hasta el próximo cumple. Para papás olvidadizos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Script
          type="application/ld+json"
          id="structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PensaNIOS",
              "url": "https://cumpleanios.pensanta.com",
              "description": "App gratis para recordar cumpleaños de tus hijos y familia. Calculá edades automáticamente y nunca más te olvides una fecha importante.",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "ARS"
              },
              "featureList": [
                "Calculadora de edad automática",
                "Cuenta regresiva hasta el próximo cumpleaños",
                "Edad en meses para bebés",
                "Login con Google"
              ],
              "provider": {
                "@type": "Organization",
                "name": "Pensanta",
                "url": "https://pensanta.com"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
