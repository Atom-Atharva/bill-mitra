import BackgroundImage from '@/components/auth/BackgroundImage';
import RegisterForm from '@/components/auth/RegisterForm';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const url = "/images/register_bg.jpeg";
  return (
    <BackgroundImage imgUrl={url} >
      <RegisterForm />
    </BackgroundImage>
  );
}
