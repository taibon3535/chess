import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar';
import { useUser } from '@clerk/clerk-react';
import { useFindOrCreateUserMutation } from '../store/services/users.api';
import { useEffect } from 'react';

export const Root = () => {
  const { user } = useUser();

  if (!user) {
    throw new Error(' you need to log in ');
  }

  const [findOrCreate] = useFindOrCreateUserMutation({
    fixedCacheKey: 'logged-in-user',
  });

  useEffect(() => {
    findOrCreate({ clerkUserId: user.id });
  }, [findOrCreate, user.id]);

  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default Root;
