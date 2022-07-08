import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { prisma } from '@sharetube/prisma';

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you'd might want to do in your ctx fn
  async function getUserFromHeader() {
    console.log('headers', opts?.req.headers);
    if (opts?.req.headers.authorization) {
      // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
      // return user;
    }
    return null;
  }
  const user = await getUserFromHeader();

  return {
    user,
  };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const createRouter = () => {
  return trpc.router<Context>();
};

const authenticatedRoutes = createRouter().mutation('createPost', {
  input: z.string(),
  async resolve({ input: userId, ctx }) {
    return prisma.profile.create({
      data: {
        userId,
      },
    });
  },
});

const publicRoutes = createRouter()
  .mutation('bindProfile', {
    input: z.string(),
    async resolve({ input: userId }) {
      return prisma.profile.create({
        data: {
          userId,
        },
      });
    },
  })
  .query('hello', {
    resolve() {
      return 'hello';
    },
  });

export const appRouter = createRouter()
  .merge('public.', publicRoutes)
  .merge('authenticated.', authenticatedRoutes);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export const rpcHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
