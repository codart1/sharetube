import { showNotification } from '@mantine/notifications';
import { Check, ExclamationMark } from 'tabler-icons-react';
import { AuthForm } from '../shared/AuthForm';
import { rpc } from '../shared/rpc/hook';
import { supabasePublic } from '../shared/supabase/supabasePublic';

export default function Register() {
  const { mutateAsync: bindProfile } = rpc.useMutation('public.bindProfile');

  return (
    <AuthForm
      onSubmit={async ({ email, password }) => {
        const { error, user } = await supabasePublic.auth.signUp({
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
