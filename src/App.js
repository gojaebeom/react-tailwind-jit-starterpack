import React from 'react'
import { useRoutes } from 'react-router-dom'
import About from 'components/pages/About'
import Counter from 'components/pages/Counter'
import Home from 'components/pages/Home'

function App() {
  const route = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/count', element: <Counter /> },
  ])

  return route
}

export default App
