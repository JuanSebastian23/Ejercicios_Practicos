import { useState } from 'react'
import { Student, FormData } from './types'
import './App.css'

const EmptyList = () => (
  <div className="empty-list">
    <h3>No hay estudiantes registrados</h3>
    <p>Agrega tu primer estudiante usando el formulario</p>
  </div>
)

const StudentCard = ({ student, onDelete }: { student: Student; onDelete: (id: string) => void }) => (
  <div className="student-card">
    <div className="student-header">
      <h3 className="student-name">
        {student.name}
        <span className="badge-grade">{student.grade}</span>
      </h3>
      <button className="btn btn-delete" onClick={() => onDelete(student.id)}>
        Eliminar
      </button>
    </div>
    <div className="student-info">
      <div className="student-info-item">
        <span className="student-info-label">Edad:</span>
        <span className="student-info-value">{student.age} años</span>
      </div>
      <div className="student-info-item">
        <span className="student-info-label">Email:</span>
        <span className="student-info-value">{student.email}</span>
      </div>
      <div className="student-info-item">
        <span className="student-info-label">Carrera:</span>
        <span className="student-info-value">{student.career}</span>
      </div>
      <div className="student-info-item">
        <span className="student-info-label">Inscripción:</span>
        <span className="student-info-value">{new Date(student.enrollmentDate).toLocaleDateString('es-ES')}</span>
      </div>
    </div>
  </div>
)

function App() {
  const [students, setStudents] = useState<Student[]>([])
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    email: '',
    grade: '',
    career: ''
  })
  const [errors, setErrors] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors([])
  }

  const validateForm = (): boolean => {
    const newErrors: string[] = []

    if (!formData.name.trim()) {
      newErrors.push('El nombre es requerido')
    }

    if (!formData.age || parseInt(formData.age) < 15 || parseInt(formData.age) > 100) {
      newErrors.push('La edad debe estar entre 15 y 100 años')
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.push('El email debe ser válido')
    }

    if (!formData.grade) {
      newErrors.push('El grado es requerido')
    }

    if (!formData.career.trim()) {
      newErrors.push('La carrera es requerida')
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newStudent: Student = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      age: parseInt(formData.age),
      email: formData.email.trim(),
      grade: formData.grade,
      career: formData.career.trim(),
      enrollmentDate: new Date().toISOString()
    }

    setStudents(prev => [newStudent, ...prev])
    setFormData({
      name: '',
      age: '',
      email: '',
      grade: '',
      career: ''
    })
    setErrors([])
  }

  const handleDelete = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id))
  }

  return (
    <div className="app-container">
      <div className="main-card">
        <h1>Registro de Estudiantes</h1>

        <div className="content-grid">
          <div className="form-section">
            <h2>Agregar Estudiante</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Edad</label>
                <input
                  type="number"
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Ej: 20"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: estudiante@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Grado</label>
                <select
                  name="grade"
                  className="form-select"
                  value={formData.grade}
                  onChange={handleInputChange}
                >
                  <option value="">Seleccionar grado</option>
                  <option value="1er año">1er año</option>
                  <option value="2do año">2do año</option>
                  <option value="3er año">3er año</option>
                  <option value="4to año">4to año</option>
                  <option value="5to año">5to año</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Carrera</label>
                <input
                  type="text"
                  name="career"
                  className="form-control"
                  value={formData.career}
                  onChange={handleInputChange}
                  placeholder="Ej: Ingeniería de Sistemas"
                />
              </div>

              {errors.length > 0 && (
                <div className="error-message">
                  {errors.map((error, index) => (
                    <div key={index}>• {error}</div>
                  ))}
                </div>
              )}

              <button type="submit" className="btn btn-add">
                Agregar Estudiante
              </button>
            </form>
          </div>

          <div className="list-section">
            <h2>Lista de Estudiantes</h2>
            <div className="students-count">
              Total: {students.length} estudiante{students.length !== 1 ? 's' : ''}
            </div>
            <div className="students-list">
              {students.length === 0 ? (
                <EmptyList />
              ) : (
                students.map(student => (
                  <StudentCard key={student.id} student={student} onDelete={handleDelete} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
