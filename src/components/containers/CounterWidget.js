import { useRecoilState } from 'recoil'
import { counterState } from 'states/conter'

function CounterWidget() {
  const [number, setNumber] = useRecoilState(counterState)

  return (
    <div className="flex items-center justify-center">
      <button onClick={() => setNumber(number + 1)}>증가</button>
      <div className='mx-5'>{number}</div>
      <button onClick={() => setNumber(number - 1)}>감소</button>
    </div>
  )
}

export default CounterWidget
