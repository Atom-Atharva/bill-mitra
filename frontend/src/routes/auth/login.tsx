import BackgroundImage from "@/components/auth/BackgroundImage";
import LoginForm from "@/components/auth/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
    component: RouteComponent,
});

function RouteComponent() {
    const url = "/images/login_bg.jpeg";
    return (
        <BackgroundImage imgUrl={url} >
            <LoginForm />
        </BackgroundImage>
    );
}
