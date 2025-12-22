import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pensanta - Desarrollo Web y Aplicaciones Empresariales en Buenos Aires | PMI, ART, Ciberseguridad",
  description: "Desarrollamos aplicaciones web y sitios corporativos en Buenos Aires, Argentina. Gestión de proyectos con metodologías PMI y ART, ciberseguridad, y capacitaciones técnicas. Equipo experto en soluciones digitales.",
  authors: [{ name: "Pensanta" }],
  robots: "index, follow",
  metadataBase: new URL("https://templatenextjs.pensanta.com"),
  openGraph: {
    type: "website",
    url: "https://templatenextjs.pensanta.com/",
    title: "Pensanta - Desarrollo Web y Aplicaciones Empresariales en Buenos Aires",
    description: "Desarrollamos aplicaciones web y sitios corporativos en Buenos Aires, Argentina. Gestión de proyectos con PMI y ART, ciberseguridad y capacitaciones técnicas.",
    siteName: "Pensanta",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pensanta - Desarrollo Web y Aplicaciones Empresariales en Buenos Aires",
    description: "Desarrollamos aplicaciones web y sitios corporativos en Buenos Aires, Argentina. Gestión de proyectos con PMI y ART, ciberseguridad y capacitaciones técnicas.",
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
              "@type": "ProfessionalService",
              "name": "Pensanta",
              "url": "https://templatenextjs.pensanta.com",
              "email": "elazar.pimentel@pensanta.com",
              "telephone": "+54-911-3799-0312",
              "description": "Consultora de desarrollo web, aplicaciones empresariales, gestión de proyectos PMI y ART, y ciberseguridad en Buenos Aires, Argentina",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Buenos Aires",
                "addressCountry": "AR",
                "addressRegion": "Buenos Aires"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Argentina"
              },
              "priceRange": "$$",
              "serviceType": [
                "Desarrollo Web",
                "Desarrollo de Aplicaciones",
                "Gestión de Proyectos",
                "Ciberseguridad",
                "Capacitaciones Técnicas"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
