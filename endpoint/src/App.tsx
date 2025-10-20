import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from './types'
import './App.css'

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    <p className="loading-text">Cargando productos...</p>
  </div>
)

const ErrorMessage = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="error-container">
    <div className="alert-error">
      <strong>Error:</strong> {error}
    </div>
    <button className="btn btn-retry" onClick={onRetry}>
      Reintentar
    </button>
  </div>
)

const EmptyState = () => (
  <div className="empty-state">
    <h3>No hay productos</h3>
    <p>No se encontraron productos disponibles</p>
  </div>
)

const ProductCard = ({ product }: { product: Product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <div className="product-body">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <span className={product.stock > 10 ? 'badge-stock' : 'badge-low-stock'}>
          Stock: {product.stock}
        </span>
      </div>
    </div>
  </div>
)

const ProductsGrid = ({ products }: { products: Product[] }) => (
  <div className="products-grid">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<Product[]>('http://localhost:4000/api/products')
      setProducts(response.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message)
      } else {
        setError('Error desconocido')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const renderContent = () => {
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage error={error} onRetry={fetchProducts} />
    if (products.length === 0) return <EmptyState />
    return <ProductsGrid products={products} />
  }

  return (
    <div className="app-container">
      <div className="main-card">
        <h1>Catálogo de Productos</h1>
        {renderContent()}
      </div>
    </div>
  )
}

export default App
