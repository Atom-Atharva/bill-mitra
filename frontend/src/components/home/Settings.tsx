import { useState } from "react"
import CategoryTab from "./settings/CategoryTab"
import EmployeeTab from "./settings/EmployeeTab"
import ItemsTab from "./settings/ItemsTab"
import Navbar from "./settings/Navbar"

export const TABS = {
    EMPLOYEE: "EMPLOYEE",
    CATEGORY: "CATEGORY",
    ITEM: "ITEM"
} as const;

type TabTypes = keyof typeof TABS;

const Settings = () => {
    const [activeTabs, setActiveTabs] = useState<TabTypes>(TABS.EMPLOYEE);

    return (
        <div className="w-full h-full flex flex-col items-center p-8 gap-6 bg-gray-50">
            <Navbar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

            {activeTabs === TABS.ITEM && <ItemsTab />}
            {activeTabs === TABS.EMPLOYEE && <EmployeeTab />}
            {activeTabs === TABS.CATEGORY && <CategoryTab />}
        </div>
    )
}

export default Settings