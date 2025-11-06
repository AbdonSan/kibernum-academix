import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginAlumno from "./pages/LoginAlumno";
import DashboardAlumno from "./pages/DashboardAlumno";
import LoginStaff from "./pages/LoginStaff";
import DashboardStaff from "./pages/DashboardStaff";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-alumno" element={<LoginAlumno />} />
          <Route path="/dashboard-alumno" element={<DashboardAlumno />} />
          <Route path="/login-staff" element={<LoginStaff />} />
          <Route path="/dashboard-staff" element={<DashboardStaff />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
