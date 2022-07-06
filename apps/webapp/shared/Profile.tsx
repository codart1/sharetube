import { Avatar, Text, Group, Popover, Button, Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { supabase } from '@sharetube/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export function Profile() {
  const [session, setSession] = useState<Session | null>();
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.client.auth.session());

    const sub = supabase.client.auth.onAuthStateChange((_, session) =>
      setSession(session)
    );

    return () => {
      sub.data?.unsubscribe();
    };
  }, []);

  return session?.user?.email ? (
    <Group>
      <Menu target={<Avatar radius="xl" />} />
      <Text>{session.user.email}</Text>
    </Group>
  ) : (
    router.pathname !== '/login' && (
      <Button onClick={() => router.push('/login')}>Login</Button>
    )
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
          supabase.client.auth.signOut().then(() =>
            showNotification({
              message: 'You have been signed out',
              color: 'blue',
            })
          );
        }}
      >
        Logout
      </Button>
    </Popover>
  );
};
