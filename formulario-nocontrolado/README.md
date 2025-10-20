# Formulario No Controlado con useRef

Aplicación React con TypeScript que implementa un formulario no controlado usando `useRef` para el manejo de inputs.

## Características

- Formulario no controlado con useRef
- Tipado fuerte con TypeScript
- Múltiples campos: nombre, email, teléfono, edad, mensaje
- Botones de enviar y limpiar formulario
- Almacenamiento de datos enviados
- Visualización de registros en tarjetas
- Eliminación individual de registros
- Diseño en blanco y negro con Bootstrap
- Validación HTML5

## Tecnologías

- React 18 + TypeScript
- Bootstrap 5
- useRef para referencias a elementos DOM
- Vite

## Instalación

```bash
npm install
npm run dev
```

La aplicación se ejecutará en http://localhost:5175

## Uso

1. Completa los campos del formulario
2. Haz clic en "Enviar" para guardar los datos
3. Los datos se mostrarán en tarjetas debajo del formulario
4. Usa "Limpiar" para resetear el formulario
5. Puedes eliminar registros individualmente

## Estructura

- `/src/App.tsx` - Componente principal con formulario no controlado
- `/src/types.ts` - Definiciones de tipos TypeScript
- `useRef` para acceder a valores de inputs sin estado controlado
