import { useUser } from '../../states/user'

function UserLogoutButton() {
  const { logout } = useUser()
  return (
    <button onClick={logout} className="focus:outline-none">
      <i className="mx-1 fas fa-sign-out-alt"></i>
    </button>
  )
}

export default UserLogoutButton
