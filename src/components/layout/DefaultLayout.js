import { useCalendars } from '../../states/calendar'
import DefaultLayoutMenu from './DefaultLayoutMenu'
import testImg from '../../assets/images/bgmCover01.png'
import UserEditModalOpenButton from '../user/UserEditModalOpenButton'
import UserLogoutButton from '../user/UserLogoutButton'
import UserEditModal from '../user/UserEditModal'
import { useEffect, useState } from 'react'

function DefaultLayout({ children }) {
  const [leftAside, setLeftAside] = useState(true)
  const [rightAside, setRightAside] = useState(true)

  const { calendars } = useCalendars()

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
        <aside className="absolute left-0 w-full sm:static sm:w-[380px] h-full flex transition duration-100">
          <div className="flex flex-col items-center w-[60px] md:w-[80px] h-full p-2 bg-gradient-to-b from-blue-400 to-blue-300">
            <div
              className="relative flex items-center justify-center w-12 h-12 mt-2 mb-4 rounded-full cursor-pointer bg-gray-50"
              title="초대 알림"
            >
              <i className="text-2xl text-indigo-300 fab fas fa-bell"></i>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
            </div>
            <DefaultLayoutMenu menus={calendars} />
          </div>
          <div className="relative w-full sm:w-[300px] h-full bg-white sm:border-r">
            <div className="flex items-center justify-between w-full h-[50px] border-b px-3">
              제목
              <div>
                <button className="ml-2 focus:outline-none hover:text-indigo-400">
                  <i className="fas fa-cog"></i>
                </button>
                {window.innerWidth <= 1000 && (
                  <button className="ml-3" onClick={() => setLeftAside(false)}>
                    <i className="fas fa-times hover:text-indigo-400"></i>
                  </button>
                )}
              </div>
            </div>
            <div className="w-full h-full p-2">내용</div>
            <div className="absolute bottom-0 left-0 flex items-center justify-between px-2 w-full h-[50px] border-t">
              <div className="flex items-center">
                <img
                  src={testImg}
                  alt="img"
                  className="w-8 h-8 border border-gray-200 rounded-full"
                />
                <p className="ml-1 text-xs">@asfoinc1635d</p>
              </div>
              <div className="flex items-center justify-end">
                <UserLogoutButton />
                <UserEditModalOpenButton />
              </div>
            </div>
          </div>
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
        <div className="w-full h-full">{children}</div>
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
