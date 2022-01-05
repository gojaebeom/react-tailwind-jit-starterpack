import React from "react";
import { useRoutes } from "react-router-dom";

import { Home, About, Counter } from "pages";

function App() {
  const route = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/count", element: <Counter /> },
  ]);

  return route;
}

export default App;
