import type { ReactElement } from 'react'

interface GenericListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => ReactElement
  title: string
}

function GenericList<T>({ data, renderItem, title }: GenericListProps<T>) {
  return (
    <div className="mb-4">
      <h3 className="mb-3">{title}</h3>
      {data.length === 0 ? (
        <div className="alert alert-secondary">No hay datos para mostrar</div>
      ) : (
        <div className="list-group">
          {data.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </div>
  )
}

export default GenericList
