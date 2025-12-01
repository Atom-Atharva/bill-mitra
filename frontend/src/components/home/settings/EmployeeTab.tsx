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
        <div className="h-full w-full rounded-xl border">
            <ToggleBar activeTabs={activeTabs} setActiveTabs={setActiveTabs} />

            <div className="p-4">
                {activeTabs === TABS.MANAGE && <ManageEmployeeTab />}
                {activeTabs === TABS.ONBOARD && <OnboardTab />}
            </div>
        </div>
    )
}

export default EmployeeTab