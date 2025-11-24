import BackgroundImage from '@/components/auth/BackgroundImage';
import RegisterForm from '@/components/auth/RegisterForm';
import type { RootState } from '@/store/store';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate({ to: "/home" })
    }
  }, [])

  const url = "/images/register_bg.jpeg";
  return (
    <BackgroundImage imgUrl={url} >
      <RegisterForm />
    </BackgroundImage>
  );
}
