import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = ({ children, roles }) => {
  const { user, token } = useAuth();

  // 🔹 Mapear roles numéricos del backend
  const roleMap = {
    1: "admin",
    2: "staff",
    3: "alumno",
  };

  const userRole = roleMap[user?.rol] || user?.rol;

  //console.log("🔒 PrivateRoute:", { token, userRole, expectedRoles: roles });

  // 🔐 No hay sesión iniciada
  if (!token) return <Navigate to="/login-staff" replace />;

  // 🚫 Usuario no autorizado
  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
