
# Proyecto E-Commerce 🛒

Aplicación web full-stack de e-commerce construida con **React + Node.js/Express + PostgreSQL**, que permite registro y login de usuarios, navegación de productos, gestión de carrito, compras y un panel de administración para CRUD de productos.

---

## 🚀 Tecnologías utilizadas

- **Frontend:**  
  - React  
  - React Router DOM  
  - Context API (manejo de sesión y carrito)  
  - Bootstrap & React-Bootstrap  
  - PrimeReact (componentes UI)  

- **Backend:**  
  - Node.js + Express  
  - PostgreSQL (conexión vía `pg`)  
  - JSON Web Token (JWT) para autenticación  
  - Middleware de seguridad (auth y roles)

---

## 📂 Estructura del proyecto

proyecto_desafioLATAM/
│
├── frontend/ # Aplicación React (Vite/CRA)
│ ├── src/
│ │ ├── context/ # Contextos globales (UserContext, CartContext)
│ │ ├── pages/ # Páginas principales (Login, Register, Profile, Cart, Admin, etc.)
│ │ ├── components/ # Componentes reutilizables (Navbar, Botón, etc.)
│ │ └── api/ # Función helper para fetch API
│ └── ...
│
├── backend/ # Servidor Express
│ ├── routes/ # Definición de rutas (usuarios, productos, compras)
│ ├── controllers/ # Controladores (auth, productos, compras)
│ ├── models/ # Consultas SQL a la BD
│ ├── middlewares/ # authMiddleware, adminMiddleware
│ ├── schemas/ # DDL.sql y conexión DB
│ └── index.js # Punto de entrada del servidor
│
└── README.md


## ⚙️ Instalación y ejecución

### 1. Clonar repositorio
git clone https://github.com/AlexDays89/proyecto_desafioLATAM.git

2. Configurar backend
Entrar a la carpeta backend/

Crear archivo .env con variables:

PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=tu_password
DATABASE_NAME=aritarot_db
DATABASE_PORT=5432
JWT_SECRET=clave_secreta
Crear base de datos y ejecutar schemas/DDL.sql en PostgreSQL para inicializar tablas.

Instalar dependencias y levantar servidor:


cd backend
npm install
npm run dev   # o node index.js

3. Configurar frontend
Entrar a la carpeta frontend/

Crear archivo .env:

VITE_API_BASE_URL=http://localhost:3000
Instalar dependencias y levantar:

cd frontend
npm install
npm run dev
Abrir en navegador: http://localhost:5173/ (o el puerto indicado).

🔑 Funcionalidades principales
Usuarios:

Registro con JWT automático.

Login con persistencia de sesión vía localStorage.

Perfil editable (nombre, apellido, dirección, email).

Historial de compras en el perfil.

Carrito de compras:

Añadir productos, modificar cantidades y eliminar items.

Cálculo automático de total (useMemo).

Proceso de pago simulado con confirmación de compra.

Compras:

Registro de órdenes en DB (compras + carrito_items).

Visualización de órdenes previas y detalles desde el perfil.

Administrador:

Panel para CRUD de productos (crear, editar, eliminar).

Subida de imágenes en Base64.

Protegido por rol admin.

CLAVE DE USUARIO PARA PRUEBA:

**ROL admin:**  
admin@admin.com  
**PASS admin:**  
admin123  

**ROL user:**  
user@user.com  
**PASS user:**  
user123  

https://proyecto-desafio-latam-rfqw.vercel.app/
