import { atom, useRecoilState } from 'recoil'

export const calendarsState = atom({
  key: 'calendarsState',
  default: [],
})

export const calendarDetailState = atom({
  key: 'calendarDetailState',
  default: {
    id: '',
    userId: '',
    name: '',
    thumbnailPreview: '',
    isPrivate: 0,
    isDefault: 0,
    members: [],
  },
})

export const useCalendars = () => {
  const [calendars, setCalendars] = useRecoilState(calendarsState)
  const [calendarDetail, setCalendarDetail] = useRecoilState(
    calendarDetailState,
  )

  return {
    calendars,
    setCalendars,
    calendarDetail,
    setCalendarDetail,
  }
}
