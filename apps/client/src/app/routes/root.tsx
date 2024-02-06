import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';

export const Root = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Root;
