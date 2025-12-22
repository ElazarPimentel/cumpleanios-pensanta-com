import Link from 'next/link';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Ir al contenido principal
      </a>

      <main id="main-content" className="container-main border-01" role="main">
        <section className="section-top">
          <nav role="navigation" aria-label="Navegación principal">
            <Link href="/" className="nav-link active">
              <span>Home</span>
            </Link>
            <Link href="/es/portfolio/" className="nav-link">
              <span>Portfolio</span>
            </Link>
            <Link href="/tools/" className="nav-link">
              <span>Herramientas</span>
            </Link>
            <Link href="/about" className="nav-link">
              <span>Acerca de</span>
            </Link>
          </nav>
        </section>

        <section className="section-middle">
          <h1>
            Desarrollo Web, Aplicaciones Empresariales y Ciberseguridad en Buenos Aires, Argentina
          </h1>
          <p>
            En Pensanta, consultora con base en Buenos Aires, desarrollamos aplicaciones web empresariales, sitios corporativos profesionales, gestionamos proyectos con metodologías PMI y ART, y brindamos servicios de ciberseguridad y capacitaciones técnicas. Combinamos experiencia técnica con metodologías probadas para entregar soluciones digitales concretas.
          </p>

          <h2>Qué Hacemos</h2>

          <h3>Aplicaciones Web</h3>
          <p>
            Desarrollamos aplicaciones web escalables y mantenibles,
            desde sistemas internos hasta plataformas empresariales.
            Aplicamos metodologías de gestión de proyectos para asegurar
            entregas dentro del alcance, presupuesto y tiempo acordados.
          </p>

          <h3>Sitios Web</h3>
          <p>
            Diseñamos y construimos sitios web profesionales,
            optimizados y adaptados a las necesidades de tu negocio.
            Desde sitios corporativos hasta plataformas con
            funcionalidades avanzadas.
          </p>

          <h3>Seguridad de la Información</h3>
          <p>
            Cuando las empresas enfrentan incidentes de seguridad o
            necesitan fortalecer sus defensas, intervenimos rápidamente.
            Lideramos la recuperación forense, fortalecemos las defensas
            y capacitamos a los equipos para prevenir futuros
            incidentes.
          </p>

          <h3>Capacitaciones</h3>
          <p>
            Capacitamos equipos en Seguridad de la Información, uso
            eficiente de herramientas tecnológicas y aplicación práctica
            de herramientas de AI para tareas cotidianas de oficina:
            optimización de Excel, redacción de documentos,
            automatización de procesos administrativos y otras
            actividades del día a día.
          </p>

          <h3>Nuestro Enfoque</h3>
          <p>
            Aplicamos metodologías de gestión de proyectos según el tipo
            de iniciativa: PMI para proyectos tradicionales y ART (Agile
            Release Train) para iniciativas ágiles escaladas. Nuestra
            experiencia abarca desarrollo de software, seguridad,
            infraestructura y capacitación técnica, permitiéndonos
            entregar resultados reales y medibles.
          </p>
        </section>

        <section className="section-bottom" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="visually-hidden">
            Contacto
          </h2>
          <div className="contact-links">
            <a
              href="mailto:elazar.pimentel@pensanta.com"
              aria-label="Envíanos un email"
              className="contact-link email-link"
            >
              <i className="fas fa-envelope" aria-hidden="true"></i>
              <span className="contact-text">Email</span>
            </a>
            <a
              href="https://wa.me/5491137990312"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contáctanos por WhatsApp"
              className="contact-link whatsapp-link"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              <span className="contact-text">WhatsApp</span>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
