import { Link } from 'react-router-dom';
import { FaChess, FaChessRook, FaHome } from 'react-icons/fa';
import './navbar.css';

export const Navbar = () => {
  return (
    <div
      id="nav"
      className="flex flex-row items-center justify-evenly w-24 h-full border-r"
    >
      <Link className="w-1/2" to="">
        <FaHome id="icon" />
        home
      </Link>

      <Link className="w-1/2" to="gameoff">
        <FaChessRook id="icon" />
        start a gameoffline
      </Link>

      <Link className="w-1/2" to="gameon">
        <FaChess id="icon" />
        start a game online
      </Link>
    </div>
  );
};
