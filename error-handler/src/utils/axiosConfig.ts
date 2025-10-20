import axios, { AxiosError } from 'axios'
import { ApiError } from '../types'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>
    
    if (axiosError.response) {
      return {
        error: axiosError.response.data.error || 'Error en la peticion',
        message: axiosError.response.data.message || 'Error desconocido',
        code: axiosError.response.data.code || 'UNKNOWN_ERROR',
        status: axiosError.response.status,
        timestamp: new Date().toISOString()
      }
    }
    
    if (axiosError.request) {
      return {
        error: 'Error de conexion',
        message: 'No se pudo conectar con el servidor',
        code: 'CONNECTION_ERROR',
        timestamp: new Date().toISOString()
      }
    }
  }
  
  return {
    error: 'Error inesperado',
    message: error instanceof Error ? error.message : 'Ocurrio un error desconocido',
    code: 'UNEXPECTED_ERROR',
    timestamp: new Date().toISOString()
  }
}
