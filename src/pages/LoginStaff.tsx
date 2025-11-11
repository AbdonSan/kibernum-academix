import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, LogIn, ArrowLeft, Shield } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const LoginStaff = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  {/*
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usuario || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    // Simulación de login (en producción conectar con backend)
    setTimeout(() => {
      if (usuario === "admin" && password === "staff123") {
        toast.success("¡Bienvenido al Panel Administrativo!");
        navigate("/dashboard-staff");
      } else {
        toast.error("Credenciales inválidas. Intenta con usuario: admin y contraseña: staff123");
      }
      setLoading(false);
    }, 1000);
  };
  */}
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!usuario || !password) {
    toast.error("Por favor completa todos los campos");
    return;
  }

  setLoading(true);
  //console.log("🟡 Intentando login con:", usuario, password);

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo: usuario, password }),
    });

    const data = await response.json();
    //console.log("🟢 Respuesta del backend:", data);

    if (response.ok) {
      // Guardar el token y los datos del usuario
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      //console.log("✅ Token y usuario guardados en localStorage");

      toast.success(`¡Bienvenido, ${data.user.nombre}!`);
      
      const roleMap = {
        1: "admin",
        2: "staff",
        3: "alumno",
      };

      const rol = roleMap[data.user.rol] || "alumno";

      // Redirección según el rol
      //console.log("🧭 Navegando según rol:", data.user.rol);

      if (data.user.rol === 1) navigate("/dashboard-staff");
      else if (data.user.rol === 2) navigate("/dashboard-staff");
      else navigate("/dashboard-alumno");
      
    } else {
      toast.error(data.message || "Credenciales incorrectas");
      //console.error("❌ Error de autenticación:", data);
    }
  } catch (error) {
    //console.error("Error al iniciar sesión:", error);
    toast.error("Error de conexión con el servidor");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-primary/5 to-secondary/10">
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 md:px-6">
          <Card className="w-full max-w-md border-2 shadow-lg">
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/50">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Acceso Administrativo</span>
                </div>
                <CardTitle className="text-2xl">Portal Staff</CardTitle>
                <CardDescription className="mt-2">
                  Ingresa con tus credenciales administrativas para gestionar información de alumnos
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="usuario">Usuario</Label>
                  <Input
                    id="usuario"
                    type="text"
                    placeholder="Ej: admin"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <a href="#" className="text-primary hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                  <LogIn className="mr-2 h-4 w-4" />
                  {loading ? "Ingresando..." : "Ingresar al Panel"}
                </Button>
              </form>

              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Demo:</strong> Usa usuario <code className="rounded bg-primary/10 px-2 py-1">admin</code> y
                  contraseña <code className="rounded bg-primary/10 px-2 py-1">staff123</code>
                </p>
              </div>

              <div className="mt-6 rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                <div className="flex gap-3">
                  <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Acceso Restringido</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Este portal es exclusivo para personal administrativo y docente autorizado
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <ArrowLeft className="h-4 w-4" />
                  Volver al inicio
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginStaff;
