import Calendar from '../components/calendar/Calendar'
import CalendarMover from '../components/calendar/CalendarMover'
import DefaultLayout from '../components/layout/DefaultLayout'

function Main() {
  return (
    <DefaultLayout>
      <CalendarMover />
      <Calendar />
    </DefaultLayout>
  )
}

export default Main
