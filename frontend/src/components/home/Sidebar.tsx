import MenuIcon from '@mui/icons-material/Menu';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import StoreIcon from '@mui/icons-material/Store';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ReceiptIcon from '@mui/icons-material/Receipt';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '@/apis/logoutUser';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { removeUser } from '@/store/userSlice';
import { removeAllCategories } from '@/store/categorySlice';
import { removeAllItems } from '@/store/itemSlice';
import { clearCart } from '@/store/cartSlice';
import { removeAllEmployees } from '@/store/employeeSlice';

export const TABS = {
    STORE: "STORE",
    ACCOUNT: "ACCOUNT",
    SETTINGS: "SETTINGS",
    ANALYSIS: "ANALYSIS",
    ORDERS: "ORDERS",
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
            dispatch(removeAllCategories())
            dispatch(removeAllItems());
            dispatch(clearCart());
            dispatch(removeAllEmployees());
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
                h-screen bg-linear-to-b from-gray-50 to-white border-r border-gray-200 shadow-lg flex flex-col justify-between
                transition-all duration-300 ease-in-out
                ${isExtended ? "w-64" : "w-20"}
            `}
        >
            <div>
                <div className={`group flex items-center justify-center p-4 hover:bg-blue-50 transition-all duration-300 cursor-pointer border-b border-gray-200 ${isExtended ? "bg-blue-50" : ""}`} onClick={expandMenu}>
                    <MenuIcon
                        fontSize="large"
                        className="text-gray-700 transition-all duration-300 group-hover:text-blue-600"
                    />
                </div>

                <div className='flex flex-col mt-4 px-2 gap-2'>
                    <div className={`flex items-center cursor-pointer gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 ${activeTabs === TABS.STORE ? "bg-blue-100 shadow-sm" : ""
                        }`}
                        onClick={() => handleSwitchTabs(TABS.STORE)}>
                        <StoreIcon fontSize="large" className={activeTabs === TABS.STORE ? "text-blue-600" : "text-gray-600"} />
                        {isExtended && <span className={`font-medium ${activeTabs === TABS.STORE ? "text-blue-700" : "text-gray-700"}`}>Store</span>}
                    </div>
                    <div className={`flex items-center cursor-pointer gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 ${activeTabs === TABS.ACCOUNT ? "bg-blue-100 shadow-sm" : ""
                        }`}
                        onClick={() => handleSwitchTabs(TABS.ACCOUNT)}>
                        <ManageAccountsIcon fontSize="large" className={activeTabs === TABS.ACCOUNT ? "text-blue-600" : "text-gray-600"} />
                        {isExtended && <span className={`font-medium ${activeTabs === TABS.ACCOUNT ? "text-blue-700" : "text-gray-700"}`}>Account</span>}
                    </div>
                    {
                        (user?.role === "MANAGER" || user?.role === "OWNER") &&
                        <div className={`flex items-center cursor-pointer gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 ${activeTabs === TABS.SETTINGS ? "bg-blue-100 shadow-sm" : ""
                            }`}
                            onClick={() => handleSwitchTabs(TABS.SETTINGS)}
                        >
                            <SettingsIcon fontSize="large" className={activeTabs === TABS.SETTINGS ? "text-blue-600" : "text-gray-600"} />
                            {isExtended && <span className={`font-medium ${activeTabs === TABS.SETTINGS ? "text-blue-700" : "text-gray-700"}`}>Settings</span>}
                        </div>
                    }
                    {
                        (user?.role === "MANAGER" || user?.role === "OWNER") &&
                        <div className={`flex items-center cursor-pointer gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 ${activeTabs === TABS.ANALYSIS ? "bg-blue-100 shadow-sm" : ""
                            }`}
                            onClick={() => handleSwitchTabs(TABS.ANALYSIS)}
                        >
                            <AnalyticsIcon fontSize="large" className={activeTabs === TABS.ANALYSIS ? "text-blue-600" : "text-gray-600"} />
                            {isExtended && <span className={`font-medium ${activeTabs === TABS.ANALYSIS ? "text-blue-700" : "text-gray-700"}`}>Analysis</span>}
                        </div>
                    }
                    {
                        (user?.role === "MANAGER" || user?.role === "OWNER") &&
                        <div className={`flex items-center cursor-pointer gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-blue-50 ${activeTabs === TABS.ORDERS ? "bg-blue-100 shadow-sm" : ""
                            }`}
                            onClick={() => handleSwitchTabs(TABS.ORDERS)}
                        >
                            <ReceiptIcon fontSize="large" className={activeTabs === TABS.ORDERS ? "text-blue-600" : "text-gray-600"} />
                            {isExtended && <span className={`font-medium ${activeTabs === TABS.ORDERS ? "text-blue-700" : "text-gray-700"}`}>Orders</span>}
                        </div>
                    }
                </div>
            </div>

            <div
                className={`
                            group flex flex-col border-t border-gray-200 mt-2 transition-all duration-300 
                            ${!isPending ? "hover:bg-red-50 cursor-pointer" : "opacity-60 cursor-not-allowed"}
                        `}
                onClick={handleLogout}
            >
                <div className="flex items-center gap-3 p-4 mx-2 my-2 rounded-lg">
                    {!isPending ?
                        <>
                            <LogoutIcon
                                fontSize="large"
                                className="text-red-500 transition-all duration-300 group-hover:text-red-600"
                            />
                            {isExtended && (
                                <span className='text-base font-medium text-red-500 transition-all duration-300 group-hover:text-red-600'>
                                    Logout
                                </span>
                            )}
                        </>
                        :
                        <>
                            <CircularProgress size="2rem" color='error' />
                            {isExtended && (
                                <span className='text-base font-medium text-gray-500'>
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
