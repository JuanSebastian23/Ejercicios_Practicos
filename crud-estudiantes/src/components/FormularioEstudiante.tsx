import { useState, useEffect } from 'react'
import { Estudiante } from '../types/Estudiante'

interface Props {
  onSubmit: (estudiante: Omit<Estudiante, 'id'> | Estudiante) => void;
  estudianteEditar: Estudiante | null;
  onCancelar: () => void;
}

function FormularioEstudiante({ onSubmit, estudianteEditar, onCancelar }: Props) {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState('')
  const [carrera, setCarrera] = useState('')

  useEffect(() => {
    if (estudianteEditar) {
      setNombre(estudianteEditar.nombre)
      setEdad(estudianteEditar.edad.toString())
      setCarrera(estudianteEditar.carrera)
    }
  }, [estudianteEditar])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nombre || !edad || !carrera) return

    if (estudianteEditar) {
      onSubmit({
        id: estudianteEditar.id,
        nombre,
        edad: parseInt(edad),
        carrera
      })
    } else {
      onSubmit({
        nombre,
        edad: parseInt(edad),
        carrera
      })
    }

    setNombre('')
    setEdad('')
    setCarrera('')
  }

  const handleCancelar = () => {
    setNombre('')
    setEdad('')
    setCarrera('')
    onCancelar()
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">{estudianteEditar ? 'Editar' : 'Agregar'} Estudiante</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input
              type="number"
              className="form-control"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Carrera</label>
            <input
              type="text"
              className="form-control"
              value={carrera}
              onChange={(e) => setCarrera(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              {estudianteEditar ? 'Actualizar' : 'Agregar'}
            </button>
            {estudianteEditar && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioEstudiante
