import TextField from "@mui/material/TextField";
import FormHeadTag from "./FormHeadTag";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { registerStoreAndUser } from "@/apis/registerStoreAndUser";

const RegisterForm = () => {
    const heading = "Register Your Store";
    const body = "Let’s get your store ready for seamless customer billing.";

    const [storeName, setStoreName] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: registerStoreAndUser,

        onSuccess: () => {
            navigate({ to: "/home" });
        }
    })

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirmPassword !== userPassword) {
            return setFormError("Password does not match Confirm Password.");
        }

        mutate({ storeName, userName, email: userEmail, password: userPassword, remember: checked })
    }


    return (
        <div className="w-1/3 bg-white rounded-md">
            <FormHeadTag heading={heading} body={body} />
            <hr className="border-0 h-[1.5px] bg-linear-to-r from-transparent via-gray-400 to-transparent" />

            <form className="flex flex-col m-8 items-center" onSubmit={handleRegister}>
                <div className="w-3/4 flex flex-col gap-3">
                    <div className="flex gap-2">
                        <TextField required id="store-name" label="Store Name" variant="outlined" className="w-full" value={storeName} onChange={e => setStoreName(e.target.value)} />
                        <TextField required id="user-name" label="User Name" variant="outlined" className="w-full" value={userName} onChange={e => setUserName(e.target.value)} />
                    </div>
                    <TextField required id="user-email" label="User Email" variant="outlined" className="w-full" value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                    <TextField required id="user-password" label="User Password" type="password" variant="outlined" className="w-full" value={userPassword} onChange={e => setUserPassword(e.target.value)} />
                    <TextField required id="confirm-password" label="Confirm Password" type="password" variant="outlined" className="w-full" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>

                <FormControlLabel control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />} label="Remember Me" className="w-3/4" />

                {
                    (isError || formError) && <div className="w-3/4 mb-2">
                        <p className="text-error text-sm">{(error as Error)?.message || formError}</p>
                    </div>
                }

                <Button loading={isPending} type="submit" variant="contained" className="w-3/4">Register</Button>
            </form>

            <p className="text-center text-xs my-4">Already have a store, Click to <Link to="/auth/login" className="text-blue-600 underline transition-all font-semibold duration-300 ease-in-out hover: hover:text-blue-900">Login</Link> </p>
        </div>
    );
}

export default RegisterForm