import { useContext } from 'react'
import MessageContext from '../MessageContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const { message } = useContext(MessageContext)
  
  if (message === null) {
    return null
  }

  return <div style={style}>{message}</div>
}

export default Notification