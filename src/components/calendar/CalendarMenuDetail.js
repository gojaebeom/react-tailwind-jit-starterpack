import { useCalendars } from '../../states/calendar'
import { useUser } from '../../states/user'
import Avatar from '../user/Avatar'
import UserEditModalOpenButton from '../user/UserEditModalOpenButton'
import UserLogoutButton from '../user/UserLogoutButton'
import CalendarInviotr from './CalendarInvitor'

function CalendarDetailMenu({ setLeftAside }) {
  const { user } = useUser()
  const { calendarDetail } = useCalendars()
  return (
    <div className="relative w-full sm:w-[300px] sm:max-w-[300px] h-full bg-white sm:border-r">
      <div className="flex items-center justify-between w-full h-[50px] border-b px-3">
        {calendarDetail.name}
        <div>
          <button className="ml-2 focus:outline-none hover:text-indigo-400">
            <i className="fas fa-cog"></i>
          </button>
          {window.innerWidth <= 1000 && (
            <button className="ml-3" onClick={() => setLeftAside(false)}>
              <i className="fas fa-times hover:text-indigo-400"></i>
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-full p-3">
        <CalendarInviotr />
        <div className="mb-2">참여인원 ( {calendarDetail.members.length} )</div>
        {calendarDetail.members &&
          calendarDetail.members.map((member) => {
            return (
              <div
                className="flex items-center justify-between w-full px-2 py-1 rounded-md hover:bg-gray-100"
                key={member.id}
              >
                <div className="flex items-center justify-start">
                  <Avatar user={member} styles="mr-2" />
                  <div>{member.nickname}</div>
                </div>
                {member.id === calendarDetail.userId && (
                  <div className="mr-2">
                    <i className="text-yellow-400 fas fa-crown"></i>
                  </div>
                )}
              </div>
            )
          })}
      </div>
      <div className="absolute bottom-0 left-0 flex items-center justify-between px-2 w-full h-[50px] border-t">
        <div className="flex items-center">
          <Avatar user={user} />
          <p className="ml-1 text-xs">@{user.userCode}</p>
        </div>
        <div className="flex items-center justify-end">
          <UserLogoutButton />
          <UserEditModalOpenButton />
        </div>
      </div>
    </div>
  )
}

export default CalendarDetailMenu
