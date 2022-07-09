import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { supabasePublic } from './supabase/supabasePublic';

export const withAuthGuard = (Comp: React.FunctionComponent) => {
  return function AuthGuard(props: any) {
    const router = useRouter();
    useEffect(() => {
      if (!supabasePublic.auth.session()) {
        router.push('/login');
      }
    }, [router]);
    return <Comp {...props} />;
  };
};
