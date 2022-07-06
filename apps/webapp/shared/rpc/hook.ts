import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from './routers';

export const rpc = createReactQueryHooks<AppRouter>();
