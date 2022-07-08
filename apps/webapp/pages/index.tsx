import { Box } from '@mantine/core';
import { rpc } from '../shared/rpc/hook';

export function Index() {
  const r = rpc.useQuery(['authenticated.helloUser']);
  console.log(r.data);
  return <Box>Home page</Box>;
}

export default Index;
