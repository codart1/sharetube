import { noti } from '@sharetube/notification';
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
          return noti.show('error', error.message);
        }

        const profile = await bindProfile(user.id);

        noti.show('success', 'Your account was created.');
      }}
      type="register"
    />
  );
}
