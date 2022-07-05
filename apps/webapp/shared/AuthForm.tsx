import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Title
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useMemo, useState } from 'react';
import { z } from 'zod';

export function AuthForm({
  onSubmit,
  type,
}: {
  onSubmit: (values: z.infer<typeof loginSchema>) => Promise<void>;
  type: 'login' | 'register';
}) {
  const [loading, setLoading] = useState(false);

  const typeBased = useMemo(
    () =>
      type === 'login'
        ? { type, schema: loginSchema, initialValue: loginInitialValues }
        : { type, schema: registerSchema, initialValue: registerInitialValues },
    [type]
  );

  const form = useForm({
    schema: (values) => {
      const errors = zodResolver(typeBased.schema)(values);
      if (errors['']) {
        return {
          ...errors,
          rePassword: errors[''],
        };
      }
      return errors;
    },
    initialValues: typeBased.initialValue,
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

      {type === 'register' && (
        <PasswordInput
          required
          label="Confirm password"
          mt="sm"
          // It's hard to enforce type safety here
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...form.getInputProps('rePassword' as any)}
        />
      )}

      <Group position="right" mt="xl">
        <Button type="submit" loading={loading} disabled={loading}>
          {type === 'login' ? 'Login' : 'Register'}
        </Button>
      </Group>
    </Box>
  );
}

const passwordSchema = z
  .string()
  .min(6, 'Password must have more than 6 characters');

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: passwordSchema,
});

const registerSchema = loginSchema
  .extend({
    rePassword: passwordSchema,
  })
  .refine(
    ({ password, rePassword }) => password === rePassword,
    'Passwords mismatch'
  );

const loginInitialValues = {
  email: '',
  password: '',
};

const registerInitialValues = {
  ...loginInitialValues,
  rePassword: '',
};
