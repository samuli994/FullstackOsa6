import React, { useEffect } from 'react'
import { useNotification } from '../NotificationContext'

const Notification = () => {
  const { state } = useNotification()
  const { dispatch } = useNotification()

  useEffect(() => {
    if (state.message) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [state.message])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: state.message ? 'block' : 'none',
  }

  return <div style={style}>{state.message}</div>
}

export default Notification
