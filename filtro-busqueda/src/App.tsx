import { useState, useEffect } from 'react'
import './App.css'
import type { Libro } from './types'

function App() {
  const [libros, setLibros] = useState<Libro[]>([])
  const [filteredLibros, setFilteredLibros] = useState<Libro[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchLibros()
  }, [])

  useEffect(() => {
    filterLibros()
  }, [searchTerm, libros])

  const fetchLibros = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/libros')
      if (!response.ok) throw new Error('Error al cargar los libros')
      const data = await response.json()
      setLibros(data)
      setFilteredLibros(data)
      setError('')
    } catch (err) {
      setError('No se pudieron cargar los libros. Verifica que el servidor esté ejecutándose.')
    } finally {
      setLoading(false)
    }
  }

  const filterLibros = () => {
    if (!searchTerm.trim()) {
      setFilteredLibros(libros)
      return
    }

    const term = searchTerm.toLowerCase()
    const filtered = libros.filter(libro =>
      libro.titulo.toLowerCase().includes(term) ||
      libro.autor.toLowerCase().includes(term) ||
      libro.genero.toLowerCase().includes(term) ||
      libro.año.toString().includes(term)
    )
    setFilteredLibros(filtered)
  }

  if (loading) {
    return (
      <div className="app-container">
        <div className="loading-spinner">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando libros...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="error-message">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <h1>Biblioteca de Libros</h1>
      
      <div className="search-box">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Buscar por título, autor, género o año..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="results-info">
        <strong>Resultados:</strong> {filteredLibros.length} de {libros.length} libros
        {searchTerm && ` (búsqueda: "${searchTerm}")`}
      </div>

      {filteredLibros.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron libros que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Género</th>
                <th>Año</th>
              </tr>
            </thead>
            <tbody>
              {filteredLibros.map(libro => (
                <tr key={libro.id}>
                  <td>{libro.id}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.genero}</td>
                  <td>{libro.año}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
