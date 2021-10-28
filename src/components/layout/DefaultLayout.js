import UserEditModal from '../user/UserEditModal'
import { useEffect, useState } from 'react'
import CalendarMenuDetail from '../calendar/CalendarMenuDetail'
import CalendarMenu from '../calendar/CalendarMenu'

function DefaultLayout({ children }) {
  const [leftAside, setLeftAside] = useState(true)
  const [rightAside, setRightAside] = useState(true)

  useEffect(() => {
    changeOfStatusByCondition()
    window.addEventListener('resize', () => changeOfStatusByCondition())
  }, [])

  const changeOfStatusByCondition = () => {
    if (window.innerWidth <= 1200) {
      setRightAside(false)
    } else {
      setRightAside(true)
    }
    if (window.innerWidth <= 1000) {
      setLeftAside(false)
    } else {
      setLeftAside(true)
    }
  }

  return (
    <div className="top-0 left-0 fixed flex w-full h-full bg-white font-noto-regular text-[#424242]">
      {leftAside && (
        <aside className="absolute left-0 w-full sm:static sm:w-[380px] h-full flex transition duration-100 z-40">
          <CalendarMenu />
          <CalendarMenuDetail setLeftAside={setLeftAside} />
        </aside>
      )}
      <section className="w-full h-full bg-white">
        <div className="flex items-center justify-between w-full h-[50px] border-b px-4 ">
          <button onClick={() => setLeftAside(!leftAside)}>
            <i className="cursor-pointer fas fa-hamburger hover:text-indigo-400"></i>
          </button>
          <button onClick={() => setRightAside(!rightAside)}>
            <i className="cursor-pointer fas fa-ellipsis-h hover:text-indigo-400"></i>
          </button>
        </div>
        <div className="w-full h-full p-3">{children}</div>
      </section>
      {rightAside && (
        <aside className="absolute sm:static block w-full sm:w-[300px] sm:min-w-[300px] h-full bg-white border-l">
          <div className="flex items-center justify-between w-full h-[50px] border-b pl-2 pr-4">
            상태 박스 제목
            {window.innerWidth <= 1000 && (
              <button onClick={() => setRightAside(false)}>
                <i className="fas fa-times hover:text-indigo-400"></i>
              </button>
            )}
          </div>
          <div className="w-full h-full">상태 박스 내용</div>
        </aside>
      )}
      <UserEditModal />
    </div>
  )
}

export default DefaultLayout
