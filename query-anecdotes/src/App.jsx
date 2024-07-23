import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { NotificationProvider, useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const showNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData('anecdotes', (oldAnecdotes) => [...oldAnecdotes, newAnecdote])
      showNotification('New anecdote added successfully')
    },
    onError: (error) => {
      console.error('An error occurred while adding the anecdote:', error)
    },
  })

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      showNotification('Anecdote voted successfully')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    showNotification('Vote added successfully')
  }

  const { isLoading, isError, data: anecdotes } = useQuery(['anecdotes'], getAnecdotes, {
    retry: 1,
  })

  const handleAddAnecdote = async (content) => {
    try {
      await newAnecdoteMutation.mutateAsync({ content, votes: 0 })
    } catch (error) {
      console.error('An error occurred while adding the anecdote:', error)
    }
  }

  if (isLoading) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service is not available due to problems on the server.</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm addAnecdote={handleAddAnecdote} />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const AppWithNotificationProvider = () => (
  <NotificationProvider>
    <App />
  </NotificationProvider>
)

export default AppWithNotificationProvider
