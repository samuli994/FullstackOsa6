import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

    return () => clearTimeout(timer)
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.show ? 'block' : 'none'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification