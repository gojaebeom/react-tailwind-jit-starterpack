import React from "react";
import { useRoutes } from "react-router-dom";

import About from "pages/About";
import Counter from "pages/Counter";
import Home from "pages/Home";

function App() {
  const route = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/count", element: <Counter /> },
  ]);

  return route;
}

export default App;
