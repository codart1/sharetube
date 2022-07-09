import {
  Box,
  Button,
  Group,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { z } from 'zod';
import { createPostSchema } from './validationSchemas/createPost';

export function CreatePostForm({
  onSubmit,
}: {
  onSubmit: (values: z.infer<typeof createPostSchema>) => Promise<unknown>;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    schema: zodResolver(createPostSchema),
    initialValues: initialValues,
  });

  return (
    <Box
      component="form"
      sx={{ maxWidth: 440 }}
      mx="auto"
      onSubmit={form.onSubmit((values) => {
        setLoading(true);
        return onSubmit(values).finally(() => setLoading(false));
      })}
    >
      <Title order={1} my="md">
        Post New Video
      </Title>
      <Stack>
        <TextInput
          required
          label="Title"
          placeholder="My awesome video"
          {...form.getInputProps('title')}
        />
        <TextInput
          required
          label="URL"
          placeholder="https://www.youtube.com/watch?v=IhYls-DCVVM"
          {...form.getInputProps('videoUrl')}
        />
        <Textarea
          required
          label="Description"
          placeholder="This is optionally..."
          autosize
          minRows={6}
          {...form.getInputProps('description')}
        />
      </Stack>

      <Group position="right" mt="xl">
        <Button type="submit" loading={loading} disabled={loading}>
          Submit
        </Button>
      </Group>
    </Box>
  );
}

const initialValues: z.infer<typeof createPostSchema> = {
  title: '',
  description: '',
  videoUrl: '',
};
