import { noti } from '@sharetube/notification';
import { useRouter } from 'next/router';
import { AuthForm } from '../shared/AuthForm';
import { rpc } from '../shared/rpc/hook';
import { supabasePublic } from '../shared/supabase/supabasePublic';

export default function Register() {
  const { mutateAsync: bindProfile } = rpc.useMutation('public.bindProfile');
  const router = useRouter();

  return (
    <AuthForm
      onSubmit={async ({ email, password }) => {
        const { error, user } = await supabasePublic.auth.signUp({
          email,
          password,
        });

        if (error || !user) {
          return noti.show('error', error.message);
        }

        const profile = await bindProfile({ email, id: user.id });

        noti.show('success', 'Your account was created.');
        router.push('/');
      }}
      type="register"
    />
  );
}
