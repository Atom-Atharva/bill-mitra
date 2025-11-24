import { currentUserInfo } from '@/apis/currentUserInfo'
import Cart from '@/components/home/Cart'
import Sidebar from '@/components/home/Sidebar'
import Store from '@/components/home/Store'
import type { RootState } from '@/store/store'
import { addUser } from '@/store/userSlice'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Route = createFileRoute('/home/')({
    component: RouteComponent,
})

export interface UserProps {
    id: bigint;
    name: string;
    email: string;
    role: string;
    createdBy: {
        id: bigint;
        username: string;
        role: string;
    };
}

function RouteComponent() {
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: currentUserInfo,

        onSuccess: (user: UserProps) => {
            dispatch(addUser(user));
        },
        onError: (error: any) => {
            console.error("Unexpected error fetching user:", error);
            navigate({ to: "/auth/login" });
        }
    });

    useEffect(() => {
        // Get User Details
        if (!user) mutate()
    }, [user])

    return <div className='h-screen w-screen flex flex-row justify-between'>
        <Sidebar />
        <Store />
        <Cart />
    </div>
}
