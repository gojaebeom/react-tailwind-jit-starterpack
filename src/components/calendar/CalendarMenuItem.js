function CalendarMenuItem({ calendar }) {
  return (
    <div className="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full mb-2 bg-white text-sm cursor-pointer ">
      {calendar.thumbnailPreview ? (
        <div className="relative w-full h-full">
          <img
            src={`${process.env.REACT_APP_API_URL}/images${calendar.thumbnailPreview}`}
            alt="img"
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="m-2 overflow-hidden whitespace-nowrap">
          {calendar.name && calendar.name[0]}
          {calendar.name && calendar.name[1]}
        </div>
      )}
    </div>
  )
}
export default CalendarMenuItem
