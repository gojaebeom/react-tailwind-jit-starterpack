import { Route, Switch } from 'react-router'
import Toast from './components/shared/Toast'
import Login from './pages/Login'
import Main from './pages/Main'
import Redirector from './pages/Redirector'
import TodoList from './pages/TodoList'
import { useUserRefresh } from './states/user'

function App() {
  useUserRefresh()
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/calendars/:id/days/:date">
          <TodoList />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/auth/kakao">
          <Redirector />
        </Route>
      </Switch>
      <Toast />
    </div>
  )
}

export default App
