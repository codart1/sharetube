import { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: 'postgres://postgres:FAQCT8yw5BehJu!@db.boogsnacscbfmgkulueq.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1',
      },
    },
  });

if (process.env['NODE_ENV'] !== 'production') global.prisma = prisma;
