import Button from "@mui/material/Button";
import FormHeadTag from "./FormHeadTag";
import TextField from "@mui/material/TextField"
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/apis/loginUser";

const LoginForm = () => {
    const heading = "Welcome Back!";
    const body = "Make bills faster, track customer payments, and stay organized.";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: loginUser,

        onSuccess: (data) => {
            console.log("Logged in", data);
        }
    })

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent Page Refresh
        e.preventDefault();

        mutate({ email, password, remember: checked });

    }

    return (
        <div className="w-1/3 bg-white rounded-md">
            <FormHeadTag heading={heading} body={body} />
            <hr className="border-0 h-[1.5px] bg-linear-to-r from-transparent via-gray-400 to-transparent" />

            <form className="flex flex-col m-8 items-center" onSubmit={handleLogin}>
                <div className="w-3/4 gap-3 flex flex-col">
                    <TextField required id="user-email" label="User Email" variant="outlined" className="w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField required id="user-password" label="User Password" type="password" variant="outlined" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <FormControlLabel control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />} label="Remember Me" className="w-3/4" />

                {
                    (isError) && <div className="w-3/4 mb-2">
                        <p className="text-error text-sm">{(error as Error).message}</p>
                    </div>
                }

                <Button loading={isPending} type="submit" variant="contained" className="w-3/4">LOGIN</Button>
            </form >

            <p className="text-center text-xs my-4">New to Billmitra, Click to <Link to="/auth/register" className="text-blue-600 underline transition-all font-semibold duration-300 ease-in-out hover: hover:text-blue-900">Register</Link> </p>
        </div >
    );
};

export default LoginForm;
