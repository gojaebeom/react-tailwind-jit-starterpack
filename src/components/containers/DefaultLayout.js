import Header from 'components/containers/Header'

function DefaultLayout(props) {
  return (
    <div className="w-full font-apple-regular">
      <Header />
      <section className="p-4">{props.children}</section>
    </div>
  )
}

export default DefaultLayout
