import { supabase } from '@sharetube/supabase';
import { AuthForm } from '../shared/AuthForm';

export default function Register() {
  return (
    <AuthForm
      onSubmit={async ({ email, password }) => {
        const user = await supabase.client.auth.signUp({ email, password });
        console.log('Registered', user);
      }}
      type="register"
    />
  );
}
