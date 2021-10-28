import { useUserEdit } from '../../states/user'

function UserEditModalOpenButton() {
  const { openHandler } = useUserEdit()
  return (
    <button onClick={openHandler} className="focus:outline-none">
      <i className="mx-2 fas fa-cog hover:text-indigo-400"></i>
    </button>
  )
}

export default UserEditModalOpenButton
