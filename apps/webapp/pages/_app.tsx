import { AppProps } from 'next/app';
import Head from 'next/head';
import { AppShell, Header, MantineProvider } from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
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
        <AppShell
          padding="md"
          header={
            <Header height={60} p="xs">
              ShareTube
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
          <Component {...pageProps} />
        </AppShell>
      </MantineProvider>
    </>
  );
}
