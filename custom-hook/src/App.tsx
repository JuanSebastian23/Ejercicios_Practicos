import { useState } from 'react'
import { useCountdown } from './useCountdown'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('60')
  const { seconds, isRunning, start, pause, reset, setTime } = useCountdown(60)

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSetTime = () => {
    const newTime = parseInt(inputValue)
    if (!isNaN(newTime) && newTime > 0) {
      setTime(newTime)
    }
  }

  return (
    <div className="app-container">
      <div className="timer-card">
        <h1 className="text-center mb-4">Temporizador Regresivo</h1>
        
        <div className="timer-display">
          {formatTime(seconds)}
        </div>

        <div className="input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Ingresa segundos"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isRunning}
          />
          <button
            className="btn btn-primary"
            onClick={handleSetTime}
            disabled={isRunning}
          >
            Establecer
          </button>
        </div>

        <div className="btn-group">
          <button
            className="btn btn-success"
            onClick={start}
            disabled={isRunning || seconds === 0}
          >
            Iniciar
          </button>
          <button
            className="btn btn-warning"
            onClick={pause}
            disabled={!isRunning}
          >
            Pausar
          </button>
          <button
            className="btn btn-danger"
            onClick={reset}
          >
            Reiniciar
          </button>
        </div>

        {seconds === 0 && (
          <div className="alert alert-info mt-3 text-center">
            ¡Tiempo terminado!
          </div>
        )}
      </div>
    </div>
  )
}

export default App
