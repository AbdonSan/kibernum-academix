import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none text-primary">Kibernum IT</span>
                <span className="text-xs leading-none text-muted-foreground">Academy</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Portal Académico para la gestión integral de asistencias y calificaciones.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/login-alumno" className="text-muted-foreground transition-colors hover:text-primary">
                  Portal Alumno
                </Link>
              </li>
              <li>
                <Link to="/login-staff" className="text-muted-foreground transition-colors hover:text-primary">
                  Portal Staff
                </Link>
              </li>
              <li>
                <a
                  href="https://kibernumitacademy.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary"
                >
                  Sitio Principal
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:soporte@kibernumitacademy.com"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  soporte@kibernumitacademy.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+56912345678"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  +569 1234 5678
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
                  Seguridad de Datos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kibernum IT Academy. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
