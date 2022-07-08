import { showNotification } from '@mantine/notifications';
import { supabase } from '@sharetube/supabase';
import { AuthForm } from '../shared/AuthForm';
import { ExclamationMark, Check } from 'tabler-icons-react';
import { rpc } from '../shared/rpc/hook';

export default function Register() {
  const { mutateAsync: bindProfile } = rpc.useMutation('public.bindProfile');

  return (
    <AuthForm
      onSubmit={async ({ email, password }) => {
        const { error, user } = await supabase.client.auth.signUp({
          email,
          password,
        });

        if (error || !user) {
          return showNotification({
            message: error.message,
            title: 'Oops!',
            color: 'red',
            icon: <ExclamationMark />,
          });
        }

        const profile = await bindProfile(user.id);

        console.log({ profile });

        showNotification({
          title: 'Great!',
          message: 'Your account was created.',
          color: 'green',
          icon: <Check />,
        });
      }}
      type="register"
    />
  );
}
