import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { UserCircle, LogIn, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const LoginAlumno = () => {
  const navigate = useNavigate();
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!matricula || !password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    // Simulación de login (en producción conectar con backend)
    setTimeout(() => {
      if (matricula === "123456" && password === "alumno123") {
        toast.success("¡Bienvenido al Portal Académico!");
        navigate("/dashboard-alumno");
      } else {
        toast.error("Credenciales inválidas. Intenta con matrícula: 123456 y contraseña: alumno123");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-secondary/10 to-accent/10">
        <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 md:px-6">
          <Card className="w-full max-w-md border-2 shadow-lg">
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <UserCircle className="h-10 w-10 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Portal Alumno</CardTitle>
                <CardDescription className="mt-2">
                  Ingresa con tu matrícula y contraseña para acceder a tu información académica
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="matricula">Matrícula</Label>
                  <Input
                    id="matricula"
                    type="text"
                    placeholder="Ej: 123456"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
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
                  {loading ? "Ingresando..." : "Ingresar"}
                </Button>
              </form>

              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Demo:</strong> Usa matrícula <code className="rounded bg-primary/10 px-2 py-1">123456</code> y
                  contraseña <code className="rounded bg-primary/10 px-2 py-1">alumno123</code>
                </p>
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

export default LoginAlumno;
