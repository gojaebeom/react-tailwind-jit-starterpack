import { useUser } from '../../states/user'

function UserLogoutButton() {
  const { logoutHandler } = useUser()
  return (
    <button onClick={logoutHandler} className="focus:outline-none">
      <i className="mx-1 fas fa-sign-out-alt hover:text-indigo-400"></i>
    </button>
  )
}

export default UserLogoutButton
