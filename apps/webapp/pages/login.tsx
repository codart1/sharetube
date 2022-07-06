import { showNotification } from '@mantine/notifications';
import { supabase } from '@sharetube/supabase';
import { useRouter } from 'next/router';
import { AuthForm } from '../shared/AuthForm';

export default function Login() {
  const router = useRouter();
  return (
    <AuthForm
      onSubmit={({ email, password }) =>
        supabase.client.auth.signIn({ email, password }).then(({ error }) => {
          if (error) {
            return showNotification({ message: error.message, color: 'red' });
          }
          router.push('/');
          showNotification({
            message: 'You have been signed in.',
            color: 'green',
          });
        })
      }
      type="login"
    />
  );
}
