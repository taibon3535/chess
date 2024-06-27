import { Link } from 'react-router-dom';
import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import { UserButton } from '@clerk/clerk-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-accent flex h-16 w-full items-center justify-around border-b p-2">
      <UserButton />
      <Link to="/" className="aspect-square h-full">
        <HomeIcon />
      </Link>
    </nav>
  );
};
