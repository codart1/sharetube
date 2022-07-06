import { Box } from '@mantine/core';
import { rpc } from '../shared/rpc/hook';

export function Index() {
  const r = rpc.useQuery(['hello', { text: 'Manh Do' }]);
  console.log(r);
  return <Box>Home page</Box>;
}

export default Index;
