import { withTRPC } from '@trpc/next';
import { supabasePublic } from '../supabase/supabasePublic';
import type { AppRouter } from './routers';

export const withRPC = (url: string) =>
  withTRPC<AppRouter>({
    config() {
      return {
        url,
        headers() {
          return {
            Authorization: supabasePublic.auth.session()?.access_token,
          };
        },
      };
    },
  });
