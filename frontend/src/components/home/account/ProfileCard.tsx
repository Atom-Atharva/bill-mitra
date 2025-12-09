import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ProfileCard = () => {
    const user = useSelector((state: RootState) => state.user.user);

    const getRoleBadgeColor = (role?: string) => {
        switch (role?.toUpperCase()) {
            case "OWNER":
                return "bg-green-100 text-green-700 border-green-300";
            case "MANAGER":
                return "bg-purple-100 text-purple-700 border-purple-300";
            case "EMPLOYEE":
                return "bg-blue-100 text-blue-700 border-blue-300";
            default:
                return "bg-gray-100 text-gray-700 border-gray-300";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <PersonIcon className="text-blue-600" fontSize="large" />
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
            </div>

            <div className="space-y-4">
                {/* ID */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <BadgeIcon className="text-gray-600 mt-1" />
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">User ID</p>
                        <p className="text-base font-semibold text-gray-900">{user?.id?.toString()}</p>
                    </div>
                </div>

                {/* Name */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <PersonIcon className="text-gray-600 mt-1" />
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Full Name</p>
                        <p className="text-base font-semibold text-gray-900">{user?.name}</p>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <EmailIcon className="text-gray-600 mt-1" />
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Email Address</p>
                        <p className="text-base font-semibold text-gray-900">{user?.email}</p>
                    </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <ManageAccountsIcon className="text-gray-600 mt-1" />
                    <div className="flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Role</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getRoleBadgeColor(user?.role)}`}>
                            {user?.role}
                        </span>
                    </div>
                </div>

                {/* Created By */}
                {user?.createdBy && (
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <PersonIcon className="text-gray-600 mt-1" />
                        <div className="flex-1">
                            <p className="text-xs font-medium text-gray-500 uppercase mb-1">Created By</p>
                            <p className="text-base font-semibold text-gray-900">{user.createdBy.username}</p>
                            <p className="text-sm text-gray-600">({user.createdBy.role})</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
