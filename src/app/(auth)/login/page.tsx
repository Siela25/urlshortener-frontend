import { Metadata } from 'next';
import LoginForm from '@/components/forms/login-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your LinkShort account to access your dashboard and analytics.',
};

export default function LoginPage() {
  return <LoginForm />;
}