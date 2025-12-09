import type React from "react";
import { TABS } from "./EmployeeTab";

type TabType = keyof typeof TABS;

interface BarProps {
    activeTabs: TabType;
    setActiveTabs: React.Dispatch<React.SetStateAction<TabType>>;
}

const ToggleBar: React.FC<BarProps> = ({ activeTabs, setActiveTabs }) => {
    const handleClick = (e: TabType) => {
        setActiveTabs(e);
    }

    return (
        <div className='flex bg-gray-100 p-2 gap-2 border-b border-gray-200'>
            <div
                className={`w-1/2 py-3 px-4 text-center cursor-pointer rounded-lg font-medium transition-all duration-200 ${activeTabs === TABS.MANAGE
                        ? "bg-white text-blue-600 shadow-sm"
                        : "bg-transparent text-gray-600 hover:text-gray-900"
                    }`}
                onClick={() => handleClick(TABS.MANAGE)}
            >
                Manage Employees
            </div>
            <div
                className={`w-1/2 py-3 px-4 text-center cursor-pointer rounded-lg font-medium transition-all duration-200 ${activeTabs === TABS.ONBOARD
                        ? "bg-white text-blue-600 shadow-sm"
                        : "bg-transparent text-gray-600 hover:text-gray-900"
                    }`}
                onClick={() => handleClick(TABS.ONBOARD)}
            >
                Onboard New Employee
            </div>
        </div>
    )
}
export default ToggleBar