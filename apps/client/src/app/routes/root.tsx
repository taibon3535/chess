import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';

export const Root = () => {
  return (
    <div className="w-full h-full flex bg-red-50">
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};
export default Root;
