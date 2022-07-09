import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  AppShell,
  Container,
  Group,
  Header,
  MantineProvider,
  Text,
} from '@mantine/core';
import { NotificationsProvider } from '@sharetube/notification';
import { Profile } from '../shared/Profile';
import { withRPC } from '../shared/rpc/hoc';
import { useRouter } from 'next/router';

export default withRPC(
  // @ts-expect-error ignore
  process.env.NX_RPC_URL
)(App);

function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  return (
    <>
      <Head>
        <title>ShareTube</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NotificationsProvider>
          <AppShell
            padding="md"
            header={
              <Header height={60} p="xs">
                <Container size="lg">
                  <Group position="apart">
                    <Group
                      sx={{ cursor: 'pointer' }}
                      onClick={() => router.push('/')}
                    >
                      <Logo />
                      <Text>ShareTube</Text>
                    </Group>
                    <Profile />
                  </Group>
                </Container>
              </Header>
            }
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            fixed
          >
            <Container size="lg">
              <Component {...pageProps} />
            </Container>
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

const Logo = () => (
  <svg height="40" viewBox="0 0 497 497" width="40">
    <path
      d="M248.5 0v497C385.743 497 497 385.743 497 248.5S385.743 0 248.5 0z"
      fill="#3b88f5"
    />
    <path
      d="M467 248.5C467 111.257 369.174 0 248.5 0 111.257 0 0 111.257 0 248.5S111.257 497 248.5 497C369.174 497 467 385.743 467 248.5z"
      fill="#28abfa"
    />
    <path
      d="M376.978 222.511c0-.01-170.201-98.276-170.201-98.276a30.182 30.182 0 0 0-17.1-3.951l-.005 256.432a30.14 30.14 0 0 0 17.096-3.956l170.21-98.271C385.955 269.304 392 259.611 392 248.5s-6.045-20.804-15.022-25.989z"
      fill="#c4f3ff"
    />
    <path
      d="M348.935 274.489C356.742 269.304 362 259.611 362 248.5s-5.258-20.804-13.065-25.989c0-.01-148.026-98.276-148.026-98.276-3.439-2.278-7.288-3.626-11.233-3.951a29.837 29.837 0 0 0-12.927 3.942c-9.623 5.556-14.994 15.638-14.996 26.004-.009.005-.009 196.537-.009 196.537.011 10.371 5.382 20.453 15.005 26.009a29.832 29.832 0 0 0 12.922 3.941c3.945-.325 7.793-1.675 11.23-3.956z"
      fill="#fff"
    />
  </svg>
);
