import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const usuarios: Usuario[] = [
  { id: 1, nombre: 'Juan Perez', email: 'juan@mail.com' },
  { id: 2, nombre: 'Maria Lopez', email: 'maria@mail.com' }
];

app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  
  if (!usuario) {
    return res.status(404).json({ 
      error: 'Usuario no encontrado',
      message: `No existe un usuario con el ID ${id}`,
      code: 'USER_NOT_FOUND'
    });
  }
  
  res.json(usuario);
});

app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  
  if (!nombre || !email) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'Se requieren nombre y email',
      code: 'MISSING_FIELDS'
    });
  }
  
  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'Email invalido',
      message: 'El formato del email no es valido',
      code: 'INVALID_EMAIL'
    });
  }
  
  const emailExiste = usuarios.some(u => u.email === email);
  if (emailExiste) {
    return res.status(409).json({
      error: 'Email duplicado',
      message: 'Ya existe un usuario con ese email',
      code: 'DUPLICATE_EMAIL'
    });
  }
  
  const nuevoUsuario: Usuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };
  
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

app.delete('/api/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      error: 'Usuario no encontrado',
      message: `No se puede eliminar. Usuario con ID ${id} no existe`,
      code: 'USER_NOT_FOUND'
    });
  }
  
  usuarios.splice(index, 1);
  res.status(204).send();
});

app.get('/api/error', (req, res) => {
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salio mal en el servidor',
    code: 'INTERNAL_SERVER_ERROR'
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.path} no existe`,
    code: 'ROUTE_NOT_FOUND'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutando en http://localhost:${PORT}`);
});
