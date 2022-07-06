import { withTRPC } from '@trpc/next';
import { AppRouter } from './routers';

export const withRPC = (url: string) =>
  withTRPC<AppRouter>({
    config() {
      return {
        url,
      };
    },
  });
