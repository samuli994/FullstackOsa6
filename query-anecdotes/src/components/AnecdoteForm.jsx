import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote])
      showNotification('New anecdote added successfully')
    },
    onError: (error) => {
      console.error('An error occurred while adding the anecdote:', error)
    },
  })

  const showNotification = (message) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5000)
  }

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    if (content.length >= 5) {
      newAnecdoteMutation.mutate({ content, votes: 0 })
    } else {
      showNotification('Anecdote content must be at least 5 characters long.')
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
