import { useCalendars } from '../../states/calendar'

function CalendarMover() {
  const { today, setToday } = useCalendars()

  return (
    <div className="flex items-center justify-between w-full mb-5">
      <div className="flex items-center justify-start">
        <button
          className="px-3"
          onClick={() => setToday(today.clone().subtract(1, 'year'))}
        >
          <i className="fas fa-angle-double-left"></i>
        </button>
        <div className="flex items-center justify-center">
          <button
            className="px-3"
            onClick={() => setToday(today.clone().subtract(1, 'month'))}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="text-2xl">{today.format('YYYY 년 MM 월')}</div>
          <button
            className="px-3"
            onClick={() => setToday(today.clone().add(1, 'month'))}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <button
          className="px-3"
          onClick={() => setToday(today.clone().add(1, 'year'))}
        >
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  )
}

export default CalendarMover
