import { noti } from '@sharetube/notification';
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
            return noti.show('error', error.message);
          }
          router.push('/');
          noti.show('success', 'You have been signed in');
        })
      }
      type="login"
    />
  );
}
