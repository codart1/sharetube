import { Box } from '@mantine/core';
import { rpc } from '../shared/rpc/hook';

export function Index() {
  const r = rpc.useQuery(['public.hello']);
  return <Box>Home page</Box>;
}

export default Index;
