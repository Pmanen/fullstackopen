import { useSelector } from "react-redux"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const message = useSelector(state => state.message)

  if (message === null) {
    return null
  }

  return <div style={style}>{message}</div>
}

export default Notification
