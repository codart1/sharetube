import {
  AspectRatio,
  Card,
  SimpleGrid,
  SimpleGridProps,
  Text,
} from '@mantine/core';
import type { Post, Profile } from '@prisma/client';
import getVideoId from 'get-video-id';
import { useCallback, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { supabasePublic } from './supabase/supabasePublic';

export function Videos(props: SimpleGridProps) {
  const [videos] = useVideos();

  return (
    <SimpleGrid cols={2} spacing="sm" {...props}>
      {videos.map(({ id, url, title, description, author }) => {
        const videoId = getVideoId(url).id;
        if (!videoId) return null;
        return (
          <Card key={id} shadow="sm" p="md">
            <Card.Section>
              <AspectRatio ratio={16 / 9}>
                <YouTube
                  videoId={videoId}
                  opts={{ width: '100%', height: '100%' }}
                />
              </AspectRatio>
            </Card.Section>
            <Text
              sx={{ fontSize: '1.7rem' }}
              weight="bold"
              lineClamp={1}
              mt="md"
            >
              {title}
            </Text>
            <Text>
              <Text component="span" color="dimmed">
                Shared by
              </Text>{' '}
              <Text component="span" color="blue">
                {author.email}
              </Text>
            </Text>
            <Text component="p" size="sm" color="dimmed" lineClamp={3}>
              {description}
            </Text>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}

const useVideos = () => {
  const [videos, setVideos] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    supabasePublic
      .from<PostData>('Post')
      .select(`*, author:profileId (*)`)
      .limit(10)
      .order('id', { ascending: false })
      .then((v) => {
        setVideos(v.data ?? []);
        setLoading(false);
      });
  }, []);

  useEffect(load, [load]);

  useEffect(() => {
    const sub = supabasePublic
      .from<PostData>('Post')
      .on('INSERT', load)
      .subscribe();
    return () => {
      sub.unsubscribe();
    };
  }, [load]);

  return [videos, { loading }] as const;
};

type PostData = Post & { author: Profile };
