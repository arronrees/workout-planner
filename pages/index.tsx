import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user } = useUser();

  console.log(user);

  return (
    <>
      <h1>Workout Planner</h1>
      <a href='/api/auth/login'>Login</a>
      <a href='/api/auth/logout'>Logout</a>
    </>
  );
}
