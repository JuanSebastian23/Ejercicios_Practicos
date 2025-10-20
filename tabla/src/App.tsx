import { useState, useEffect } from 'react'
import { User } from './types'
import './App.css'

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    <p className="loading-text">Cargando usuarios...</p>
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
    <h3>No hay usuarios</h3>
    <p>No se encontraron usuarios en la base de datos</p>
  </div>
)

const UserRow = ({ user }: { user: User }) => (
  <tr>
    <td>
      <img src={user.avatar} alt={user.name} className="user-avatar" />
    </td>
    <td className="user-name">{user.name}</td>
    <td className="user-email">{user.email}</td>
    <td>{user.phone}</td>
    <td>{user.company}</td>
    <td>
      <span className={user.status === 'active' ? 'badge-active' : 'badge-inactive'}>
        {user.status === 'active' ? 'Activo' : 'Inactivo'}
      </span>
    </td>
  </tr>
)

const UsersTable = ({ users }: { users: User[] }) => (
  <div className="table-container">
    <table className="table custom-table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Empresa</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  </div>
)

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:3000/api/users')
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios')
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const renderContent = () => {
    if (loading) return <LoadingSpinner />
    if (error) return <ErrorMessage error={error} onRetry={fetchUsers} />
    if (users.length === 0) return <EmptyState />
    return <UsersTable users={users} />
  }

  return (
    <div className="app-container">
      <div className="main-card">
        <h1>Tabla de Usuarios</h1>
        {renderContent()}
      </div>
    </div>
  )
}

export default App
