import { useCalendarStore } from '../../states/calendar'

function CalendarStoreModalOpenButton() {
  const {calendarStoreToggleHandler} = useCalendarStore()

  return (
    <div
      className="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] mb-2 overflow-hidden rounded-full cursor-pointer bg-gray-50"
      onClick={calendarStoreToggleHandler}
    >
      <i className="text-xl text-gray-300 fas fa-plus"></i>
    </div>
  )
}

export default CalendarStoreModalOpenButton
