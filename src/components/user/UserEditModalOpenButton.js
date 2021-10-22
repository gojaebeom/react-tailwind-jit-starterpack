import { useUserEditModal } from '../../states/user'

function UserEditModalOpenButton() {
  const { open } = useUserEditModal()
  return (
    <button onClick={open} className="focus:outline-none">
      <i className="mx-2 fas fa-cog"></i>
    </button>
  )
}

export default UserEditModalOpenButton
