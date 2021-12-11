import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="flex items-center justify-start w-full h-[60px] p-4 border-b">
      <figure className="mr-4">
        <Link to="/">Home</Link>
      </figure>

      <ul className="flex items-center">
        <li className="p-2">
          <Link to="/about">About</Link>
        </li>
        <li className="p-2">
          <Link to="/count">Counter</Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
