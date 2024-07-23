import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

  const handleAddAnecdote = (event) => {
    event.preventDefault()
    if (newAnecdote.trim() !== '') {
      dispatch(createAnecdote(newAnecdote.trim()))
      dispatch(setNotification(`New anecdote "${newAnecdote.trim()}" created!`))
      setNewAnecdote('')
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input
            type="text"
            value={newAnecdote}
            onChange={(event) => setNewAnecdote(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
