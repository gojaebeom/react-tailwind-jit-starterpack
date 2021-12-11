import DefaultLayout from 'components/containers/DefaultLayout'
import CounterWidget from 'components/containers/CounterWidget'

function Counter() {
  return (
    <DefaultLayout>
      <h1 className="text-3xl">Recoil을 사용한 카운터 예제</h1>
      <CounterWidget />
    </DefaultLayout>
  )
}

export default Counter
