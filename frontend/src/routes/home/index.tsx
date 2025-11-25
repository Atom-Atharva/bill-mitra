import { currentUserInfo } from '@/apis/currentUserInfo'
import Account from '@/components/home/Account'
import Cart from '@/components/home/Cart'
import Settings from '@/components/home/Settings'
import Sidebar, { TABS } from '@/components/home/Sidebar'
import Store from '@/components/home/Store'
import type { RootState } from '@/store/store'
import { addUser } from '@/store/userSlice'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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

type TabTypes = keyof typeof TABS

function RouteComponent() {
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeTabs, setActiveTabs] = useState<TabTypes>(TABS.STORE);

    const { mutate } = useMutation({
        mutationFn: currentUserInfo,

        onSuccess: (user: UserProps) => {
            dispatch(addUser(user));
        },
        onError: (error: any) => {
            console.error("Unexpected error fetching user:", error);
            navigate({ to: "/" });
        }
    });

    useEffect(() => {
        // Get User Details
        if (!user) mutate();
    }, [user])

    return <div className='h-screen w-screen flex flex-row justify-between'>
        <Sidebar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />
        {activeTabs === TABS.STORE && <Store />}
        {activeTabs === TABS.ACCOUNT && <Account />}
        {activeTabs === TABS.SETTINGS && <Settings />}
        <Cart />
    </div>
}
