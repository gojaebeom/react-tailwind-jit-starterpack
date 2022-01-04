import { useCounter } from "core/hooks";

function CounterWidget() {
  const { counter, increment, decrement, reset } = useCounter();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <button onClick={increment}>증가</button>
        <div className="mx-5">{counter}</div>
        <button onClick={decrement}>감소</button>
      </div>
      <button onClick={reset}>초기화</button>
    </div>
  );
}

export default CounterWidget;
