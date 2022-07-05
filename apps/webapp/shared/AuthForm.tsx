import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

export function AuthForm({
  onSubmit,
  type,
}: {
  onSubmit: (values: z.infer<typeof schema>) => void;
  type: 'login' | 'register';
}) {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues,
  });

  return (
    <Box
      component="form"
      sx={{ maxWidth: 440 }}
      mx="auto"
      onSubmit={form.onSubmit(onSubmit)}
    >
      <Title order={1} my="md">
        Register
      </Title>
      <TextInput
        required
        label="Email"
        placeholder="example@mail.com"
        {...form.getInputProps('email')}
      />
      <PasswordInput
        required
        label="Password"
        mt="sm"
        {...form.getInputProps('password')}
      />

      <Group position="right" mt="xl">
        <Button type="submit">{type === 'login' ? 'Login' : 'Register'}</Button>
      </Group>
    </Box>
  );
}

const schema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, 'Password must have more than 6 characters'),
});

const initialValues = {
  email: '',
  password: '',
};
