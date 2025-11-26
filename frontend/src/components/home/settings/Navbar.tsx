import type React from "react";
import { TABS } from "../Settings"

type TabTypes = keyof typeof TABS;

interface NavbarProps {
    activeTabs: TabTypes;
    setActiveTabs: React.Dispatch<React.SetStateAction<TabTypes>>;
}

const Navbar: React.FC<NavbarProps> = ({ activeTabs, setActiveTabs }) => {
    const handleSwitchTabs = (e: TabTypes) => {
        setActiveTabs(e);
    }

    return (
        <div className="border w-9/12 flex rounded-xl">
            <div className={`w-1/3 text-center p-2 cursor-pointer hover:bg-gray-300 rounded-l-xl ${activeTabs === TABS.EMPLOYEE && "bg-gray-200"}`} onClick={() => handleSwitchTabs(TABS.EMPLOYEE)}>Employee</div>
            <div className={`w-1/3 text-center p-2 cursor-pointer hover:bg-gray-300 ${activeTabs === TABS.CATEGORY && "bg-gray-200"}`} onClick={() => handleSwitchTabs(TABS.CATEGORY)}>Category</div>
            <div className={`w-1/3 text-center p-2 cursor-pointer hover:bg-gray-300 rounded-r-xl ${activeTabs === TABS.ITEM && "bg-gray-200"}`} onClick={() => handleSwitchTabs(TABS.ITEM)}>Item</div>
        </div>
    )
}

export default Navbar