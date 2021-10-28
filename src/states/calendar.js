import moment from 'moment'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import apiScaffold from '../customs/api'
import { userState } from './user'

export const calendarsState = atom({
  key: 'calendarsState',
  default: [],
})

export const calendarStoreState = atom({
  key: 'calendarStoreState', // unique ID (with respect to other atoms/selectors)
  default: {
    name: '',
    thumbnail: '',
    thumbnailFile: null,
    isPrivate: 0,
    color: '', // blue, red, yellow, green
    isOpen: false,
  }, // default value (aka initial value)
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

export const calendarCustomsState = atom({
  key: 'calendarCustomsState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})

export const contextMenuState = atom({
  key: 'contextMenuState', // unique ID (with respect to other atoms/selectors)
  default: {
    isOpen: false,
    matchedCalendarId: '',
    matchedDate: '',
  }, // default value (aka initial value)
})

export const todayState = atom({
  key: 'todayState', // unique ID (with respect to other atoms/selectors)
  default: moment(), // default value (aka initial value)
})

export const useCalendars = () => {
  const user = useRecoilValue(userState)
  const [calendars, setCalendars] = useRecoilState(calendarsState)
  const [customizes, setCustomizes] = useRecoilState(calendarCustomsState)
  const [contextMenu, setContextMenu] = useRecoilState(contextMenuState)
  const [calendarDetail, setCalendarDetail] = useRecoilState(
    calendarDetailState,
  )
  const [today, setToday] = useRecoilState(todayState)

  const getCalendarCustomizes = async () => {
    const res = await apiScaffold({
      method: 'get',
      url: `/calendar-customizes?userId=${user.id}&calendarId=${calendarDetail.id}`,
    })
    setCustomizes(res.data)
    console.debug(res)
  }

  const changeTdColor = async (e, today, color) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('calendarId', calendarDetail.id)
    formData.append('userId', user.id)
    formData.append('matchedDate', today)
    formData.append('color', color)

    await apiScaffold({
      method: 'post',
      url: '/calendar-customizes',
      data: formData,
    })
    await getCalendarCustomizes()
  }

  return {
    calendars,
    setCalendars,
    calendarDetail,
    setCalendarDetail,
    customizes,
    setCustomizes,
    contextMenu,
    setContextMenu,
    changeTdColor,
    getCalendarCustomizes,
    today,
    setToday,
  }
}

export const useCalendarStore = () => {
  const [calendarStore, setCalendarStore] = useRecoilState(calendarStoreState)

  const calendarStoreToggleHandler = () =>
    setCalendarStore({ ...calendarStoreState, isOpen: !calendarStore.isOpen })

  return {
    calendarStore,
    calendarStoreToggleHandler
  }
}
