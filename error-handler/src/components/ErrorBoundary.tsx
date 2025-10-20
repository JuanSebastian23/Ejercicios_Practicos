import { Component, ReactNode } from 'react'
import { ApiError } from '../types'

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: ApiError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: {
        error: 'Error de React',
        message: error.message,
        code: 'REACT_ERROR',
        timestamp: new Date().toISOString()
      }
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">{this.state.error.error}</h4>
            <p>{this.state.error.message}</p>
            <hr />
            <p className="mb-0">Codigo: {this.state.error.code}</p>
            <button 
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
            >
              Recargar pagina
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
