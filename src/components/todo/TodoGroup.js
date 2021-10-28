import TodoGroupItem from './TodoGroupItem'
import { useEffect } from 'react'
import { useTodos } from '../../states/todo'

function TodoGroup() {
  const { user, calendar, todos, refreshTodos } = useTodos()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await refreshTodos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, calendar])

  return (
    todos.length !== 0 &&
    todos.map((writer) => {
      return (
        <div
          className="flex flex-col items-start justify-center w-full p-3 mb-4 rounded-md bg-gray-50"
          key={writer.id}
        >
          <div className="flex items-center justify-start w-full mb-3">
            {writer.profilePreviewImg ? (
              <img
                src={`${process.env.REACT_APP_API_URL}/images${writer.profilePreviewImg}`}
                alt="img"
                className="w-8 h-8 mr-2 border border-gray-300 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center w-8 h-8 mr-2 border border-gray-500 rounded-full">
                <i className="far fa-user"></i>
              </div>
            )}
            <p className="text-md text-real-black">{writer.nickname}</p>
          </div>
          <div className="relative flex flex-col items-start justify-center w-full pl-2 ml-4 border-l">
            {/* <div className="absolute top-0 w-2 h-2 bg-gray-200 border rounded-full border-gray-50 -left-1"></div> */}
            {writer.todos &&
              writer.todos.map((item) => {
                return (
                  <TodoGroupItem key={item.id} item={item} writer={writer} />
                )
              })}
          </div>
        </div>
      )
    })
  )
}
export default TodoGroup
