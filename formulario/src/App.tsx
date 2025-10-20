import { useState } from 'react'
import './App.css'

interface FormData {
  usuario: string
  contrasena: string
}

interface FormErrors {
  usuario: string
  contrasena: string
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    usuario: '',
    contrasena: ''
  })

  const [errors, setErrors] = useState<FormErrors>({
    usuario: '',
    contrasena: ''
  })

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      usuario: '',
      contrasena: ''
    }

    if (!formData.usuario.trim()) {
      newErrors.usuario = 'El usuario es requerido'
    } else if (formData.usuario.length < 3) {
      newErrors.usuario = 'El usuario debe tener al menos 3 caracteres'
    }

    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es requerida'
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return !newErrors.usuario && !newErrors.contrasena
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: ''
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitted(true)
    }
  }

  const handleReset = () => {
    setFormData({
      usuario: '',
      contrasena: ''
    })
    setErrors({
      usuario: '',
      contrasena: ''
    })
    setIsSubmitted(false)
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card login-card">
            <div className="login-header">
              <h2 className="mb-0 fw-bold">Iniciar Sesión</h2>
            </div>
            <div className="card-body login-body">
              {isSubmitted ? (
                <div className="text-center">
                  <div className="success-message">
                    <h3 className="mb-3">¡Bienvenido!</h3>
                    <p className="mb-2">Usuario: <strong>{formData.usuario}</strong></p>
                    <button 
                      className="btn btn-lg btn-login btn-reset mt-3"
                      onClick={handleReset}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="usuario" className="form-label fw-semibold">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className={`form-control form-control-lg input-login ${errors.usuario ? 'is-invalid' : ''}`}
                      id="usuario"
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleChange}
                      placeholder="Ingrese su usuario"
                    />
                    {errors.usuario && (
                      <div className="invalid-feedback">{errors.usuario}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="contrasena" className="form-label fw-semibold">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control form-control-lg input-login ${errors.contrasena ? 'is-invalid' : ''}`}
                      id="contrasena"
                      name="contrasena"
                      value={formData.contrasena}
                      onChange={handleChange}
                      placeholder="Ingrese su contraseña"
                    />
                    {errors.contrasena && (
                      <div className="invalid-feedback">{errors.contrasena}</div>
                    )}
                  </div>

                  <div className="d-grid">
                    <button 
                      type="submit" 
                      className="btn btn-lg btn-login btn-submit"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
