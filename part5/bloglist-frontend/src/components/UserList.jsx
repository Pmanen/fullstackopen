import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(userItem => (
            <tr key={userItem.id}>
              <td>{userItem.username}</td>
              <td>{userItem.blogs.length}</td>
            </tr>
      ))} 
        </tbody>
      </table>

    </div>
  )
}

export default UserList