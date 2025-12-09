import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/apis/registerUser";
import { useDispatch } from "react-redux";
import { addAllEmployees } from "@/store/employeeSlice";
import { fetchAllEmployees } from "@/apis/fetchAllEmployees";

const OnboardTab = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"EMPLOYEE" | "MANAGER">("EMPLOYEE");
    const dispatch = useDispatch();

    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: registerUser,

        onSuccess: async () => {
            // Clear form on success
            setName("");
            setEmail("");
            setPassword("");
            setRole("EMPLOYEE");

            // Refetch employees to update the table
            try {
                const fetchedEmployees = await fetchAllEmployees();
                if (fetchedEmployees) {
                    dispatch(addAllEmployees(fetchedEmployees));
                }
            } catch (e) {
                console.error("Failed to refetch employees after registration:", e);
            }
        }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        email.toLowerCase();
        mutate({ name, email, password, role });
    };

    return (
        <div className="h-full overflow-y-auto p-6 flex justify-center">
            <div className="w-full">
                {/* Header Section */}
                <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Onboard New Employee</h2>
                    <p className="text-sm text-gray-500 mt-1">Create a new user account for your store team</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                required
                                id="user-name"
                                label="Full Name"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />

                            <TextField
                                required
                                id="user-email"
                                label="Email Address"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                            />

                            <div className="flex gap-4">
                                <TextField
                                    required
                                    id="user-password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                />

                                <FormControl fullWidth required>
                                    <InputLabel id="role-label">Role</InputLabel>
                                    <Select
                                        labelId="role-label"
                                        id="user-role"
                                        value={role}
                                        label="Role"
                                        onChange={(e) => setRole(e.target.value as "EMPLOYEE" | "MANAGER")}
                                    >
                                        <MenuItem value="EMPLOYEE">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">EMPLOYEE</span>
                                            </div>
                                        </MenuItem>
                                        <MenuItem value="MANAGER">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">MANAGER</span>
                                            </div>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            {isError && (
                                <div className="bg-red-50 border-l-4 border-red-500 rounded-md p-4">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-red-800">{(error as Error).message}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isSuccess && (
                                <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-4">
                                    <div className="flex items-start">
                                        <div className="shrink-0">
                                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">User registered successfully!</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    loading={isPending}
                                    disabled={isPending}
                                    fullWidth
                                    size="large"
                                    className="mt-2"
                                >
                                    {isPending ? "Creating Account..." : "Create Employee Account"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardTab;