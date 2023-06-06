import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import { User } from '@/constant-types';

type Props = {
  redirectTo?: string;
  redirectIfFound?: boolean;
};

export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
}: Props = {}): { user: User | null | undefined; isLoading: boolean } {
  const fetcher = (...args: any[]) =>
    fetch(args[0], args[1]).then((res) => res.json());

  const { data: user, isLoading } = useSWR('/api/user/find', fetcher);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, isLoading };
}
