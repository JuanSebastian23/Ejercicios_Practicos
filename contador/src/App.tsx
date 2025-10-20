import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card contador-card">
            <div className="contador-header">
              <h2 className="mb-0 fw-bold">Contador</h2>
            </div>
            <div className="card-body contador-body">
              <div className="contador-numero">
                {count}
              </div>
              <div className="d-grid gap-3">
                <button 
                  className="btn btn-lg btn-contador btn-incrementar" 
                  onClick={() => setCount(count + 1)}
                >
                  + Incrementar
                </button>
                <button 
                  className="btn btn-lg btn-contador btn-decrementar" 
                  onClick={() => setCount(count - 1)}
                >
                  - Decrementar
                </button>
                <button 
                  className="btn btn-lg btn-contador btn-resetear" 
                  onClick={() => setCount(0)}
                >
                  Resetear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
