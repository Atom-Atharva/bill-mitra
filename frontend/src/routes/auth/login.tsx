import BackgroundImage from "@/components/auth/BackgroundImage";
import LoginForm from "@/components/auth/LoginForm";
import type { RootState } from "@/store/store";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserInfo } from "@/apis/currentUserInfo";
import { addUser } from "@/store/userSlice";

export const Route = createFileRoute("/auth/login")({
    component: RouteComponent,
});

function RouteComponent() {
    const user = useSelector((state: RootState) => state.user.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate({ to: "/home" });
            return;
        }

        const checkAuth = async () => {
            try {
                const fetchedUser = await currentUserInfo();
                if (fetchedUser) {
                    dispatch(addUser(fetchedUser as any));
                    navigate({ to: "/home" });
                }
            } catch (err) {
                // not authenticated — stay on login page
                console.log("User not authenticated.")
            }
        };

        void checkAuth();
    }, [user, navigate, dispatch])

    const url = "/images/login_bg.jpeg";
    return (
        <BackgroundImage imgUrl={url} >
            <LoginForm />
        </BackgroundImage>
    );
}
