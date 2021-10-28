import { useCalendars } from '../../states/calendar'

function CalendarCustomizer({ days }) {
  const { contextMenu, calendarDetail, today, changeTdColor } = useCalendars()
  return (
    days.format('MM') === today.format('MM') &&
    contextMenu.isOpen &&
    contextMenu.matchedCalendarId === calendarDetail.id &&
    contextMenu.matchedDate === days.format('YYYYMMDD') && (
      <div className="absolute left-0 z-50 flex items-center justify-center w-full shadow-lg calendar-cell-customize-bar bottom-2 ">
        <button
          className="flex-1 h-5 bg-white border-gray-400 border-1 hover:bg-gray-50"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'white')}
        />
        <button
          className="flex-1 h-5 bg-red-100 border-gray-400 border-1 hover:bg-red-200"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'red')}
        />
        <button
          className="flex-1 h-5 bg-blue-100 border-gray-400 border-1 hover:bg-blue-200"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'blue')}
        />
        <button
          className="flex-1 h-5 bg-green-100 border-gray-400 border-1 hover:bg-green-200"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'green')}
        />
        <button
          className="flex-1 h-5 bg-yellow-100 border-gray-400 border-1 hover:bg-yellow-200"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'yellow')}
        />
        <button
          className="flex-1 h-5 bg-purple-100 border-gray-400 border-1 hover:bg-purple-200"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'purple')}
        />
        <button
          className="flex-1 h-5 bg-indigo-100 border-gray-400 border-1 hover:bg-indigo-200"
          onClick={(e) => changeTdColor(e, days.format('YYYYMMDD'), 'indigo')}
        />
      </div>
    )
  )
}
export default CalendarCustomizer
