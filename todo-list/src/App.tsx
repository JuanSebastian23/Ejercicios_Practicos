import { useState } from 'react'
import { useTodoContext } from './context/TodoContext'
import type { Todo } from './context/TodoContext'
import './App.css'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoContext()
  const [inputValue, setInputValue] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addTodo(inputValue.trim())
      setInputValue('')
    }
  }

  const activeTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card todo-card">
            <div className="todo-header">
              <h2 className="mb-0 fw-bold">Lista de Tareas</h2>
            </div>
            
            <div className="card-body todo-body">
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control input-todo"
                    placeholder="Agregar nueva tarea..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button className="btn btn-add" type="submit">
                    Agregar
                  </button>
                </div>
              </form>

              <div className="todo-stats mb-4">
                <span className="badge bg-dark me-2">
                  Total: {todos.length}
                </span>
                <span className="badge bg-secondary me-2">
                  Activas: {activeTodos.length}
                </span>
                <span className="badge bg-success">
                  Completadas: {completedTodos.length}
                </span>
              </div>

              {todos.length === 0 ? (
                <div className="text-center py-5 empty-state">
                  <p className="mb-0">No hay tareas pendientes</p>
                </div>
              ) : (
                <div className="todo-list">
                  {todos.map((todo: Todo) => (
                    <div
                      key={todo.id}
                      className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          id={`todo-${todo.id}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`todo-${todo.id}`}
                        >
                          {todo.text}
                        </label>
                      </div>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
