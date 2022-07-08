import { supabase } from '@sharetube/supabase';
import { withTRPC } from '@trpc/next';
import type { AppRouter } from './routers';

export const withRPC = (url: string) =>
  withTRPC<AppRouter>({
    config() {
      return {
        url,
        headers() {
          return {
            Authorization: supabase.client.auth.session()?.access_token,
          };
        },
      };
    },
  });
