import Link from 'next/link';

export default function Header() {
  return (
    <header className="container-main border-01" role="banner">
      <div id="header-container">
        <div id="logo-left">
          <Link href="/" aria-label="Ir a inicio">
            <h2 className="logo-text">PenPlate</h2>
          </Link>
        </div>
        <div id="text-right">
          <p className="title-01">
            Program, Project and Digital Product Management
          </p>
        </div>
        <nav
          className="language-switcher"
          role="navigation"
          aria-label="Selector de idioma"
        >
          <Link
            href="/index-eng"
            className="lang-button"
            lang="en"
            aria-label="Cambiar a inglés"
          >
            EN
          </Link>
        </nav>
      </div>
    </header>
  );
}
