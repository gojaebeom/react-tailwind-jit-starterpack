import DefaultLayoutMenuItem from './DefaultLayoutMenuItem'

function DefaultLayoutMenu({ menus, children }) {
  return (
    <>
      {menus &&
        menus.map((item) => {
          return <DefaultLayoutMenuItem key={item.id} item={item} />
        })}
    </>
  )
}

export default DefaultLayoutMenu
