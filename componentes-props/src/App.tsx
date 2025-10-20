import Card from './components/Card'
import './App.css'

function App() {
  const cardsData = [
    {
      title: 'Conferencia de Tecnología',
      description: 'Evento anual sobre las últimas tendencias en desarrollo de software y tecnologías emergentes.',
      date: '2025-11-15',
      category: 'Tecnología'
    },
    {
      title: 'Workshop de React',
      description: 'Taller práctico sobre React y TypeScript. Aprende a crear aplicaciones modernas.',
      date: '2025-11-20',
      category: 'Educación'
    },
    {
      title: 'Hackathon 2025',
      description: 'Competencia de programación de 48 horas. Forma equipos y crea proyectos innovadores.',
      date: '2025-12-01',
      category: 'Competencia'
    },
    {
      title: 'Meetup de Developers',
      description: 'Encuentro mensual de desarrolladores para compartir experiencias y networking.',
      date: '2025-11-25',
      category: 'Networking'
    },
    {
      title: 'Curso de TypeScript',
      description: 'Curso intensivo de TypeScript desde básico hasta avanzado con ejercicios prácticos.',
      date: '2025-12-05',
      category: 'Educación'
    },
    {
      title: 'Seminario de UI/UX',
      description: 'Aprende principios de diseño de interfaces y experiencia de usuario.',
      date: '2025-12-10',
      category: 'Diseño'
    }
  ]

  return (
    <div className="app-container">
      <div className="main-header">
        <h1>Eventos y Actividades</h1>
        <p>Componentes con Props Tipadas en TypeScript</p>
      </div>
      <div className="cards-grid">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            description={card.description}
            date={card.date}
            category={card.category}
          />
        ))}
      </div>
    </div>
  )
}

export default App
