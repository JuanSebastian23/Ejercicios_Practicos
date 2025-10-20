# Lista Genérica TypeScript

Componente de lista genérica tipado en TypeScript que puede recibir y renderizar arrays de objetos de cualquier tipo.

## Características

- Componente genérico `GenericList<T>` con tipos TypeScript
- Función render personalizable para cada tipo de dato
- Tres ejemplos de uso: Productos, Usuarios y Libros
- Interfaz con botones para alternar entre listas
- Badges para información adicional
- Mensaje cuando no hay datos
- Diseño responsivo con Bootstrap

## Tecnologías

- React 18
- TypeScript
- Bootstrap 5
- Vite

## Componente Genérico

```typescript
interface GenericListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => ReactElement
  title: string
}
```

El componente acepta:
- `data`: Array de elementos de cualquier tipo T
- `renderItem`: Función que define cómo renderizar cada elemento
- `title`: Título de la lista

## Instalación

```bash
npm install
npm run dev
```

La aplicación se ejecutará en http://localhost:5173 (o siguiente puerto disponible)

## Uso del Componente

```typescript
const products: Product[] = [
  { id: 1, name: 'Laptop', price: 899, stock: 15 }
]

const renderProduct = (product: Product, index: number) => (
  <div key={product.id}>
    <h5>{product.name}</h5>
    <p>Precio: ${product.price}</p>
  </div>
)

<GenericList 
  data={products} 
  renderItem={renderProduct} 
  title="Lista de Productos" 
/>
```

## Estructura

- `/src/GenericList.tsx` - Componente genérico reutilizable
- `/src/types.ts` - Interfaces TypeScript para Product, User, Book
- `/src/App.tsx` - Ejemplos de uso del componente
- Tres tipos de datos diferentes con renders personalizados
