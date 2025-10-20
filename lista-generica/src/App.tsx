import { useState } from 'react'
import GenericList from './GenericList'
import type { Product, User, Book } from './types'
import './App.css'

function App() {
  const [activeList, setActiveList] = useState<'products' | 'users' | 'books'>('products')

  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 899, stock: 15 },
    { id: 2, name: 'Mouse', price: 25, stock: 50 },
    { id: 3, name: 'Teclado', price: 45, stock: 30 },
    { id: 4, name: 'Monitor', price: 299, stock: 20 },
    { id: 5, name: 'Auriculares', price: 79, stock: 40 }
  ]

  const users: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', age: 28 },
    { id: 2, name: 'María García', email: 'maria@example.com', age: 32 },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', age: 25 },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', age: 30 }
  ]

  const books: Book[] = [
    { id: 1, title: 'Cien años de soledad', author: 'Gabriel García Márquez', year: 1967 },
    { id: 2, title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', year: 1605 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
    { id: 4, title: 'El principito', author: 'Antoine de Saint-Exupéry', year: 1943 },
    { id: 5, title: 'Rayuela', author: 'Julio Cortázar', year: 1963 }
  ]

  const renderProduct = (product: Product, index: number) => (
    <div key={product.id} className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{index + 1}. {product.name}</h5>
          <p className="mb-1">Precio: ${product.price}</p>
        </div>
        <span className="badge bg-dark">Stock: {product.stock}</span>
      </div>
    </div>
  )

  const renderUser = (user: User, index: number) => (
    <div key={user.id} className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{index + 1}. {user.name}</h5>
          <p className="mb-1">{user.email}</p>
        </div>
        <span className="badge bg-secondary">{user.age} años</span>
      </div>
    </div>
  )

  const renderBook = (book: Book, index: number) => (
    <div key={book.id} className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{index + 1}. {book.title}</h5>
          <p className="mb-1">Autor: {book.author}</p>
        </div>
        <span className="badge bg-dark">{book.year}</span>
      </div>
    </div>
  )

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Lista Genérica TypeScript</h1>

      <div className="btn-group w-100 mb-4">
        <button 
          className={`btn ${activeList === 'products' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setActiveList('products')}
        >
          Productos
        </button>
        <button 
          className={`btn ${activeList === 'users' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setActiveList('users')}
        >
          Usuarios
        </button>
        <button 
          className={`btn ${activeList === 'books' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setActiveList('books')}
        >
          Libros
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          {activeList === 'products' && (
            <GenericList 
              data={products} 
              renderItem={renderProduct} 
              title="Lista de Productos" 
            />
          )}
          {activeList === 'users' && (
            <GenericList 
              data={users} 
              renderItem={renderUser} 
              title="Lista de Usuarios" 
            />
          )}
          {activeList === 'books' && (
            <GenericList 
              data={books} 
              renderItem={renderBook} 
              title="Lista de Libros" 
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
