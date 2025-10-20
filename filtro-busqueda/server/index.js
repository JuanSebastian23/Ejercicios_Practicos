import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', genero: 'Novela', año: 1967 },
  { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', genero: 'Novela', año: 1605 },
  { id: 3, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry', genero: 'Fábula', año: 1943 },
  { id: 4, titulo: '1984', autor: 'George Orwell', genero: 'Distopía', año: 1949 },
  { id: 5, titulo: 'Crónica de una muerte anunciada', autor: 'Gabriel García Márquez', genero: 'Novela', año: 1981 },
  { id: 6, titulo: 'La metamorfosis', autor: 'Franz Kafka', genero: 'Ficción', año: 1915 },
  { id: 7, titulo: 'El amor en los tiempos del cólera', autor: 'Gabriel García Márquez', genero: 'Novela', año: 1985 },
  { id: 8, titulo: 'Pedro Páramo', autor: 'Juan Rulfo', genero: 'Novela', año: 1955 },
  { id: 9, titulo: 'Rayuela', autor: 'Julio Cortázar', genero: 'Novela', año: 1963 },
  { id: 10, titulo: 'La casa de los espíritus', autor: 'Isabel Allende', genero: 'Novela', año: 1982 },
  { id: 11, titulo: 'Los detectives salvajes', autor: 'Roberto Bolaño', genero: 'Novela', año: 1998 },
  { id: 12, titulo: 'El túnel', autor: 'Ernesto Sabato', genero: 'Novela', año: 1948 },
  { id: 13, titulo: 'Ficciones', autor: 'Jorge Luis Borges', genero: 'Cuentos', año: 1944 },
  { id: 14, titulo: 'La ciudad y los perros', autor: 'Mario Vargas Llosa', genero: 'Novela', año: 1963 },
  { id: 15, titulo: 'El llano en llamas', autor: 'Juan Rulfo', genero: 'Cuentos', año: 1953 }
];

app.get('/api/libros', (req, res) => {
  setTimeout(() => {
    res.json(libros);
  }, 500);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
