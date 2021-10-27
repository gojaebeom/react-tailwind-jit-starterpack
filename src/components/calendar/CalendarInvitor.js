import { useCalendars } from '../../states/calendar'
import { useUser } from '../../states/user'

function CalendarInviotr() {
  const { user } = useUser()
  const { calendarDetail } = useCalendars()
  return (
    user.id === calendarDetail.userId &&
    !calendarDetail.isDefault && ( // 기본캘린더가 아니면서 캘린더 생성자만 초대 가능
      <div className="flex justify-between w-full mb-4 border-gray-200 rounded-md ">
        <input
          className="w-9/12 p-2 text-xs border outline-none rounded-l-md focus:border-red-300 focus:border-2"
          value={true}
          onChange={() => {}}
          placeholder="유저코드를 입력하세요."
        />
        <button
          className="w-3/12 p-2 text-white transition-all bg-red-300 rounded-r-md hover:bg-red-400"
          onClick={() => {}}
        >
          초대
        </button>
      </div>
    )
  )
}

export default CalendarInviotr
