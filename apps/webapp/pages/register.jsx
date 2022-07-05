import { showNotification } from '@mantine/notifications';
import { supabase } from '@sharetube/supabase';
import { AuthForm } from '../shared/AuthForm';
import { ExclamationMark, Check } from 'tabler-icons-react';

export default function Register() {
  return (
    <AuthForm
      onSubmit={async ({ email, password }) => {
        const { error } = await supabase.client.auth.signUp({
          email,
          password,
        });
        if (error) {
          return showNotification({
            message: error.message,
            title: 'Oops!',
            color: 'red',
            icon: <ExclamationMark />,
          });
        }
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
