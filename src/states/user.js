import axios from 'axios'
import { useEffect } from 'react'
import { useHistory } from 'react-router'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import apiScaffold from '../customs/api'
import { calendarDetailState, calendarsState } from './calendar'
import { toastState } from './toast'

const userState = atom({
  key: 'userState',
  default: {
    id: '',
    email: '',
    userCode: '',
    nickname: '',
    profileImg: '',
    profilePreviewImg: '',
    createdAt: '',
  },
})

const userEditModalState = atom({
  key: 'userEditModalState',
  default: {
    open: false,
  },
})

export const useUserRefresh = () => {
  const setToast = useSetRecoilState(toastState)
  const [user, setUser] = useRecoilState(userState)
  const setCalendars = useSetRecoilState(calendarsState)
  const setCalendarDetail = useSetRecoilState(calendarDetailState)
  const history = useHistory()

  useEffect(() => {
    const pathname = history.location.pathname
    if (pathname !== '/login' && pathname !== '/auth/kakao') silentRefresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const silentRefresh = async () => {
    // TODO: 리프레시 토큰 있을 경우 토큰 재발급, 액세스토큰은 axois header에 할당
    const refreshRes = await apiScaffold({
      method: 'get',
      url: '/auth/silent-refresh',
    })
    axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${refreshRes.act.token}`
    // TODO: 회원 데이터 받아와서 저장
    const userRes = await apiScaffold(
      {
        method: 'get',
        url: `/users/${refreshRes.act.id}`,
      },
      (err) =>
        setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
    )
    console.debug(userRes)
    setUser({ ...user, ...userRes.data.user })
    if (userRes.data.calendars.length !== 0) {
      setCalendars([...userRes.data.calendars])
      setCalendarDetail({ ...userRes.data.calendars[0] })
    }
  }
}

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState)
  const setToast = useSetRecoilState(toastState)

  const logoutHandler = async () => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('로그아웃 하시겠습니까?')
    if (!result) return

    await apiScaffold(
      {
        method: 'get',
        url: '/users/logout',
      },
      (err) =>
        setToast({ open: true, message: err, type: 'ERROR', second: 2000 }),
    )
    // history.push("/login");
    window.location.href = '/login'
  }

  return { user, logoutHandler }
}

export const useUserEditModal = () => {
  const [userEditModal, setUserEditModal] = useRecoilState(userEditModalState)
  const userEditModalReset = useResetRecoilState(userEditModalState)

  const openHandler = () => {
    console.debug('user edit modal is open')
    setUserEditModal({ ...userEditModal, open: true })
  }

  const closeHandler = () => userEditModalReset()

  return {
    userEditModal,
    openHandler,
    closeHandler,
  }
}
