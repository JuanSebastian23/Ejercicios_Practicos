import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoContextType {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
  deleteTodo: (id: number) => void
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const useTodoContext = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider')
  }
  return context
}

interface TodoProviderProps {
  children: ReactNode
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}
