import React from 'react'
import { useRoutes } from 'react-router-dom'
import About from './components/templates/About'
import Home from './components/templates/Home'

function App() {
  const route = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <About /> },
  ])

  return route
}

export default App
