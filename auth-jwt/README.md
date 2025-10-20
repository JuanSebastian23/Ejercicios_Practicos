# Sistema de Autenticación con JWT

Aplicación full-stack con sistema de autenticación usando JSON Web Tokens (JWT). Backend en Node.js y frontend en React con TypeScript.

## Características

- Registro de usuarios con contraseñas encriptadas (bcrypt)
- Login con validación de credenciales
- Generación de tokens JWT
- Protección de rutas con middleware
- Perfil de usuario autenticado
- Acceso a datos protegidos
- Persistencia de sesión con localStorage
- Diseño en blanco y negro con Bootstrap

## Tecnologías

### Backend
- Node.js + Express
- JWT (jsonwebtoken)
- bcryptjs para encriptación
- CORS habilitado

### Frontend
- React 18 + TypeScript
- Axios para peticiones HTTP
- Bootstrap 5
- LocalStorage para tokens
- Vite

## Instalación

### Backend (servidor)

```bash
cd server
npm install
npm start
```

El servidor se ejecutará en http://localhost:4001

### Frontend

```bash
npm install
npm run dev
```

La aplicación se ejecutará en http://localhost:5175

## Usuarios de Prueba

- **Usuario:** admin / **Contraseña:** 123456
- **Usuario:** usuario / **Contraseña:** 123456

## Funcionalidades

1. **Registro:** Crear nueva cuenta con validación
2. **Login:** Autenticación con usuario y contraseña
3. **Dashboard:** Ver perfil del usuario autenticado
4. **Datos Protegidos:** Acceder a rutas protegidas con token
5. **Logout:** Cerrar sesión y limpiar token

## Estructura

- `/src/App.tsx` - Componente principal con formularios
- `/src/authService.ts` - Servicios de API con Axios
- `/src/types.ts` - Definiciones de tipos TypeScript
- `/server/index.js` - API REST con Express y JWT

## Endpoints API

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (protegido)
- `GET /api/protected` - Datos protegidos (requiere token)
