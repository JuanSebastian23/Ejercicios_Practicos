import { CardProps } from '../types'

const Card = ({ title, description, date, category }: CardProps) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="custom-card">
      <div className="card-header-custom">
        <h2 className="card-title-custom">{title}</h2>
      </div>
      <div className="card-body-custom">
        <p className="card-description">{description}</p>
      </div>
      <div className="card-footer-custom">
        <div className="card-date">
          <span className="icon-calendar"></span>
          {formatDate(date)}
        </div>
        {category && <span className="card-badge">{category}</span>}
      </div>
    </div>
  )
}

export default Card
