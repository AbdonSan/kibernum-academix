import { NavLink } from "@/components/NavLink";
import { Link, useHref, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HeadRow } from "react-day-picker";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Cursos", href: "/cursos" },
    { name: "Portal Alumno", href: "/login-alumno" },
    //{ name: "Portal Staff", href: "/login-staff" },
    { name: "Acerca", href: "/acerca" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none text-primary">Kibernum IT</span>
            <span className="text-xs leading-none text-muted-foreground">Academy</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
                    
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              activeClassName="text-primary border-b-2 border-primary"
              pendingClassName="opacity-60"
            >
              {item.name}
            </NavLink>
          ))}

        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="hero" size="default" asChild>
            <Link to="/login-staff">
              <LogIn className="mr-2 h-4 w-4" />
              Portal Admin
            </Link>
          </Button>
        </div>

        {/* Mobile menu button 
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Abrir menú</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>*/}
      </nav>

      {/* Mobile menu 
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button variant="hero" size="lg" className="w-full" asChild>
                <Link to="/login-alumno" onClick={() => setMobileMenuOpen(false)}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar al Portal
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}*/}
    </header>
  );
};

export default Header;
