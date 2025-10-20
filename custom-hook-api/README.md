# Custom Hook useApi

Hook personalizado en TypeScript para manejar llamadas a APIs con estados de loading, error y data.

## Características

- Hook personalizado `useApi<T>` con TypeScript genérico
- Estados automáticos: `loading`, `error`, `data`
- Función `refetch` para recargar datos
- Consumo de API pública JSONPlaceholder
- Cambio dinámico entre Posts y Users
- Grid responsivo de tarjetas para posts
- Tabla responsiva para usuarios
- Diseño en blanco y negro con Bootstrap
- Manejo de errores completo

## Tecnologías

- React 18 + TypeScript
- Bootstrap 5
- Fetch API
- Vite
- Custom Hooks

## Hook useApi

```typescript
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useApi<T>(url: string) {
  // Retorna: { data, loading, error, refetch }
}
```

## Uso del Hook

```typescript
const { data, loading, error, refetch } = useApi<Post[]>('https://api.example.com/posts')

if (loading) return <Spinner />
if (error) return <Error message={error} />
return <DataDisplay data={data} onRefresh={refetch} />
```

## Instalación

```bash
npm install
npm run dev
```

La aplicación se ejecutará en http://localhost:5176

## Funcionalidades

1. **Selección de API:** Alterna entre Posts y Users
2. **Estado de Carga:** Spinner animado mientras carga
3. **Manejo de Errores:** Mensajes claros de error
4. **Visualización de Datos:** Grid de tarjetas o tabla según el tipo
5. **Refetch:** Botón para recargar los datos manualmente

## Estructura

- `/src/useApi.ts` - Hook personalizado con tipos genéricos
- `/src/types.ts` - Interfaces TypeScript para datos de API
- `/src/App.tsx` - Componente que usa el hook
- API externa: JSONPlaceholder (posts y users)
