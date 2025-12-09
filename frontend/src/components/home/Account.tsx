import ProfileCard from "./account/ProfileCard";
import ChangePasswordCard from "./account/ChangePasswordCard";

const Account = () => {
    return (
        <div className="h-full w-full p-6 overflow-y-auto">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Account</h1>
                <p className="text-gray-600 mt-1">Manage your profile and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProfileCard />
                <ChangePasswordCard />
            </div>
        </div>
    );
};

export default Account;