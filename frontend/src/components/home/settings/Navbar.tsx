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
        <div className="bg-white w-9/12 flex rounded-xl shadow-md border border-gray-200 p-1 gap-1">
            <div
                className={`w-1/3 text-center py-3 px-4 cursor-pointer rounded-lg font-medium transition-all duration-200 ${activeTabs === TABS.EMPLOYEE
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                onClick={() => handleSwitchTabs(TABS.EMPLOYEE)}
            >
                Employee
            </div>
            <div
                className={`w-1/3 text-center py-3 px-4 cursor-pointer rounded-lg font-medium transition-all duration-200 ${activeTabs === TABS.CATEGORY
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                onClick={() => handleSwitchTabs(TABS.CATEGORY)}
            >
                Category
            </div>
            <div
                className={`w-1/3 text-center py-3 px-4 cursor-pointer rounded-lg font-medium transition-all duration-200 ${activeTabs === TABS.ITEM
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                onClick={() => handleSwitchTabs(TABS.ITEM)}
            >
                Item
            </div>
        </div>
    )
}

export default Navbar