import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import Acerca from "@/pages/Acerca";
import Cursos from "@/pages/Cursos";
import LoginAlumno from "@/pages/LoginAlumno";
import LoginStaff from "@/pages/LoginStaff";
import DashboardAlumno from "@/pages/DashboardAlumno";
import DashboardStaff from "@/pages/DashboardStaff";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/acerca" element={<Acerca />} />
          </Route>

          {/* Rutas sin layout */}
          <Route path="/login-alumno" element={<LoginAlumno />} />
          <Route path="/login-staff" element={<LoginStaff />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard-staff"
            element={
              <PrivateRoute roles={["admin", "staff"]}>
                <DashboardStaff />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard-alumno"
            element={
              <PrivateRoute roles={["alumno"]}>
                <DashboardAlumno />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;


{/*
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home";
import Cursos from "@/pages/Cursos";
import Acerca from "@/pages/Acerca";
import LoginAlumno from "@/pages/LoginAlumno";
import LoginStaff from "@/pages/LoginStaff";

import DashboardAlumno from "@/pages/DashboardAlumno";
import DashboardStaff from "@/pages/DashboardStaff";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/acerca" element={<Acerca />} />
        </Route>


        <Route path="/login-alumno" element={<LoginAlumno />} />
        <Route path="/login-staff" element={<LoginStaff />} />
        
        <Route path="/dashboard-alumno" element={<DashboardAlumno />} />
        <Route path="/dashboard-staff" element={<DashboardStaff />} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
*/}