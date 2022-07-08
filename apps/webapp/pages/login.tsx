import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { AuthForm } from '../shared/AuthForm';
import { supabasePublic } from '../shared/supabase/supabasePublic';

export default function Login() {
  const router = useRouter();
  return (
    <AuthForm
      onSubmit={({ email, password }) =>
        supabasePublic.auth.signIn({ email, password }).then(({ error }) => {
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
