import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Inicio" },
    { path: "/#servicios", label: "Servicios" },
    { path: "/reservas", label: "Reservas" },
    { path: "/seguimiento", label: "Seguimiento GPS" },
    { path: "/clientes", label: "Clientes" },
    { path: "/#contacto", label: "Contacto" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) {
      return location.pathname === "/" && location.hash === path.replace("/", "");
    }
    return location.pathname === path;
  };

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    if (path.includes("#")) {
      const hash = path.split("#")[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Transportes Gargallo Vicen" className="h-14 w-14 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-montserrat font-bold text-lg text-primary leading-tight">
                Transportes
              </h1>
              <p className="font-montserrat font-semibold text-sm text-muted-foreground">
                Gargallo Vicen
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`nav-link py-2 ${isActive(link.path) ? "text-primary font-semibold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Phone */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:976555123"
              className="flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>976 555 123</span>
            </a>
            <Link to="/reservas" className="btn-accent text-base py-3 px-6">
              Reservar Ahora
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`py-3 px-4 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary font-semibold"
                      : "hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:976555123"
                className="flex items-center gap-2 py-3 px-4 text-primary font-semibold"
              >
                <Phone className="h-5 w-5" />
                <span>976 555 123</span>
              </a>
              <Link to="/reservas" className="btn-accent mt-2 text-center">
                Reservar Ahora
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
