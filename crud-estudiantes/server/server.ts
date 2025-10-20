import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
}

let estudiantes: Estudiante[] = [
  { id: 1, nombre: 'Juan Perez', edad: 20, carrera: 'Ingenieria' },
  { id: 2, nombre: 'Maria Lopez', edad: 22, carrera: 'Medicina' },
  { id: 3, nombre: 'Carlos Ruiz', edad: 21, carrera: 'Derecho' }
];

let nextId = 4;

app.get('/api/estudiantes', (req, res) => {
  res.json(estudiantes);
});

app.get('/api/estudiantes/:id', (req, res) => {
  const estudiante = estudiantes.find(e => e.id === parseInt(req.params.id));
  if (estudiante) {
    res.json(estudiante);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
});

app.post('/api/estudiantes', (req, res) => {
  const nuevoEstudiante: Estudiante = {
    id: nextId++,
    nombre: req.body.nombre,
    edad: req.body.edad,
    carrera: req.body.carrera
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

app.put('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = estudiantes.findIndex(e => e.id === id);
  if (index !== -1) {
    estudiantes[index] = {
      id,
      nombre: req.body.nombre,
      edad: req.body.edad,
      carrera: req.body.carrera
    };
    res.json(estudiantes[index]);
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
});

app.delete('/api/estudiantes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = estudiantes.findIndex(e => e.id === id);
  if (index !== -1) {
    estudiantes.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutando en http://localhost:${PORT}`);
});
