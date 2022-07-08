import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { prisma } from '@sharetube/prisma';
import { supabasePrivate } from '../../supabase/supabasePrivate';
import { TRPCError } from '@trpc/server';
import { createPostSchema } from '../../validationSchemas/createPost';

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    // console.log('headers', opts?.req.headers);
    const jwt = opts?.req.headers.authorization;
    if (jwt) {
      const { user } = await supabasePrivate.auth.api.getUser(jwt);

      if (!user) return null;
      const profile = await prisma.profile.findUnique({
        where: { userId: user?.id },
      });

      if (!profile) return null;

      return {
        profile,
        user,
      };
    }
    return null;
  }

  return {
    auth: await getUserFromHeader(),
  };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

const createRouter = () => {
  return trpc.router<Context>();
};

const authenticatedRoutes = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.auth) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
  })
  .mutation('createPost', {
    input: createPostSchema,
    async resolve({ input: { videoUrl, title, description }, ctx: { auth } }) {
      return prisma.post.create({
        data: {
          title,
          url: videoUrl,
          description,
          profileId: auth!.profile.id,
        },
      });
    },
  })
  .query('helloUser', {
    resolve({ ctx }) {
      return `hello ${ctx.auth?.user?.email}`;
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
    resolve({ ctx }) {
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
