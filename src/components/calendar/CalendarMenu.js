import { useCalendars } from '../../states/calendar'
import CalendarMenuItem from './CalendarMenuItem'
import CalendarStoreModalOpenButton from './CalendarStoreModalOpenButton'

function CalendarMenu() {
  const { calendars } = useCalendars()

  return (
    <div className="flex flex-col items-center w-[60px] md:w-[80px] h-full p-2 bg-gradient-to-b from-blue-400 to-blue-300">
      <div
        className="relative flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] mt-2 mb-4 rounded-full cursor-pointer bg-gray-50"
        title="초대 알림"
      >
        <i className="text-2xl text-indigo-300 fab fas fa-bell"></i>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
      </div>
      {calendars &&
        calendars.map((calendar) => {
          return <CalendarMenuItem key={calendar.id} calendar={calendar} />
        })}
      <CalendarStoreModalOpenButton />
    </div>
  )
}

export default CalendarMenu
