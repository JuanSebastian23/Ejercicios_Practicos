import { useState, useEffect } from 'react'
import { api, handleApiError } from '../utils/axiosConfig'
import { useError } from '../context/ErrorContext'
import { Usuario } from '../types'

export const UsuariosPanel = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { addError } = useError()

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const obtenerUsuarios = async () => {
    try {
      setLoading(true)
      const response = await api.get<Usuario[]>('/usuarios')
      setUsuarios(response.data)
    } catch (error) {
      addError(handleApiError(error))
    } finally {
      setLoading(false)
    }
  }

  const agregarUsuario = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await api.post<Usuario>('/usuarios', { nombre, email })
      setUsuarios([...usuarios, response.data])
      setNombre('')
      setEmail('')
    } catch (error) {
      addError(handleApiError(error))
    } finally {
      setLoading(false)
    }
  }

  const eliminarUsuario = async (id: number) => {
    try {
      setLoading(true)
      await api.delete(`/usuarios/${id}`)
      setUsuarios(usuarios.filter(u => u.id !== id))
    } catch (error) {
      addError(handleApiError(error))
    } finally {
      setLoading(false)
    }
  }

  const buscarUsuarioInexistente = async () => {
    try {
      setLoading(true)
      await api.get('/usuarios/999')
    } catch (error) {
      addError(handleApiError(error))
    } finally {
      setLoading(false)
    }
  }

  const generarErrorServidor = async () => {
    try {
      setLoading(true)
      await api.get('/error')
    } catch (error) {
      addError(handleApiError(error))
    } finally {
      setLoading(false)
    }
  }

  const generarErrorRuta = async () => {
    try {
      setLoading(true)
      await api.get('/ruta-inexistente')
    } catch (error) {
      addError(handleApiError(error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Gestion de Usuarios</h5>
      </div>
      <div className="card-body">
        <form onSubmit={agregarUsuario} className="mb-3">
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            Agregar Usuario
          </button>
        </form>

        <div className="mb-3">
          <h6>Probar Errores:</h6>
          <div className="d-grid gap-2">
            <button 
              className="btn btn-sm btn-secondary"
              onClick={buscarUsuarioInexistente}
              disabled={loading}
            >
              404 - Usuario inexistente
            </button>
            <button 
              className="btn btn-sm btn-secondary"
              onClick={generarErrorServidor}
              disabled={loading}
            >
              500 - Error del servidor
            </button>
            <button 
              className="btn btn-sm btn-secondary"
              onClick={generarErrorRuta}
              disabled={loading}
            >
              404 - Ruta inexistente
            </button>
          </div>
        </div>

        <h6>Usuarios:</h6>
        <ul className="list-group">
          {usuarios.map((usuario) => (
            <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{usuario.nombre}</strong>
                <br />
                <small>{usuario.email}</small>
              </div>
              <button 
                className="btn btn-sm btn-danger"
                onClick={() => eliminarUsuario(usuario.id)}
                disabled={loading}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
