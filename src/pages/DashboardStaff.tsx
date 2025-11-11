import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/lib/api";
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
import { Users, LogOut, Search, UserPlus, FileText, Download, BarChart3, Calendar, Award, Edit, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardStaff = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAlumno, setSelectedAlumno] = useState<string | null>(null);
  const [selectedClase, setSelectedClase] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("");
  const [nota, setNota] = useState("");
  const [observacion, setObservacion] = useState("");

  const [alumnos, setAlumnos] = useState<any[]>([]);
  const [asistencias, setAsistencias] = useState<any[]>([]);
  const [notas, setNotas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Obtener staff autenticado
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const id_staff = user?.id;

  // 🔹 Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [alumnosData, asistenciasData, notasData] = await Promise.all([
          fetchWithAuth("/alumnos"),
          fetchWithAuth("/asistencias"),
          fetchWithAuth("/notas"),
        ]);
        setAlumnos(alumnosData);
        setAsistencias(asistenciasData);
        setNotas(notasData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("No se pudieron cargar los datos del dashboard");
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  // 🔸 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Sesión cerrada correctamente");
    navigate("/");
  };

  const filteredAlumnos = alumnos.filter(
    (a) =>
      a.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.rut?.includes(searchTerm)
  );

  // 📅 Guardar asistencia real
  const handleSaveAttendance = async () => {
    if (!selectedAlumno || !selectedClase || !selectedEstado) {
      toast.error("Completa todos los campos de asistencia");
      return;
    }

    try {
      const body = {
        id_alumno: selectedAlumno,
        id_staff,
        fecha: new Date().toISOString().split("T")[0],
        presente: selectedEstado === "presente",
        clase: selectedClase,
      };
      
console.log("Registrando asistencia:", { id_alumno: selectedAlumno, id_staff: user.id });

      await fetchWithAuth("/asistencias", {
        method: "POST",
        body: JSON.stringify({
          id_alumno: selectedAlumno,
          id_staff:user.id,
          fecha: new Date().toISOString().split("T")[0],
          presente: selectedEstado === "presente",
          observacion: selectedClase, // usamos este campo para guardar la clase seleccionada
        }),
      });

      toast.success("✅ Asistencia registrada correctamente");
      setSelectedAlumno(null);
      setSelectedClase("");
      setSelectedEstado("");

      // 🔁 Recargar asistencias
      const updated = await fetchWithAuth("/asistencias");
      setAsistencias(updated);
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
      toast.error("Error al guardar asistencia");
    }
  };

  // 🧮 Guardar nota real
  const handleSaveGrade = async () => {
    if (!selectedAlumno || !selectedMateria || !nota) {
      toast.error("Completa todos los campos de calificación");
      return;
    }

    try {
      const body = {
        id_alumno: selectedAlumno,
        id_staff,
        modulo: selectedMateria,
        nota: parseFloat(nota),
        comentario: observacion,
      };

      await fetchWithAuth("/notas", {
        method: "POST",
        body: JSON.stringify(body),
      });

      toast.success("✅ Nota registrada correctamente");
      setNota("");
      setObservacion("");
      setSelectedAlumno(null);
      setSelectedMateria("");

      // 🔁 Recargar notas
      const updated = await fetchWithAuth("/notas");
      setNotas(updated);
    } catch (error) {
      console.error("Error al guardar nota:", error);
      toast.error("Error al guardar calificación");
    }
  };

  if (loading) return <div className="text-center mt-20">Cargando datos...</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 py-8 md:px-6">
          {/* Header del dashboard */}
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

          <Tabs defaultValue="alumnos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="alumnos">Alumnos</TabsTrigger>
              <TabsTrigger value="asistencias">Asistencias</TabsTrigger>
              <TabsTrigger value="notas">Notas</TabsTrigger>
            </TabsList>

            {/* TAB ALUMNOS */}
            <TabsContent value="alumnos">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Gestión de Alumnos</CardTitle>
                  <CardDescription>Busca, edita y administra información de estudiantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Buscar por nombre o RUT..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 border-2"
                  />
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>RUT</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAlumnos.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>{a.rut}</TableCell>
                          <TableCell>{a.nombre}</TableCell>
                          <TableCell>{a.correo}</TableCell>
                          <TableCell>
                            <Badge variant={a.estado === "Activo" ? "default" : "secondary"}>
                              {a.estado}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB ASISTENCIAS */}
            <TabsContent value="asistencias">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Registro de Asistencia</CardTitle>
                  <CardDescription>Marca la asistencia de los alumnos</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Formulario */}
                  <div className="space-y-4 mb-6">
                    <Select onValueChange={(val) => setSelectedAlumno(val)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Seleccionar alumno" />
                      </SelectTrigger>
                      <SelectContent>
                        {alumnos.map((a) => (
                          <SelectItem key={a.id} value={a.id.toString()}>
                            {a.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select onValueChange={setSelectedClase}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Seleccionar clase" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="powerbi">Power BI</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select onValueChange={setSelectedEstado}>
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

                    <Button variant="hero" onClick={handleSaveAttendance} className="w-full">
                      <Save className="mr-2 h-4 w-4" /> Guardar Asistencia
                    </Button>
                  </div>

                  {/* Tabla de asistencias registradas */}
                  <Card className="border mt-6">
                    <CardHeader>
                      <CardTitle>Asistencias Recientes</CardTitle>
                      <CardDescription>Historial de las últimas asistencias registradas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Alumno</TableHead>
                            <TableHead>Clase</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Estado</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {asistencias.slice(-10).map((a) => (
                            <TableRow key={a.id}>
                              <TableCell>{a.alumno_nombre}</TableCell>
                              <TableCell>{a.clase}</TableCell>
                              <TableCell>{a.fecha}</TableCell>
                              <TableCell>
                                <Badge variant={a.presente ? "default" : "secondary"}>
                                  {a.presente ? "Presente" : "Ausente"}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB NOTAS */}
            <TabsContent value="notas">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Registro de Calificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Formulario */}
                  <div className="grid gap-4 md:grid-cols-2 mb-6">
                    <div>
                      <Label>Alumno</Label>
                      <Select onValueChange={(val) => setSelectedAlumno(val)}>
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Seleccionar alumno" />
                        </SelectTrigger>
                        <SelectContent>
                          {alumnos.map((a) => (
                            <SelectItem key={a.id} value={a.id.toString()}>
                              {a.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Materia</Label>
                      <Select onValueChange={setSelectedMateria}>
                        <SelectTrigger className="border-2">
                          <SelectValue placeholder="Seleccionar materia" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="sql">SQL</SelectItem>
                          <SelectItem value="powerbi">Power BI</SelectItem>
                          <SelectItem value="python">Python</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Nota (1.0 - 7.0)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="1.0"
                        max="7.0"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        className="border-2"
                      />
                    </div>
                    <div>
                      <Label>Observación</Label>
                      <Input
                        placeholder="Ej: Buen trabajo"
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        className="border-2"
                      />
                    </div>
                  </div>

                  <Button variant="hero" onClick={handleSaveGrade} className="w-full mt-4">
                    <Save className="mr-2 h-4 w-4" /> Guardar Calificación
                  </Button>

                  {/* Tabla de notas registradas */}
                  <Card className="border mt-6">
                    <CardHeader>
                      <CardTitle>Notas Registradas</CardTitle>
                      <CardDescription>Últimas calificaciones ingresadas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Alumno</TableHead>
                            <TableHead>Materia</TableHead>
                            <TableHead>Nota</TableHead>
                            <TableHead>Comentario</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {notas.slice(-10).map((n) => (
                            <TableRow key={n.id}>
                              <TableCell>{n.alumno_nombre}</TableCell>
                              <TableCell>{n.modulo}</TableCell>
                              <TableCell>{n.nota}</TableCell>
                              <TableCell>{n.comentario}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardStaff;
