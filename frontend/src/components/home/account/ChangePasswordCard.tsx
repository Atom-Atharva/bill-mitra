import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/apis/changePassword";

const ChangePasswordCard = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: changePassword,
        onSuccess: () => {
            setNewPassword("");
            setConfirmPassword("");
            setPasswordError("");
        },
    });

    const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError("");

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        }

        mutate({ newPassword });
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
                <LockIcon className="text-blue-600" fontSize="large" />
                <h2 className="text-xl font-bold text-gray-800">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordChange} className="">
                <TextField
                    required
                    id="new-password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    helperText="Password must be at least 8 characters"
                />

                <TextField
                    required
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                />

                {passwordError && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-3 mt-4">
                        <p className="text-sm font-medium text-red-800">{passwordError}</p>
                    </div>
                )}

                {isError && (
                    <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-3 mt-4">
                        <p className="text-sm font-medium text-red-800">{(error as Error).message}</p>
                    </div>
                )}

                {isSuccess && (
                    <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-3 mt-4">
                        <p className="text-sm font-medium text-green-800">Password changed successfully!</p>
                    </div>
                )}

                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        loading={isPending}
                        disabled={isPending}
                        fullWidth
                        size="large"
                    >
                        {isPending ? "Changing Password..." : "Change Password"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordCard;
