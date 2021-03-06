import { Avatar, Box, Button, Group, Popover, Text } from '@mantine/core';
import { noti } from '@sharetube/notification';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Plus } from 'tabler-icons-react';
import { supabasePublic } from './supabase/supabasePublic';

export function Profile() {
  const [session, setSession] = useState<Session | null>();
  const router = useRouter();

  useEffect(() => {
    setSession(supabasePublic.auth.session());

    const sub = supabasePublic.auth.onAuthStateChange((_, session) =>
      setSession(session)
    );

    return () => {
      sub.data?.unsubscribe();
    };
  }, []);

  return session?.user?.email ? (
    <Group>
      <Button onClick={() => router.push('/post/create')} leftIcon={<Plus />} px="sm">
        Video
      </Button>
      <Menu target={<Avatar radius="xl" />} />
      <Text>{session.user.email}</Text>
    </Group>
  ) : !['/login', '/register'].includes(router.pathname) ? (
    <Group>
      <Button onClick={() => router.push('/login')}>Login</Button>
      <Button variant="light" onClick={() => router.push('/register')}>
        Register
      </Button>
    </Group>
  ) : (
    <></>
  );
}

const Menu = ({ target }: { target: React.ReactNode }) => {
  const [opened, setOpened] = useState(false);

  const toggle = () => setOpened((prev) => !prev);

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      target={
        <Box sx={{ cursor: 'pointer' }} onClick={toggle}>
          {target}
        </Box>
      }
      position="bottom"
      withArrow
      trapFocus={false}
    >
      <Button
        onClick={() => {
          supabasePublic.auth
            .signOut()
            .then(() => noti.show('info', 'You have been signed out'));
        }}
      >
        Logout
      </Button>
    </Popover>
  );
};
