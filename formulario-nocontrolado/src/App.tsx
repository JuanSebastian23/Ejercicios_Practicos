import { useRef, useState } from 'react'
import './App.css'
import type { SubmittedData } from './types'

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  min?: string;
  max?: string;
}

interface TextAreaFieldProps {
  label: string;
  id: string;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  rows: number;
}

interface DataCardProps {
  data: SubmittedData;
  onDelete: (id: number) => void;
}

function FormField({ label, id, type, inputRef, min, max }: FormFieldProps) {
  return (
    <div className="col-md-6 mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        ref={inputRef}
        min={min}
        max={max}
        required
      />
    </div>
  )
}

function TextAreaField({ label, id, inputRef, rows }: TextAreaFieldProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <textarea
        className="form-control"
        id={id}
        ref={inputRef}
        rows={rows}
        required
      />
    </div>
  )
}

function DataCard({ data, onDelete }: DataCardProps) {
  return (
    <div className="col-md-6 mb-3">
      <div className="data-card">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5>Registro</h5>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(data.id)}
          >
            Eliminar
          </button>
        </div>
        <div className="data-item">
          <span className="data-label">Nombre:</span>
          <span className="data-value">{data.nombre}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Email:</span>
          <span className="data-value">{data.email}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Teléfono:</span>
          <span className="data-value">{data.telefono}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Edad:</span>
          <span className="data-value">{data.edad} años</span>
        </div>
        <div className="data-item">
          <span className="data-label">Mensaje:</span>
          <span className="data-value">{data.mensaje}</span>
        </div>
        <div className="data-item">
          <span className="data-label">Fecha:</span>
          <span className="data-value">{data.fecha}</span>
        </div>
      </div>
    </div>
  )
}

function App() {
  const nombreRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const telefonoRef = useRef<HTMLInputElement>(null)
  const edadRef = useRef<HTMLInputElement>(null)
  const mensajeRef = useRef<HTMLTextAreaElement>(null)

  const [submittedData, setSubmittedData] = useState<SubmittedData[]>([])

  const getFormValues = () => ({
    id: Date.now(),
    nombre: nombreRef.current?.value || '',
    email: emailRef.current?.value || '',
    telefono: telefonoRef.current?.value || '',
    edad: edadRef.current?.value || '',
    mensaje: mensajeRef.current?.value || '',
    fecha: new Date().toLocaleString('es-ES')
  })

  const clearInputs = () => {
    const refs = [nombreRef, emailRef, telefonoRef, edadRef, mensajeRef]
    refs.forEach(ref => {
      if (ref.current) ref.current.value = ''
    })
    nombreRef.current?.focus()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmittedData([...submittedData, getFormValues()])
    clearInputs()
  }

  const resetForm = () => {
    clearInputs()
  }

  const handleDelete = (id: number) => {
    setSubmittedData(submittedData.filter(data => data.id !== id))
  }

  return (
    <div className="app-container">
      <h1>Formulario No Controlado con useRef</h1>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <FormField
              label="Nombre Completo"
              id="nombre"
              type="text"
              inputRef={nombreRef}
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              inputRef={emailRef}
            />
          </div>

          <div className="row">
            <FormField
              label="Teléfono"
              id="telefono"
              type="tel"
              inputRef={telefonoRef}
            />
            <FormField
              label="Edad"
              id="edad"
              type="number"
              inputRef={edadRef}
              min="1"
              max="120"
            />
          </div>

          <TextAreaField
            label="Mensaje"
            id="mensaje"
            inputRef={mensajeRef}
            rows={4}
          />

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Limpiar
            </button>
          </div>
        </form>
      </div>

      <div className="data-section">
        <h2 className="mb-4">Datos Enviados ({submittedData.length})</h2>

        {submittedData.length === 0 ? (
          <div className="empty-state">
            <p>No hay datos enviados aún</p>
          </div>
        ) : (
          <div className="row">
            {submittedData.map(data => (
              <DataCard key={data.id} data={data} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
