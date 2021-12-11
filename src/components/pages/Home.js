import DefaultLayout from 'components/containers/DefaultLayout';
import { Button } from 'components/storybook/button';

function Home() {
  return (
    <DefaultLayout>
      <h1 className="text-3xl">홈</h1>
      <div>Hello Tailwind-Jit-Templete 👋</div>
      <Button text={'hello'}></Button>
    </DefaultLayout>
  );
}

export default Home;
