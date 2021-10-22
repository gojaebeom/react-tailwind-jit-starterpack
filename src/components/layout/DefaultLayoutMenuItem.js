function DefaultLayoutMenuItem({ item }){
  return (
    <div className="flex items-center justify-center w-[40px] h-[40px] md:w-[50px] md:h-[50px] border rounded-full mb-2 bg-white text-xs">
      {item.title}
    </div>
  )
}

export default DefaultLayoutMenuItem
