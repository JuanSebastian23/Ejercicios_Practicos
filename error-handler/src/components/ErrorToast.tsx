import { useError } from '../context/ErrorContext'

export const ErrorToast = () => {
  const { currentError, dismissCurrentError } = useError()

  if (!currentError) return null

  return (
    <div className="error-toast">
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>{currentError.error}</strong>
        <p className="mb-1">{currentError.message}</p>
        <small>Codigo: {currentError.code}</small>
        {currentError.status && (
          <small className="d-block">Status: {currentError.status}</small>
        )}
        <button 
          type="button" 
          className="btn-close" 
          onClick={dismissCurrentError}
        ></button>
      </div>
    </div>
  )
}
