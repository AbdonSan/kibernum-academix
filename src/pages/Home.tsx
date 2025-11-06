import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  GraduationCap,
  UserCircle,
  Users,
  Shield,
  Smartphone,
  Zap,
  HeadphonesIcon,
  BookOpen,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <GraduationCap className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="mb-6 max-w-4xl text-white">
              Portal Académico
            </h1>
            
            <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
              Consulta tus asistencias y notas, o administra la información de los alumnos de forma segura y eficiente
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/login-alumno">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Ingreso Alumno
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/login-staff">
                  <Users className="mr-2 h-5 w-5" />
                  Ingreso Staff
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-foreground">Ventajas del Portal</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Una plataforma completa diseñada para facilitar la gestión académica
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Seguridad de Datos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Información protegida con los más altos estándares de seguridad y encriptación
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/30">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Acceso Multiplataforma</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Disponible desde cualquier dispositivo: computador, tablet o smartphone
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/30">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Facilidad de Uso</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Interfaz intuitiva y amigable, diseñada para una experiencia óptima
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <HeadphonesIcon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Soporte Técnico</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Equipo disponible para resolver tus dudas y asistirte cuando lo necesites
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Guía de Uso Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-foreground">Guía Rápida de Uso</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Aprende a utilizar el portal en simples pasos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Para Alumnos */}
            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
                  <UserCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Para Alumnos</CardTitle>
                <CardDescription>Cómo consultar tu información académica</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Accede al Portal Alumno</p>
                    <p className="text-sm text-muted-foreground">Ingresa con tu matrícula y contraseña</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Visualiza tus datos</p>
                    <p className="text-sm text-muted-foreground">Consulta asistencias, notas y calendario</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Mantente informado</p>
                    <p className="text-sm text-muted-foreground">Revisa regularmente tu progreso académico</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Para Staff */}
            <Card className="border-2">
              <CardHeader>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Para Staff</CardTitle>
                <CardDescription>Cómo gestionar información de alumnos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Ingresa al Panel Staff</p>
                    <p className="text-sm text-muted-foreground">Accede con tus credenciales administrativas</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Administra registros</p>
                    <p className="text-sm text-muted-foreground">Carga asistencias, notas y observaciones</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Genera reportes</p>
                    <p className="text-sm text-muted-foreground">Descarga estadísticas y reportes en PDF o CSV</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h2 className="text-foreground">Sistema Completo de Gestión Académica</h2>
              <p className="text-lg text-muted-foreground">
                El portal académico de Kibernum IT Academy ofrece todas las herramientas necesarias para el seguimiento
                y control del rendimiento estudiantil.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Control de Asistencia Automático</p>
                    <p className="text-sm text-muted-foreground">Registro diario de asistencia con calendario visual</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Gestión de Calificaciones</p>
                    <p className="text-sm text-muted-foreground">
                      Sistema completo para registro y seguimiento de notas por materia
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Reportes y Estadísticas</p>
                    <p className="text-sm text-muted-foreground">
                      Análisis detallado del rendimiento con gráficos y exportación de datos
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium">Acceso Seguro Multi-nivel</p>
                    <p className="text-sm text-muted-foreground">
                      Permisos diferenciados para alumnos, profesores y administradores
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="border-2 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Materias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Organización por materia y módulo</p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/30">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Análisis de rendimiento y progreso</p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/30">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Asistencias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Control diario y calendario visual</p>
                </CardContent>
              </Card>

              <Card className="border-2 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Seguridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Datos protegidos y encriptados</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="soporte" className="bg-gradient-to-br from-primary to-secondary py-20 text-white">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="mb-4">¿Necesitas Ayuda?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Nuestro equipo de soporte está disponible para asistirte con cualquier consulta o problema técnico
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90" asChild>
              <a href="mailto:soporte@kibernumitacademy.com">
                <HeadphonesIcon className="mr-2 h-5 w-5" />
                Contactar Soporte
              </a>
            </Button>
            <Button variant="outline" size="xl" className="border-2 border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
