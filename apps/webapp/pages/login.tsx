import { AuthForm } from '../shared/AuthForm';

export default function Login() {
  return <AuthForm onSubmit={console.log} type="login" />;
}
