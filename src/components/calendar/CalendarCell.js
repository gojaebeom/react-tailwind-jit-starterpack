import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useCalendars } from '../../states/calendar'
import { useTodosByMonth } from '../../states/todo'
import moment from 'moment'
import CalendarCustomizer from './CalendarCustomizer'

const CalendarCell = ({ index, week }) => {
  const { customizes, setContextMenu, calendarDetail, today } = useCalendars()

  let days = today
    .clone()
    .startOf('year')
    .week(week)
    .startOf('week')
    .add(index, 'day')

  const { todosByMonth } = useTodosByMonth()

  const tdRef = useRef()

  const changeBgColor = (el, color) => {
    for (let i = 0; i < el.classList.length; i++) {
      const className = el.classList.item(i)
      if (className.includes('bg-')) {
        el.classList.remove(className)
      }
    }

    if (!color) {
      if (index % 7 === 0 || index % 6 === 0) {
        el.classList.add('bg-gray-100')
      }
    } else {
      el.classList.add(color)
    }
  }

  useEffect(() => {
    let matched = false
    for (let c of customizes) {
      if (c.matchedDate === days.format('YYYYMMDD')) {
        matched = true
        if (c.color === 'red') {
          changeBgColor(tdRef.current, 'bg-red-100')
        } else if (c.color === 'blue') {
          changeBgColor(tdRef.current, 'bg-blue-100')
        } else if (c.color === 'green') {
          changeBgColor(tdRef.current, 'bg-green-100')
        } else if (c.color === 'yellow') {
          changeBgColor(tdRef.current, 'bg-yellow-100')
        } else if (c.color === 'purple') {
          changeBgColor(tdRef.current, 'bg-purple-100')
        } else if (c.color === 'indigo') {
          changeBgColor(tdRef.current, 'bg-indigo-100')
        } else {
          changeBgColor(tdRef.current, '')
        }
      }
    }

    if (!matched) {
      changeBgColor(tdRef.current, '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizes, today])

  return (
    <td
      className={`border h-[120px] hover:shadow-inner ${
        index % 7 === 0 || index % 6 === 0 ? 'bg-gray-100' : ''
      } `}
      onContextMenu={(event) => {
        setContextMenu({
          isOpen: true,
          matchedCalendarId: calendarDetail.id,
          matchedDate: days.format('YYYYMMDD'),
        })
        event.preventDefault()
      }}
      ref={tdRef}
    >
      <Link
        to={`/calendars/${calendarDetail.id}/days/${days.format('YYYY-MM-DD')}`}
        className={`${
          days.format('MM') !== today.format('MM') && 'opacity-30'
        } relative flex flex-col justify-start items-end h-full px-1`}
      >
        <span
          className={`mb-2 ${
            moment().format('YYYYMMDD') === days.format('YYYYMMDD') &&
            'bg-red-400  text-white rounded-2xl px-2'
          }`}
        >
          {days.format('D')}
        </span>
        <ul className="flex flex-col items-start justify-center w-full">
          {
            // eslint-disable-next-line array-callback-return
            todosByMonth.map((item, index) => {
              if (days.format('YYYY-MM-DD') === item.matchedDate) {
                return (
                  <li
                    className={`relative w-full text-sm truncate overflow-ellipsis ${
                      item.isFinished === '1' && 'line-through'
                    }`}
                    key={item.id}
                  >
                    ·{item.title}
                  </li>
                )
              }
            })
          }
        </ul>
        <CalendarCustomizer days={days} />
      </Link>
    </td>
  )
}

export default CalendarCell
