import type React from "react";
import { TABS } from "./EmployeeTab";

type TabType = keyof typeof TABS;

interface BarProps {
    activeTabs: TabType;
    setActiveTabs: React.Dispatch<React.SetStateAction<TabType>>;
}

const ToggleBar: React.FC<BarProps> = ({activeTabs, setActiveTabs}) => {
    const handleClick = (e: TabType)=>{
        setActiveTabs(e);
    }

    return (
        <div className='flex border-b'>
            <div className={`w-1/2 p-2 text-center cursor-pointer hover:bg-gray-300 rounded-tl-xl ${activeTabs===TABS.MANAGE && "bg-gray-200"}`} onClick={()=>handleClick(TABS.MANAGE)}>Manage Employees</div>
            <div className={`w-1/2 p-2 text-center cursor-pointer hover:bg-gray-300 rounded-tr-xl ${activeTabs===TABS.ONBOARD && "bg-gray-200"}`} onClick={()=>handleClick(TABS.ONBOARD)}>Onboard New Employee</div>
        </div>
    )
}
export default ToggleBar