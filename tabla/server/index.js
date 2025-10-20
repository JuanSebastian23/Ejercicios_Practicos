import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const users = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+34 612 345 678',
    company: 'Tech Solutions',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria.garcia@example.com',
    phone: '+34 623 456 789',
    company: 'Digital Corp',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos.lopez@example.com',
    phone: '+34 634 567 890',
    company: 'Innovation Labs',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?img=3'
  },
  {
    id: 4,
    name: 'Ana Martínez',
    email: 'ana.martinez@example.com',
    phone: '+34 645 678 901',
    company: 'Creative Studio',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    id: 5,
    name: 'Pedro Sánchez',
    email: 'pedro.sanchez@example.com',
    phone: '+34 656 789 012',
    company: 'Global Systems',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=7'
  },
  {
    id: 6,
    name: 'Laura Fernández',
    email: 'laura.fernandez@example.com',
    phone: '+34 667 890 123',
    company: 'Smart Consulting',
    status: 'inactive',
    avatar: 'https://i.pravatar.cc/150?img=10'
  },
  {
    id: 7,
    name: 'David Rodríguez',
    email: 'david.rodriguez@example.com',
    phone: '+34 678 901 234',
    company: 'Future Tech',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: 8,
    name: 'Carmen Gómez',
    email: 'carmen.gomez@example.com',
    phone: '+34 689 012 345',
    company: 'Web Experts',
    status: 'active',
    avatar: 'https://i.pravatar.cc/150?img=20'
  }
]

app.get('/', (req, res) => {
  res.json({
    message: 'API de Usuarios',
    endpoints: {
      users: '/api/users'
    }
  })
})

app.get('/api/users', (req, res) => {
  setTimeout(() => {
    res.json(users)
  }, 500)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
