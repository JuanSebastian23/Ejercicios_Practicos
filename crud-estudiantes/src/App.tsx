import { useState, useEffect } from 'react'
import FormularioEstudiante from './components/FormularioEstudiante'
import TablaEstudiantes from './components/TablaEstudiantes.tsx'
import { Estudiante } from './types/Estudiante'

function App() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [estudianteEditar, setEstudianteEditar] = useState<Estudiante | null>(null)

  useEffect(() => {
    obtenerEstudiantes()
  }, [])

  const obtenerEstudiantes = async () => {
    const response = await fetch('http://localhost:3000/api/estudiantes')
    const data = await response.json()
    setEstudiantes(data)
  }

  const agregarEstudiante = async (estudiante: Omit<Estudiante, 'id'>) => {
    const response = await fetch('http://localhost:3000/api/estudiantes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante)
    })
    const nuevoEstudiante = await response.json()
    setEstudiantes([...estudiantes, nuevoEstudiante])
  }

  const actualizarEstudiante = async (estudiante: Estudiante) => {
    await fetch(`http://localhost:3000/api/estudiantes/${estudiante.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante)
    })
    setEstudiantes(estudiantes.map(e => e.id === estudiante.id ? estudiante : e))
    setEstudianteEditar(null)
  }

  const eliminarEstudiante = async (id: number) => {
    await fetch(`http://localhost:3000/api/estudiantes/${id}`, {
      method: 'DELETE'
    })
    setEstudiantes(estudiantes.filter(e => e.id !== id))
  }

  const handleSubmit = (estudiante: Omit<Estudiante, 'id'> | Estudiante) => {
    if ('id' in estudiante) {
      actualizarEstudiante(estudiante)
    } else {
      agregarEstudiante(estudiante)
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">CRUD Estudiantes</h1>
      <div className="row">
        <div className="col-md-4">
          <FormularioEstudiante 
            onSubmit={handleSubmit}
            estudianteEditar={estudianteEditar}
            onCancelar={() => setEstudianteEditar(null)}
          />
        </div>
        <div className="col-md-8">
          <TablaEstudiantes 
            estudiantes={estudiantes}
            onEditar={setEstudianteEditar}
            onEliminar={eliminarEstudiante}
          />
        </div>
      </div>
    </div>
  )
}

export default App
