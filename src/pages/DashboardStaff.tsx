import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Users,
  LogOut,
  Search,
  UserPlus,
  FileText,
  Download,
  BarChart3,
  Calendar,
  Award,
  Edit,
  Save,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardStaff = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumno, setSelectedAlumno] = useState<number | null>(null);

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  // Datos de ejemplo
  const alumnos = [
    { id: 1, matricula: "123456", nombre: "Juan Pérez", email: "juan@mail.com", promedio: 6.5, asistencia: 95 },
    { id: 2, matricula: "123457", nombre: "María González", email: "maria@mail.com", promedio: 6.8, asistencia: 90 },
    { id: 3, matricula: "123458", nombre: "Carlos Rojas", email: "carlos@mail.com", promedio: 6.2, asistencia: 85 },
    { id: 4, matricula: "123459", nombre: "Ana Silva", email: "ana@mail.com", promedio: 7.0, asistencia: 100 },
  ];

  const filteredAlumnos = alumnos.filter(
    (alumno) =>
      alumno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.matricula.includes(searchTerm)
  );

  const handleSaveAttendance = () => {
    toast.success("Asistencia guardada correctamente");
  };

  const handleSaveGrade = () => {
    toast.success("Nota guardada correctamente");
  };

  const handleExport = (format: string) => {
    toast.success(`Exportando reporte en formato ${format.toUpperCase()}...`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {/* Header del Dashboard */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">Panel Administrativo</h1>
              <p className="text-muted-foreground">Gestión de alumnos, asistencias y calificaciones</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  Total Alumnos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{alumnos.length}</div>
                <p className="mt-1 text-sm text-muted-foreground">Activos en el sistema</p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/50">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  Promedio General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {(alumnos.reduce((acc, a) => acc + a.promedio, 0) / alumnos.length).toFixed(1)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">De todos los alumnos</p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/50">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  Asistencia Promedio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {Math.round(alumnos.reduce((acc, a) => acc + a.asistencia, 0) / alumnos.length)}%
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Último mes</p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-4 w-4 text-primary" />
                  </div>
                  Excelencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {alumnos.filter((a) => a.promedio >= 6.5).length}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Alumnos destacados</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="alumnos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="alumnos">
                <Users className="mr-2 h-4 w-4" />
                Alumnos
              </TabsTrigger>
              <TabsTrigger value="asistencias">
                <Calendar className="mr-2 h-4 w-4" />
                Asistencias
              </TabsTrigger>
              <TabsTrigger value="notas">
                <Award className="mr-2 h-4 w-4" />
                Notas
              </TabsTrigger>
            </TabsList>

            {/* Tab: Lista de Alumnos */}
            <TabsContent value="alumnos" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle>Gestión de Alumnos</CardTitle>
                      <CardDescription>Busca, edita y administra información de estudiantes</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                      </Button>
                      <Button variant="hero">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Agregar Alumno
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nombre o matrícula..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-2 pl-10"
                      />
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matrícula</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Promedio</TableHead>
                        <TableHead>Asistencia</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlumnos.map((alumno) => (
                        <TableRow key={alumno.id}>
                          <TableCell className="font-medium">{alumno.matricula}</TableCell>
                          <TableCell>{alumno.nombre}</TableCell>
                          <TableCell className="text-muted-foreground">{alumno.email}</TableCell>
                          <TableCell>
                            <Badge variant={alumno.promedio >= 6.5 ? "default" : "secondary"}>
                              {alumno.promedio.toFixed(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={alumno.asistencia >= 90 ? "default" : "secondary"}>
                              {alumno.asistencia}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedAlumno(alumno.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Asistencias */}
            <TabsContent value="asistencias" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Registro de Asistencia</CardTitle>
                  <CardDescription>Marca la asistencia de los alumnos por clase</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Alumno</Label>
                        <Select>
                          <SelectTrigger className="border-2">
                            <SelectValue placeholder="Seleccionar alumno" />
                          </SelectTrigger>
                          <SelectContent>
                            {alumnos.map((alumno) => (
                              <SelectItem key={alumno.id} value={alumno.id.toString()}>
                                {alumno.nombre} - {alumno.matricula}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" className="border-2" defaultValue={new Date().toISOString().split("T")[0]} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Clase</Label>
                      <Select>
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Seleccionar clase" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prog-web">Programación Web</SelectItem>
                          <SelectItem value="bd">Base de Datos</SelectItem>
                          <SelectItem value="ui-ux">Diseño UI/UX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Estado</Label>
                      <Select>
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presente">Presente</SelectItem>
                          <SelectItem value="ausente">Ausente</SelectItem>
                          <SelectItem value="tardanza">Tardanza</SelectItem>
                          <SelectItem value="justificado">Justificado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="hero" onClick={handleSaveAttendance} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Asistencia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Notas */}
            <TabsContent value="notas" className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Registro de Calificaciones</CardTitle>
                  <CardDescription>Ingresa las notas de los alumnos por materia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Alumno</Label>
                        <Select>
                          <SelectTrigger className="border-2">
                            <SelectValue placeholder="Seleccionar alumno" />
                          </SelectTrigger>
                          <SelectContent>
                            {alumnos.map((alumno) => (
                              <SelectItem key={alumno.id} value={alumno.id.toString()}>
                                {alumno.nombre} - {alumno.matricula}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Materia</Label>
                        <Select>
                          <SelectTrigger className="border-2">
                            <SelectValue placeholder="Seleccionar materia" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="prog-web">Programación Web</SelectItem>
                            <SelectItem value="bd">Base de Datos</SelectItem>
                            <SelectItem value="ui-ux">Diseño UI/UX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Calificación (1.0 - 7.0)</Label>
                        <Input type="number" min="1.0" max="7.0" step="0.1" placeholder="Ej: 6.5" className="border-2" />
                      </div>
                      <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input type="date" className="border-2" defaultValue={new Date().toISOString().split("T")[0]} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Observación</Label>
                      <Input placeholder="Ej: Excelente proyecto final" className="border-2" />
                    </div>

                    <Button variant="hero" onClick={handleSaveGrade} className="w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Calificación
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Reportes */}
          <Card className="mt-8 border-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Reportes y Estadísticas</CardTitle>
                  <CardDescription>Descarga reportes detallados de rendimiento académico</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" onClick={() => handleExport("pdf")} className="h-auto flex-col items-start gap-2 p-4">
                  <div className="flex w-full items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span className="font-semibold">Reporte General PDF</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Reporte completo con todos los alumnos</p>
                </Button>

                <Button variant="outline" onClick={() => handleExport("csv")} className="h-auto flex-col items-start gap-2 p-4">
                  <div className="flex w-full items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span className="font-semibold">Asistencias CSV</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Exportar registros de asistencia</p>
                </Button>

                <Button variant="outline" onClick={() => handleExport("csv")} className="h-auto flex-col items-start gap-2 p-4">
                  <div className="flex w-full items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span className="font-semibold">Calificaciones CSV</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Exportar registros de notas</p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardStaff;
