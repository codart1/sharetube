import {
    Box, Button, Group,
    PasswordInput, TextInput
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }),
  age: z
    .number()
    .min(18, { message: 'You must be at least 18 to create an account' }),
});

export default function Login() {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Box>
  );
}
