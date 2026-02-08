import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Transportes Gargallo Vicen" className="h-12 w-12" />
              <div>
                <h3 className="font-montserrat font-bold text-lg">Transportes</h3>
                <p className="text-sm opacity-80">Gargallo Vicen, S.L.</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Empresa líder en transporte y logística desde Calatayud. 
              Servicio local, provincial y nacional con la máxima profesionalidad.
            </p>
            <p className="text-xs opacity-60">
              CIF: B-98765432
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/#servicios" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/reservas" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Reservar Transporte
                </Link>
              </li>
              <li>
                <Link to="/seguimiento" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Seguimiento GPS
                </Link>
              </li>
              <li>
                <Link to="/clientes" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Zona Clientes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:976555123"
                  className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Phone className="h-4 w-4 text-accent" />
                  976 555 123
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@transportesgvc.es"
                  className="flex items-center gap-3 text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  <Mail className="h-4 w-4 text-accent" />
                  info@transportesgvc.es
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm opacity-80">
                  <MapPin className="h-4 w-4 text-accent mt-0.5" />
                  <span>
                    C/ Logística 15<br />
                    50300 Calatayud (Zaragoza)
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social & Hours */}
          <div>
            <h4 className="font-montserrat font-semibold text-lg mb-4">Horario</h4>
            <ul className="space-y-2 text-sm opacity-80 mb-6">
              <li>Lunes - Viernes: 7:00 - 20:00</li>
              <li>Sábados: 8:00 - 14:00</li>
              <li>Domingos: Cerrado</li>
            </ul>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
            <p>© 2026 Transportes Gargallo Vicen, S.L. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition-opacity">Política de Privacidad</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Aviso Legal</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
