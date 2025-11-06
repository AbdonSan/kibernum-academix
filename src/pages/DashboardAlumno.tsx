import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle, XCircle, TrendingUp, BookOpen, Award, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardAlumno = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  // Datos de ejemplo
  const asistencias = [
    { id: 1, fecha: "2025-01-10", estado: "presente", clase: "Programación Web" },
    { id: 2, fecha: "2025-01-09", estado: "presente", clase: "Base de Datos" },
    { id: 3, fecha: "2025-01-08", estado: "ausente", clase: "Programación Web" },
    { id: 4, fecha: "2025-01-07", estado: "presente", clase: "Diseño UI/UX" },
    { id: 5, fecha: "2025-01-06", estado: "presente", clase: "Base de Datos" },
  ];

  const notas = [
    { id: 1, materia: "Programación Web", nota: 6.5, fecha: "2025-01-08", observacion: "Excelente proyecto final" },
    { id: 2, materia: "Base de Datos", nota: 6.0, fecha: "2025-01-07", observacion: "Buen manejo de SQL" },
    { id: 3, materia: "Diseño UI/UX", nota: 7.0, fecha: "2025-01-05", observacion: "Diseño creativo y funcional" },
    { id: 4, materia: "Programación Web", nota: 5.8, fecha: "2024-12-20", observacion: "Práctica bien lograda" },
  ];

  const promedioGeneral = (notas.reduce((acc, nota) => acc + nota.nota, 0) / notas.length).toFixed(1);
  const asistenciasPorcentaje = Math.round((asistencias.filter((a) => a.estado === "presente").length / asistencias.length) * 100);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {/* Header del Dashboard */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">Mi Panel Académico</h1>
              <p className="text-muted-foreground">Bienvenido/a, Juan Pérez - Matrícula: 123456</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  Promedio General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{promedioGeneral}</div>
                <p className="mt-1 text-sm text-muted-foreground">De 7.0 posible</p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  Asistencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{asistenciasPorcentaje}%</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {asistencias.filter((a) => a.estado === "presente").length} de {asistencias.length} clases
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/50">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  Materias Activas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">3</div>
                <p className="mt-1 text-sm text-muted-foreground">Programación, BD, Diseño</p>
              </CardContent>
            </Card>
          </div>

          {/* Mensaje Motivacional */}
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/10">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">¡Sigue así!</h3>
                <p className="text-sm text-muted-foreground">
                  Tu rendimiento es excelente. Mantén tu asistencia y continúa esforzándote en tus estudios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tablas */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Asistencias */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Registro de Asistencia</CardTitle>
                    <CardDescription>Últimas 5 sesiones</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Clase</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asistencias.map((asistencia) => (
                      <TableRow key={asistencia.id}>
                        <TableCell className="font-medium">{asistencia.fecha}</TableCell>
                        <TableCell>{asistencia.clase}</TableCell>
                        <TableCell>
                          {asistencia.estado === "presente" ? (
                            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Presente
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="mr-1 h-3 w-3" />
                              Ausente
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Notas */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/50">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Calificaciones</CardTitle>
                    <CardDescription>Historial de notas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Materia</TableHead>
                      <TableHead>Nota</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notas.map((nota) => (
                      <TableRow key={nota.id}>
                        <TableCell className="font-medium">{nota.materia}</TableCell>
                        <TableCell>
                          <Badge
                            variant={nota.nota >= 6.0 ? "default" : "secondary"}
                            className={nota.nota >= 6.0 ? "bg-primary" : ""}
                          >
                            {nota.nota.toFixed(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{nota.fecha}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Observaciones Recientes */}
          <Card className="mt-8 border-2">
            <CardHeader>
              <CardTitle>Observaciones Recientes</CardTitle>
              <CardDescription>Comentarios de tus profesores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notas.slice(0, 3).map((nota) => (
                  <div key={nota.id} className="flex gap-4 rounded-lg border-2 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/30">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{nota.materia}</h4>
                        <Badge variant="outline" className="text-xs">
                          Nota: {nota.nota}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{nota.observacion}</p>
                      <p className="mt-2 text-xs text-muted-foreground">{nota.fecha}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardAlumno;
