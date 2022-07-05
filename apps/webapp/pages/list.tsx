import { Box, Card, SimpleGrid, Title, Text, AspectRatio } from '@mantine/core';
import YouTube from 'react-youtube';

const mockItems = [];

export default function List() {
  return (
    <SimpleGrid cols={2} spacing="sm">
      {[...Array(12)].map((_, i) => {
        return (
          <Card key={i} shadow="sm" p="md">
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <YouTube
                  videoId="fifkHowAkVE"
                  opts={{ width: '100%', height: '100%' }}
                />
              </AspectRatio>
            </Card.Section>
            <Title order={1} mt="md">
              Mock video title
            </Title>
            <Text>
              <Text component="span" color="dimmed">
                Shared by
              </Text>{' '}
              <Text component="span" color="blue">
                someone@gmail.com
              </Text>
            </Text>
            <Text component="p" size="sm" color="dimmed" lineClamp={3}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
