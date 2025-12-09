import { useState } from "react"
import ToggleBar from "./ToggleBar"
import ManageEmployeeTab from "./ManageEmployeeTab";
import OnboardTab from "./OnboardTab";

export const TABS = {
    MANAGE: "MANAGE",
    ONBOARD: "ONBOARD"
} as const;

type TabTypes = keyof typeof TABS;

const EmployeeTab = () => {
    const [activeTabs, setActiveTabs] = useState<TabTypes>(TABS.MANAGE)

    return (
        <div className="h-full w-full rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden">
            <ToggleBar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

            <div>
                {activeTabs === TABS.MANAGE && <ManageEmployeeTab />}
                {activeTabs === TABS.ONBOARD && <OnboardTab />}
            </div>
        </div>
    )
}

export default EmployeeTab