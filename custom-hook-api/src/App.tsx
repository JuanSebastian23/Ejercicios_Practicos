import { useState } from 'react'
import './App.css'
import { useApi } from './useApi'
import type { Post, User } from './types'

interface PostCardProps {
  post: Post;
}

interface UserRowProps {
  user: User;
}

function PostCard({ post }: PostCardProps) {
  return (
    <div className="post-card">
      <div className="mb-2">
        <span className="badge">Post #{post.id}</span>
      </div>
      <h5>{post.title}</h5>
      <p>{post.body}</p>
    </div>
  )
}

function UserRow({ user }: UserRowProps) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.website}</td>
    </tr>
  )
}

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3">Cargando datos de la API...</p>
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-container">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{message}</p>
      </div>
    </div>
  )
}

function App() {
  const [apiType, setApiType] = useState<'posts' | 'users'>('posts')
  
  const postsUrl = 'https://jsonplaceholder.typicode.com/posts'
  const usersUrl = 'https://jsonplaceholder.typicode.com/users'
  
  const { data: posts, loading: postsLoading, error: postsError, refetch: refetchPosts } = useApi<Post[]>(
    apiType === 'posts' ? postsUrl : ''
  )
  
  const { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useApi<User[]>(
    apiType === 'users' ? usersUrl : ''
  )

  const currentLoading = apiType === 'posts' ? postsLoading : usersLoading
  const currentError = apiType === 'posts' ? postsError : usersError
  const currentRefetch = apiType === 'posts' ? refetchPosts : refetchUsers

  return (
    <div className="app-container">
      <h1>Custom Hook useApi</h1>

      <div className="api-info">
        <h3>Hook Personalizado para APIs</h3>
        <p><strong>Estados:</strong> loading, error, data</p>
        <p><strong>API:</strong> JSONPlaceholder</p>
        <p><strong>Función:</strong> refetch para recargar datos</p>
      </div>

      <div className="api-selector">
        <button
          className={`btn ${apiType === 'posts' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApiType('posts')}
        >
          Posts
        </button>
        <button
          className={`btn ${apiType === 'users' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApiType('users')}
        >
          Users
        </button>
      </div>

      {currentLoading && <LoadingSpinner />}

      {currentError && <ErrorMessage message={currentError} />}

      {!currentLoading && !currentError && apiType === 'posts' && posts && (
        <>
          <div className="posts-grid">
            {posts.slice(0, 12).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="refetch-button">
            <button className="btn btn-primary" onClick={currentRefetch}>
              Recargar Datos
            </button>
          </div>
        </>
      )}

      {!currentLoading && !currentError && apiType === 'users' && users && (
        <>
          <div className="users-table">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="refetch-button">
            <button className="btn btn-primary" onClick={currentRefetch}>
              Recargar Datos
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default App
