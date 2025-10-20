import { Estudiante } from '../types/Estudiante'

interface Props {
  estudiantes: Estudiante[];
  onEditar: (estudiante: Estudiante) => void;
  onEliminar: (id: number) => void;
}

function TablaEstudiantes({ estudiantes, onEditar, onEliminar }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="mb-0">Lista de Estudiantes</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Carrera</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.id}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.edad}</td>
                <td>{estudiante.carrera}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => onEditar(estudiante)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => onEliminar(estudiante.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaEstudiantes
