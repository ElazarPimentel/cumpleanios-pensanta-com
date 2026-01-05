import packageJson from "../../package.json";

export default function Footer() {
  return (
    <footer className="container-main border-01" role="contentinfo">
      <p>&copy; 2024 Pensanta.com - Todos los derechos reservados.</p>
      <span className="version">v{packageJson.version}</span>
      <small>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span>
          Un sitio así para vos →{' '}
          <a
            href="https://elazarpimentel.com/?utm_source=portfolio&utm_medium=footer&utm_campaign=client-sites&utm_content=cumpleanios"
            target="_blank"
          >
            ElazarPimentel.com
          </a>
        </span>
      </small>
    </footer>
  );
}
