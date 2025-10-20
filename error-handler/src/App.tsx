import { ErrorProvider } from './context/ErrorContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorToast } from './components/ErrorToast'
import { ErrorLog } from './components/ErrorLog'
import { UsuariosPanel } from './components/UsuariosPanel'

function App() {
  return (
    <ErrorProvider>
      <ErrorBoundary>
        <div className="container mt-5">
          <h1 className="text-center mb-4">Manejador de Errores Global</h1>
          <div className="row">
            <div className="col-md-6">
              <UsuariosPanel />
            </div>
            <div className="col-md-6">
              <ErrorLog />
            </div>
          </div>
        </div>
        <ErrorToast />
      </ErrorBoundary>
    </ErrorProvider>
  )
}

export default App
