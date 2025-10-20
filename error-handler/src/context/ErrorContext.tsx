import { createContext, useContext, useState, ReactNode } from 'react'
import { ApiError } from '../types'

interface ErrorContextType {
  errors: ApiError[];
  addError: (error: ApiError) => void;
  clearErrors: () => void;
  currentError: ApiError | null;
  dismissCurrentError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined)

export const useError = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error('useError debe usarse dentro de ErrorProvider')
  }
  return context
}

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<ApiError[]>([])
  const [currentError, setCurrentError] = useState<ApiError | null>(null)

  const addError = (error: ApiError) => {
    setErrors(prev => [error, ...prev])
    setCurrentError(error)
    
    setTimeout(() => {
      setCurrentError(null)
    }, 5000)
  }

  const clearErrors = () => {
    setErrors([])
    setCurrentError(null)
  }

  const dismissCurrentError = () => {
    setCurrentError(null)
  }

  return (
    <ErrorContext.Provider value={{ 
      errors, 
      addError, 
      clearErrors, 
      currentError, 
      dismissCurrentError 
    }}>
      {children}
    </ErrorContext.Provider>
  )
}
