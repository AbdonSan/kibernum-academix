````markdown
# 🎓 Frontend – Kibernum Academix

Interfaz web del **Portal Académico** desarrollada con **React + TypeScript + Vite**, conectada al backend Node.js del proyecto **Portal Académico**.  
Permite la gestión visual y segura de alumnos, asistencias y calificaciones, según el rol del usuario.

---

## 🧩 Tecnologías principales

| Área | Stack |
|------|--------|
| Framework | React + Vite + TypeScript |
| Estilos | Tailwind CSS + Shadcn/UI |
| Ruteo | React Router DOM |
| UI Icons | Lucide React |
| Notificaciones | Sonner |
| API | fetchWithAuth (custom helper con JWT) |

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tuusuario/kibernum-academix.git
cd kibernum-academix
````

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```bash
VITE_API_URL=http://localhost:8080/api
```

### 4️⃣ Iniciar el entorno de desarrollo

```bash
npm run dev
```

Accede a:
👉 [http://localhost:5173](http://localhost:5173)

---

## 🧠 Estructura del proyecto

```
src/
├── components/
│   ├── ui/                # Componentes base (Button, Card, Input, etc.)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── NavLink.tsx
│
├── context/
│   ├── AuthContext.tsx    # Manejo global de autenticación
│   └── PrivateRoute.tsx   # Protege rutas según rol
│
├── lib/
│   ├── api.js             # Helper fetchWithAuth (JWT + Fetch)
│   └── utils.ts           # Funciones auxiliares
│
├── pages/
│   ├── Home.tsx
│   ├── Cursos.tsx
│   ├── Acerca.tsx
│   ├── LoginAlumno.tsx
│   ├── LoginStaff.tsx
│   ├── DashboardAlumno.tsx
│   ├── DashboardStaff.tsx
│   └── NotFound.tsx
│
├── App.tsx                # Configuración de rutas principales
├── main.tsx               # Punto de entrada
└── index.css              # Estilos globales
```

---

## 🔐 Autenticación y Roles

El sistema usa **JWT** emitido por el backend.
Al iniciar sesión, el token y los datos del usuario se guardan en `localStorage`.

### Ejemplo de login

```ts
if (data.user.rol === 1) navigate("/dashboard-admin");
else if (data.user.rol === 2) navigate("/dashboard-staff");
else navigate("/dashboard-alumno");
```

### Contexto de autenticación (`AuthContext.tsx`)

Provee acceso global a `user` y `token`.

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Rutas protegidas (`PrivateRoute.tsx`)

```tsx
if (!token) return <Navigate to="/" replace />;
if (roles && !roles.includes(user?.rol)) return <Navigate to="/unauthorized" replace />;
```

---

## 🌐 Conexión con el Backend

Archivo: `src/lib/api.js`

```js
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Error al conectar con el servidor");
  return res.json();
};
```

---

## 📊 Dashboard Staff

El **panel administrativo** permite:

✅ Ver y buscar alumnos.
✅ Registrar asistencias (con fecha, estado, observación).
✅ Registrar calificaciones por módulo.
✅ Exportar reportes en CSV o PDF.

### Ejemplo de registro de asistencia:

```js
await fetchWithAuth("/asistencias", {
  method: "POST",
  body: JSON.stringify({
    id_alumno,
    id_staff: user.id,
    fecha: new Date().toISOString().split("T")[0],
    presente: true,
    observacion: "Programación Web"
  }),
});
```

### Ejemplo de registro de notas:

```js
await fetchWithAuth("/notas", {
  method: "POST",
  body: JSON.stringify({
    id_alumno,
    id_staff: user.id,
    modulo: "Base de Datos",
    nota: 6.5,
    comentario: "Excelente entrega final"
  }),
});
```

---

## 💡 Componentes destacados

| Componente           | Función                                |
| -------------------- | -------------------------------------- |
| `Header.tsx`         | Menú principal con navegación reactiva |
| `Footer.tsx`         | Pie informativo con contacto           |
| `DashboardStaff.tsx` | Panel de gestión académico             |
| `AuthContext.tsx`    | Manejo global de usuario y sesión      |
| `PrivateRoute.tsx`   | Protección de rutas según rol          |

---

## 🎨 Estilo visual

* **Tailwind CSS**: Diseño responsive y minimalista.
* **Shadcn/UI**: Tarjetas, botones y pestañas modernas.
* **Lucide React**: Íconos SVG elegantes y accesibles.
* **Sonner**: Notificaciones flotantes tipo “toast”.

---

## 🧾 Scripts disponibles

| Comando           | Descripción                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo      |
| `npm run build`   | Compila la aplicación para producción |
| `npm run preview` | Previsualiza el build generado        |

---

## 🚀 Estado actual

✅ Login funcional (alumno/staff)
✅ Conexión API segura con JWT
✅ Dashboard Staff con gestión visual
⚙️ En desarrollo:

* Mejorar persistencia visual tras registrar asistencia/notas
* Integrar reportes dinámicos por módulo y alumno

---

## 👨‍💻 Autor

**Abdón Sandoval**
Proyecto académico – Kibernum Academy
📧 [abdon.sandoval@kibernum.com](mailto:abdon.sandoval@kibernum.com)

---

> 💬 Proyecto en desarrollo continuo — Integración directa con el backend del Portal Académico.

```

---

