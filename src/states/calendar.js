import moment from 'moment'
import { useHistory } from 'react-router'
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import apiScaffold from '../customs/api'
import readImgFile from '../customs/readImgFile'
import { toastState } from './toast'
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
  const history = useHistory()

  const getCalendarCustomizes = async () => {
    const res = await apiScaffold({
      method: 'get',
      url: `/calendar-customizes?userId=${user.id}&calendarId=${calendarDetail.id}`,
    })
    setCustomizes(res.data)
    setContextMenu({ ...contextMenu, isOpen: false })
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

  const calenarMenuChangeHandler = (c) => {
    console.debug(calendarDetail)
    for (let calendar of calendars) {
      if (calendar.id === c.id) {
        setCalendarDetail({ ...calendar })
      }
    }
    history.push('/')
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
    calenarMenuChangeHandler,
  }
}

export const useCalendarStore = () => {
  const user = useRecoilValue(userState)
  const [calendarStore, setCalendarStore] = useRecoilState(calendarStoreState)
  const setCalendars = useSetRecoilState(calendarsState)
  const setToast = useSetRecoilState(toastState)

  const calendarStoreToggleHandler = () =>
    setCalendarStore({ ...calendarStoreState, isOpen: !calendarStore.isOpen })

  const imageChangeHandler = (e) => {
    readImgFile(e, (event, file) => {
      setCalendarStore({
        ...calendarStore,
        thumbnail: event.target.result,
        thumbnailFile: file,
      })
    })
  }

  const inputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    console.debug(name)
    console.debug(value)

    if (name === 'isPrivate') {
      setCalendarStore({
        ...calendarStore,
        isPrivate: calendarStore.isPrivate === 0 ? 1 : 0,
      })
    } else if (name === 'name') {
      setCalendarStore({ ...calendarStore, name: value })
    }
  }

  const submitHandler = async () => {
    if (!calendarStore.name)
      return setToast({
        open: true,
        message: '캘린더 이름은 필수값입니다!',
        type: 'WARNING',
        second: 2000,
      })

    const formData = new FormData()
    formData.append('userId', user.id)
    if (calendarStore.name) formData.append('name', calendarStore.name)
    if (calendarStore.thumbnail)
      formData.append('thumbnail', calendarStore.thumbnailFile)
    formData.append('isPrivate', calendarStore.isPrivate)

    const res = await apiScaffold({
      method: 'post',
      url: '/calendars',
      data: formData,
    })
    setCalendars([...res.data])
  }

  return {
    calendarStore,
    calendarStoreToggleHandler,
    imageChangeHandler,
    inputChangeHandler,
    submitHandler,
  }
}
