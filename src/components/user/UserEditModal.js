import { useUserEditModal } from '../../states/user'

function UserEditModal() {
  const { userEditModal, closeHandler } = useUserEditModal()

  return (
    userEditModal.open && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-50 bg-opacity-80">
        <div className="flex flex-col items-center p-5 bg-white rounded-sm w-full h-full sm:w-[350px] sm:h-auto overflow-hidden border">
          <p className="text-2xl font-noto-medium">회원 정보 수정</p>
          <p className="text-sm">{}</p>
          <label
            className="flex flex-col items-center justify-center w-20 h-20 my-5 border-2 border-gray-500 border-dashed rounded-full cursor-pointer"
            htmlFor="file"
          >
            <>
              <i className="text-2xl fas fa-camera"></i>
              <span className="text-sm">UPLOAD</span>
            </>

            <input
              id="file"
              type="file"
              className="w-0 h-0"
              onChange={() => {}}
            />
          </label>
          <button className="text-xs" onClick={() => {}}>
            이미지 초기화
          </button>

          <div className="w-full">
            <label className="text-xs">유저코드</label>
            <input
              className="w-full p-3 border rounded-sm outline-none"
              placeholder="회원코드"
              value={() => {}}
              onChange={() => {}}
              name="userCode"
              disabled
            />
          </div>
          <div className="w-full mt-5">
            <label className="text-xs">닉네임</label>
            <input
              className="w-full p-3 border rounded-sm"
              placeholder="이름 또는 닉네임을 적어주세요."
              value={''}
              onChange={() => {}}
              name="nickname"
              maxLength={7}
              autoComplete="off"
            />
          </div>
          <div className="flex justify-end w-full mt-5">
            <button onClick={() => {}}>회원 탈퇴</button>
          </div>
          <div className="flex justify-between w-full">
            <button
              className="px-5 py-2 mt-5 rounded-sm font-noto-medium"
              onClick={closeHandler}
            >
              취소
            </button>
            <button
              className="flex items-center justify-center px-5 py-2 mt-5 text-white bg-red-400 rounded-sm font-noto-medium"
              onClick={() => {}}
            >
              수정
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default UserEditModal
