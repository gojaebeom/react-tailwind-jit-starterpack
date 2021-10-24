import { useCalendars } from '../../states/calendar'
import DefaultLayoutMenu from './DefaultLayoutMenu'
import testImg from '../../assets/images/bgmCover01.png'
import UserEditModalOpenButton from '../user/UserEditModalOpenButton'
import UserLogoutButton from '../user/UserLogoutButton'
import UserEditModal from '../user/UserEditModal'
import { useState } from 'react'

function DefaultLayout({ children }) {
  // const [leftAside, setLeftAside] = useState(false)
  // const [rightAside, setRightAside] = useState(false)

  const { calendars } = useCalendars()

  return (
    <div className="top-0 left-0 fixed flex w-full h-full bg-red-300  font-noto-regular text-[#424242]">
      <aside className="absolute left-0 w-full sm:static sm:w-[380px] h-full flex">
        <div className="flex flex-col items-center w-[60px] md:w-[80px] h-full p-2 bg-red-300">
          <DefaultLayoutMenu menus={calendars} />
        </div>
        <div className="relative w-full sm:w-[300px] h-full bg-white border-r">
          <div className="flex items-center justify-between w-full h-[50px] border-b p-2">
            제목
            <i className="fas fa-times"></i>
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
      <section className="w-full h-full bg-white">
        <div className="flex items-center justify-between w-full h-[50px] border-b px-4">
          <i className="cursor-pointer fas fa-hamburger"></i>
          <i className="cursor-pointer fas fa-ellipsis-h"></i>
        </div>
        <div className="w-full h-full">{children}</div>
      </section>
      <aside className="hidden xl:block w-[300px] min-w-[300px] h-full bg-white border-l">
        <div className="flex items-center w-full h-[50px] border-b">
          상태 박스 제목
        </div>
        <div className="w-full h-full">상태 박스 내용</div>
      </aside>
      <UserEditModal />
    </div>
  )
}

export default DefaultLayout
