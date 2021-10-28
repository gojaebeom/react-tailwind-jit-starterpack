import { useHistory } from 'react-router'
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import apiScaffold from '../customs/api'
import dateFormat from '../customs/dateFormat'
import { calendarDetailState } from './calendar'
import { toastState } from './toast'
import { userState } from './user'

export const todosState = atom({
  key: 'todosState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})

export const todosByMonthState = atom({
  key: 'todosByMonthState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})

export const todoEditState = atom({
  key: 'todoEditState', // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    title: '',
    description: '',
    isFinished: '',
    isOpen: false,
  }, // default value (aka initial value)
})

export const todoStoreState = atom({
  key: 'todoStoreState', // unique ID (with respect to other atoms/selectors)
  default: {
    userId: '',
    calendarId: [],
    title: '',
    description: '',
    matchedDate: '',
    isOpen: false,
  }, // default value (aka initial value)
})

export const useTodos = () => {
  const [todos, setTodos] = useRecoilState(todosState)
  const { day } = dateFormat(useHistory())
  const calendar = useRecoilValue(calendarDetailState)
  const user = useRecoilValue(userState)

  const refreshTodos = async () => {
    if (calendar.id && user.id) {
      const loadRes = await apiScaffold({
        method: 'get',
        url: `/todos?calendarId=${calendar.id}&matchedDate=${day}&userId=${user.id}`,
      })
      if (loadRes) {
        setTodos([...loadRes.data])
      }
    }
  }

  return {
    calendar,
    user,
    todos,
    refreshTodos,
  }
}

export const useTodoEdit = () => {
  const setToast = useSetRecoilState(toastState)
  const { refreshTodos } = useTodos()
  const [todoEdit, setTodoEdit] = useRecoilState(todoEditState)

  const changeTodoEditIsFinished = async (item) => {
    const formData = new FormData()
    formData.append('id', item.id)
    formData.append('isFinished', !item.isFinished ? 1 : 0)
    await apiScaffold({
      method: 'put',
      url: `/todos/${item.id}`,
      data: formData,
    })
    await refreshTodos()
  }
  const editFormOpenEvent = (todo) => {
    setTodoEdit({
      ...todoEdit,
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isFinished: todo.isFinished,
      isOpen: true,
    })
  }

  const closeTodoEditForm = () => setTodoEdit({ ...todoEdit, isOpen: false })

  const changeTodoEditInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    if (name === 'title') setTodoEdit({ ...todoEdit, title: value })
    else if (name === 'description')
      setTodoEdit({ ...todoEdit, description: value })
  }

  const submitTodoEdit = async () => {
    if (!todoEdit.title)
      return setToast({
        open: true,
        message: '제목은 필수입니다!',
        type: 'WARNING',
        second: 2000,
      })

    const formData = new FormData()
    formData.append('id', todoEdit.id)
    formData.append('title', todoEdit.title)
    formData.append('description', todoEdit.description)
    await apiScaffold({
      method: 'put',
      url: `/todos/${todoEdit.id}`,
      data: formData,
    })
    await refreshTodos()
    closeTodoEditForm()
  }

  const deleteTodoEvent = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const result = confirm('일정을 삭제하시겠습니까?')
    if (result) {
      await apiScaffold({
        method: 'delete',
        url: `/todos/${id}`,
      })
      await refreshTodos()
    }
  }

  return {
    setToast,
    todoEdit,
    deleteTodoEvent,
    editFormOpenEvent,
    changeTodoEditIsFinished,
    submitTodoEdit,
    changeTodoEditInputs,
    closeTodoEditForm,
  }
}

export const useTodoStore = () => {
  const setToast = useSetRecoilState(toastState)
  const history = useHistory()
  const calendar = useRecoilValue(calendarDetailState)
  const resetTodoEdit = useResetRecoilState(todoEditState)
  const todoEdit = useRecoilValue(todoEditState)

  const [todoStore, setTodoStore] = useRecoilState(todoStoreState)
  const resetTodoStore = useResetRecoilState(todoStoreState)
  const user = useRecoilValue(userState)
  const { day } = dateFormat(history)

  const { refreshTodos } = useTodos()

  const todoStoreFormToggle = () =>
    setTodoStore({ ...todoStore, isOpen: !todoStore.isOpen })

  const changeStoreHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'title') {
      setTodoStore({ ...todoStore, title: value })
    } else if (name === 'description') {
      setTodoStore({ ...todoStore, description: value })
    } else if (name === 'calendarIdList') {
      const checked = e.target.checked
      if (checked === true) {
        setTodoStore({
          ...todoStore,
          calendarId: [...todoStore.calendarId].concat(value),
        })
      } else {
        const newCalendarIdList = todoStore.calendarId.filter(
          (item) => item !== value,
        )
        setTodoStore({ ...todoStore, calendarId: newCalendarIdList })
      }
    }
  }

  const clickTodoCreateHandler = async (e) => {
    if (!todoStore.title)
      return setToast({
        open: true,
        message: '제목은 필수입니다!',
        type: 'WARNING',
        second: 2000,
      })
    if (todoStore.calendarId.length === 0) {
      return setToast({
        open: true,
        message: '한 개 이상의 캘린더를 채크해주세요!',
        type: 'WARNING',
        second: 2000,
      })
    }

    resetTodoEdit()

    const formData = new FormData()
    formData.append('title', todoStore.title)
    formData.append('description', todoStore.description)
    formData.append('matchedDate', day)
    formData.append('userId', user.id)
    formData.append('calendarIdList', todoStore.calendarId)
    await apiScaffold({
      method: 'post',
      url: '/todos',
      data: formData,
    })
    resetTodoStore()
    await refreshTodos()
    todoStoreFormToggle()
  }

  return {
    calendar,
    clickTodoCreateHandler,
    changeStoreHandler,
    todoStoreFormToggle,
    todoStore,
    setTodoStore,
    todoEdit,
  }
}

export const useTodosByMonth = () => {
  const [todosByMonth, setTodosByMonth] = useRecoilState(todosByMonthState)

  return {
    todosByMonth,
    setTodosByMonth,
  }
}
