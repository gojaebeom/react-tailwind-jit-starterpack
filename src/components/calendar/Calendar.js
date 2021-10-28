import { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import apiScaffold from '../../customs/api'
import { useCalendars } from '../../states/calendar'
import { toastState } from '../../states/toast'
import { useTodosByMonth } from '../../states/todo'
import { userState } from '../../states/user'
import CalendarCell from './CalendarCell'

function Calendar() {
  const user = useRecoilValue(userState)
  const setToast = useSetRecoilState(toastState)
  const { calendarDetail, getCalendarCustomizes, today } = useCalendars()
  const { setTodosByMonth } = useTodosByMonth()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (calendarDetail.id && user.id) {
      const loadRes = await apiScaffold(
        {
          method: 'get',
          url: `/todos?calendarId=${calendarDetail.id}&userId=${user.id}`,
        },
        (err) =>
          setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
      )
      setTodosByMonth(loadRes.data)
      await getCalendarCustomizes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarDetail.id, setTodosByMonth, user.id])

  const firstWeek = today.clone().startOf('month').week()
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week()

  const calendarArray = () => {
    let result = []
    let week = firstWeek
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {
            // eslint-disable-next-line no-loop-func
            Array(7)
              .fill(0)
              // eslint-disable-next-line no-loop-func
              .map((data, index) => {
                return (
                  <CalendarCell
                    key={index}
                    index={index}
                    today={today}
                    week={week}
                  />
                )
              })
          }
        </tr>,
      )
    }
    return result
  }

  return (
    <table className="w-full mb-10 table-fixed">
      <thead>
        <tr className="text-right">
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
      </thead>
      <tbody>{calendarArray()}</tbody>
    </table>
  )
}

export default Calendar
