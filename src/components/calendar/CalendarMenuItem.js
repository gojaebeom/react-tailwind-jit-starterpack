import { useRecoilValue } from 'recoil'
import { calendarDetailState, useCalendars } from '../../states/calendar'

function CalendarMenuItem({ calendar }) {
  const { calenarMenuChangeHandler } = useCalendars()
  const calendarDetail = useRecoilValue(calendarDetailState)

  return (
    <div className="relative">
      <button
        className={'flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full mb-2 bg-white text-sm cursor-pointer overflow-hidden transition duration-700 ease-in-out '.concat(
          calendar.id === calendarDetail.id ? 'rounded-2xl' : 'rounded-full',
        )}
        onClick={() => calenarMenuChangeHandler(calendar)}
      >
        {calendar.thumbnailPreview ? (
          <div className="relative w-full h-full">
            <img
              src={`${process.env.REACT_APP_API_URL}/images${calendar.thumbnailPreview}`}
              alt="img"
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="m-2 overflow-hidden whitespace-nowrap">
            {calendar.name && calendar.name[0]}
            {calendar.name && calendar.name[1]}
          </div>
        )}
      </button>
    </div>
  )
}
export default CalendarMenuItem
