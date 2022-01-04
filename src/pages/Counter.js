import { DefaultLayout } from "components/layouts";
import { CounterWidget } from "components/layouts/counter";

function Counter() {
  return (
    <DefaultLayout>
      <h1 className="text-3xl">Recoil 카운터 예제</h1>
      <CounterWidget />
    </DefaultLayout>
  );
}

export default Counter;
