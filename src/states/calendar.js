import { atom, useRecoilState } from 'recoil'

export const calendarsState = atom({
  key: 'calendarsState',
  default: [
    {
      id: 1,
      title: 'hello',
      thumbnailPreview: '',
    },
    {
      id: 2,
      title: 'world',
      thumbnailPreview: '',
    },
    {
      id: 3,
      title: 'hoho',
      thumbnailPreview: '',
    },
  ],
})

export const useCalendars = () => {
  const [calendars, setCalendars] = useRecoilState(calendarsState)

  return {
    calendars,
  }
}
