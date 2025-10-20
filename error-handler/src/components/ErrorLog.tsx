import { useError } from '../context/ErrorContext'

export const ErrorLog = () => {
  const { errors, clearErrors } = useError()

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Registro de Errores</h5>
        <button 
          className="btn btn-sm btn-secondary"
          onClick={clearErrors}
          disabled={errors.length === 0}
        >
          Limpiar
        </button>
      </div>
      <div className="card-body error-log">
        {errors.length === 0 ? (
          <p className="text-center">No hay errores registrados</p>
        ) : (
          errors.map((error, index) => (
            <div key={index} className="error-item">
              <strong>{error.error}</strong>
              <p className="mb-1">{error.message}</p>
              <div className="d-flex justify-content-between">
                <small>Codigo: {error.code}</small>
                {error.status && <small>Status: {error.status}</small>}
              </div>
              <small className="text-muted">
                {new Date(error.timestamp).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
