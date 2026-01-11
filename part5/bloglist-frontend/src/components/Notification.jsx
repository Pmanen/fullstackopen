import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.message)
  if (message.content === null) {
    return null;
  }

  return <div className={message.type}>{message.content}</div>;
};

export default Notification;
