import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = 4001;
const SECRET_KEY = 'mi_clave_secreta_jwt_2024';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API de Autenticación JWT',
    endpoints: {
      login: 'POST /api/auth/login',
      register: 'POST /api/auth/register',
      profile: 'GET /api/auth/profile (requiere token)',
      protected: 'GET /api/protected (requiere token)'
    }
  });
});

const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uJ8/8CQBhJxKZqYhUkKKxKdKyBKKLrPO',
    email: 'admin@example.com',
    nombre: 'Administrador'
  },
  {
    id: 2,
    username: 'usuario',
    password: '$2a$10$CwTycUXWue0Thq9StjUM0uJ8/8CQBhJxKZqYhUkKKxKdKyBKKLrPO',
    email: 'usuario@example.com',
    nombre: 'Usuario Demo'
  }
];

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const bearerToken = token.split(' ')[1];

  jwt.verify(bearerToken, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido o expirado' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, email, nombre } = req.body;

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      email,
      nombre
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        nombre: newUser.nombre
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nombre: user.nombre
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.get('/api/auth/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    nombre: user.nombre
  });
});

app.get('/api/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Acceso autorizado a ruta protegida',
    userId: req.userId,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log('Usuarios de prueba:');
  console.log('- username: admin, password: 123456');
  console.log('- username: usuario, password: 123456');
});
