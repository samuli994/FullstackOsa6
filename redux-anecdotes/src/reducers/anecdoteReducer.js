import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    vote(state, action) {
      const { id } = action.payload
      const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes++
      }
    },
  },
})

export const { appendAnecdote, setAnecdotes, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    try {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    } catch (error) {
      console.error('Failed to initialize anecdotes:', error)
    }
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    try {
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(appendAnecdote(newAnecdote))
      dispatch(setNotification(`New anecdote "${newAnecdote.content}" created!`))
    } catch (error) {
      console.error('Failed to create anecdote:', error)
    }
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState()
      const anecdoteToVote = state.anecdotes.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      await anecdoteService.vote(id, updatedAnecdote)
      dispatch(vote({ id }))
      dispatch(setNotification(`You voted '${anecdoteToVote.content}'`))
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }
}

export default anecdoteSlice.reducer