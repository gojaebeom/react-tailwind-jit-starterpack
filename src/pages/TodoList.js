import { useHistory } from 'react-router'
import DefaultLayout from '../components/layout/DefaultLayout'
import TodoEditForm from '../components/todo/TodoEditForm'
import TodoGroup from '../components/todo/TodoGroup'
import TodoIsNull from '../components/todo/TodoIsNull'
import TodoStoreForm from '../components/todo/TodoStoreForm'

function TodoList() {
  const history = useHistory()
  return (
    <DefaultLayout>
      <div className="relative flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full mb-2 md:p-0">
          <div className="flex items-center text-xl font-noto-medium group">
            <button
              className="p-4 py-1 mr-2 rounded-xl group-hover:bg-red-300"
              onClick={() => history.goBack()}
            >
              <i className="text-xl text-red-400 fas fa-chevron-left group-hover:text-white"></i>
            </button>
            {/* <span>{filterDay}</span> */}
          </div>
          <div>필터</div>
        </div>
        <TodoStoreForm />
        <TodoEditForm />
        <TodoGroup />
        <TodoIsNull />
      </div>
    </DefaultLayout>
  )
}

export default TodoList
