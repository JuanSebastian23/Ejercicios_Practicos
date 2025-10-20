import { useState, useEffect } from 'react'
import './App.css'
import type { User, LoginData, RegisterData, ProtectedData } from './types'
import { authService } from './authService'

function App() {
  const [isLogin, setIsLogin] = useState(true)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)
  const [protectedData, setProtectedData] = useState<ProtectedData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      loadUserProfile()
    }
  }, [token])

  const loadUserProfile = async () => {
    if (!token) return
    
    try {
      const userData = await authService.getProfile(token)
      setUser(userData)
    } catch (err) {
      handleLogout()
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const loginData: LoginData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string
    }

    try {
      const response = await authService.login(loginData)
      setToken(response.token)
      setUser(response.user)
      localStorage.setItem('token', response.token)
      e.currentTarget.reset()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const registerData: RegisterData = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      email: formData.get('email') as string,
      nombre: formData.get('nombre') as string
    }

    try {
      const response = await authService.register(registerData)
      setToken(response.token)
      setUser(response.user)
      localStorage.setItem('token', response.token)
      e.currentTarget.reset()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar usuario')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    setProtectedData(null)
    localStorage.removeItem('token')
  }

  const loadProtectedData = async () => {
    if (!token) return

    setLoading(true)
    try {
      const data = await authService.getProtectedData(token)
      setProtectedData(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar datos protegidos')
    } finally {
      setLoading(false)
    }
  }

  if (user && token) {
    return (
      <div className="app-container">
        <nav className="navbar navbar-dark">
          <div className="container-fluid">
            <span className="navbar-brand">Sistema de Autenticación JWT</span>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </nav>

        <div className="dashboard-container">
          <div className="user-card">
            <h3>Perfil de Usuario</h3>
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{user.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Usuario:</span>
              <span className="info-value">{user.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Nombre:</span>
              <span className="info-value">{user.nombre}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
          </div>

          <div className="text-center mb-4">
            <button 
              className="btn btn-primary" 
              onClick={loadProtectedData}
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Cargar Datos Protegidos'}
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {protectedData && (
            <div className="protected-data">
              <h4>Datos de Ruta Protegida</h4>
              <p><strong>Mensaje:</strong> {protectedData.message}</p>
              <p><strong>User ID:</strong> {protectedData.userId}</p>
              <p><strong>Timestamp:</strong> {new Date(protectedData.timestamp).toLocaleString('es-ES')}</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <span className="navbar-brand">Sistema de Autenticación JWT</span>
        </div>
      </nav>

      <div className="auth-container">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>

            <div className="auth-toggle">
              <p>¿No tienes cuenta? 
                <button type="button" onClick={() => setIsLogin(false)}>
                  Regístrate aquí
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                minLength={6}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>

            <div className="auth-toggle">
              <p>¿Ya tienes cuenta? 
                <button type="button" onClick={() => setIsLogin(true)}>
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </form>
        )}

        <div className="mt-4 p-3" style={{backgroundColor: '#f5f5f5', border: '1px solid #000', borderRadius: '4px'}}>
          <small>
            <strong>Usuarios de prueba:</strong><br />
            • usuario: admin / contraseña: 123456<br />
            • usuario: usuario / contraseña: 123456
          </small>
        </div>
      </div>
    </div>
  )
}

export default App
