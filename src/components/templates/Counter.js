import DefaultLayout from '../layouts/DefaultLayout'
import CounterWidget from '../widgets/statefulWidgets/CounterWidget'

function Counter() {
  return (
    <DefaultLayout>
      <h1 className="text-3xl">카운터 예제</h1>
      <CounterWidget />
    </DefaultLayout>
  )
}

export default Counter
