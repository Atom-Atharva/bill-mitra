import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/apis/logoutUser';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { removeUser } from '@/store/userSlice';

export const TABS = {
    STORE: "STORE",
    ACCOUNT: "ACCOUNT",
    SETTINGS: "SETTINGS",
} as const;

type TabTypes = keyof typeof TABS;

interface SidebarProps {
    activeTabs: TabTypes;
    setActiveTabs: React.Dispatch<React.SetStateAction<TabTypes>>;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTabs, setActiveTabs }) => {
    const [isExtended, setExtended] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    const expandMenu = () => {
        setExtended(!isExtended);
    };

    const { mutate, isPending } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            dispatch(removeUser());
        }
    })

    const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (isPending) return;
        mutate();
    }

    const handleSwitchTabs = (e: TabTypes) => {
        setActiveTabs(e);
    }

    return (
        <div
            className={`
                h-screen border-r flex flex-col justify-between
                transition-all duration-300
                ${isExtended ? "w-2/12" : "w-1/24"}
            `}
        >
            <div>
                <div className={`group flex p-2 hover:bg-gray-400 transition-all duration-300 cursor-pointer ${isExtended ? "bg-gray-300" : "bg-white"}`} onClick={expandMenu}>
                    <MenuIcon
                        fontSize="large"
                        className="transition-all duration-300 group-hover:text-white"
                    />
                </div>

                <div className='flex flex-col border-t border-neutral-400'>
                    <div className={`flex items-center cursor-pointer gap-2 p-2 transition-all duration-300 hover:bg-gray-300 ${activeTabs === TABS.STORE && "bg-gray-200"}`}
                        onClick={() => handleSwitchTabs(TABS.STORE)}>
                        <StoreIcon fontSize="large" color="primary" />
                        {isExtended && <span>Store</span>}
                    </div>
                    <div className={`flex items-center cursor-pointer gap-2 p-2 transition-all duration-300 hover:bg-gray-300 ${activeTabs === TABS.ACCOUNT && "bg-gray-200"}`}
                        onClick={() => handleSwitchTabs(TABS.ACCOUNT)}>
                        <ManageAccountsIcon fontSize="large" color="primary" />
                        {isExtended && <span>Account</span>}
                    </div>
                    {
                        (user?.role === "MANAGER" || user?.role === "OWNER") &&
                        <div className={`flex items-center cursor-pointer gap-2 p-2 transition-all duration-300 hover:bg-gray-300 ${activeTabs === TABS.SETTINGS && "bg-gray-200"}`}
                            onClick={() => handleSwitchTabs(TABS.SETTINGS)}
                        >
                            <SettingsIcon fontSize="large" color="primary" />
                            {isExtended && <span>Settings</span>}
                        </div>
                    }
                </div>
            </div>

            <div
                className={`
                            group flex flex-col border-t border-neutral-400 py-2 transition-all duration-300 
                            ${!isPending ? "hover:bg-red-500 hover:text-white cursor-pointer" : "opacity-60 cursor-not-allowed"}
                        `}
                onClick={handleLogout}
            >
                <div className="flex items-center gap-3 px-2">
                    {!isPending ?
                        <>
                            <LogoutIcon
                                fontSize="large"
                                className="text-red-600 transition-all duration-300 group-hover:text-white"
                            />
                            {isExtended && (
                                <span className='text-lg transition-all duration-300'>
                                    Logout
                                </span>
                            )}
                        </>
                        :
                        <>
                            <CircularProgress size="2rem" color='error' />
                            {isExtended && (
                                <span className='text-lg transition-all duration-300'>
                                    Loading...
                                </span>
                            )}
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
