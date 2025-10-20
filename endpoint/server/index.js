import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

const products = [
  {
    id: 1,
    name: 'Laptop Pro 15',
    description: 'Laptop de alto rendimiento con procesador Intel i7 y 16GB RAM',
    price: 1299.99,
    category: 'Electrónica',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
  },
  {
    id: 2,
    name: 'Mouse Inalámbrico',
    description: 'Mouse ergonómico con sensor de alta precisión',
    price: 29.99,
    category: 'Accesorios',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  },
  {
    id: 3,
    name: 'Teclado Mecánico',
    description: 'Teclado mecánico RGB con switches azules',
    price: 89.99,
    category: 'Accesorios',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
  {
    id: 4,
    name: 'Monitor 27 4K',
    description: 'Monitor profesional 4K UHD con panel IPS',
    price: 449.99,
    category: 'Electrónica',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
  },
  {
    id: 5,
    name: 'Auriculares Bluetooth',
    description: 'Auriculares con cancelación de ruido activa',
    price: 199.99,
    category: 'Audio',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    id: 6,
    name: 'Webcam HD',
    description: 'Cámara web Full HD 1080p con micrófono integrado',
    price: 79.99,
    category: 'Accesorios',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500'
  },
  {
    id: 7,
    name: 'SSD 1TB',
    description: 'Disco sólido NVMe de alta velocidad',
    price: 129.99,
    category: 'Almacenamiento',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500'
  },
  {
    id: 8,
    name: 'Router WiFi 6',
    description: 'Router de última generación con WiFi 6',
    price: 159.99,
    category: 'Redes',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=500'
  },
  {
    id: 9,
    name: 'Tablet 10 pulgadas',
    description: 'Tablet Android con pantalla Full HD',
    price: 299.99,
    category: 'Electrónica',
    stock: 18,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
  }
]

app.get('/', (req, res) => {
  res.json({
    message: 'API de Productos',
    endpoints: {
      products: '/api/products'
    }
  })
})

app.get('/api/products', (req, res) => {
  setTimeout(() => {
    res.json(products)
  }, 800)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
