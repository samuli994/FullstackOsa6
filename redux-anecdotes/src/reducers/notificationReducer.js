import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: 'Welcome!',
  show: true
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload
      state.show = true
    },
    clearNotification(state) {
      state.message = ''
      state.show = false
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer