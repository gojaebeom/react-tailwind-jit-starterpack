import React from 'react'
import { useRoutes } from 'react-router-dom'
import About from './components/templates/About'
import Counter from './components/templates/Counter'
import Home from './components/templates/Home'

function App() {
  const route = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/count', element: <Counter /> },
  ])

  return route
}

export default App
