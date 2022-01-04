import { counterState } from "core/state";
import { useRecoilState } from "recoil";

function useCounter() {
  const [counter, setCounter] = useRecoilState(counterState);

  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter <= 0) {
      window.alert("0보다 작을 수 없습니다.");
      return;
    }
    setCounter(counter - 1);
  };

  const reset = () => {
    setCounter(0);
  };

  return {
    counter,
    increment,
    decrement,
    reset,
  };
}

export default useCounter;
