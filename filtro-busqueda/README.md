# Filtro de Búsqueda de Libros

Aplicación React con TypeScript que implementa un filtro de búsqueda en tiempo real sobre una lista de libros obtenida desde una API de Node.js.

## Características

- Búsqueda en tiempo real por título, autor, género o año
- Interfaz limpia en blanco y negro
- Tabla responsiva con Bootstrap
- API REST con Express
- TypeScript en frontend y backend
- Estados de carga y error

## Tecnologías

- React 18 + TypeScript
- Bootstrap 5
- Node.js + Express
- Vite

## Instalación

### Backend (servidor)

```bash
cd server
npm install
npm start
```

El servidor se ejecutará en http://localhost:5000

### Frontend

```bash
npm install
npm run dev
```

La aplicación se ejecutará en http://localhost:5173

## Uso

1. Inicia el servidor backend
2. Inicia la aplicación React
3. Escribe en el campo de búsqueda para filtrar los libros por cualquier campo
4. Los resultados se actualizan en tiempo real

## Estructura

- `/src/App.tsx` - Componente principal con la lógica de búsqueda
- `/src/types.ts` - Definiciones de tipos TypeScript
- `/server/index.js` - API REST con datos de libros

