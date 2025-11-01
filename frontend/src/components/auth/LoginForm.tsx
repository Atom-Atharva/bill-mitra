import Button from "@mui/material/Button";
import FormHeadTag from "./FormHeadTag";
import TextField from "@mui/material/TextField"
import { Link } from "@tanstack/react-router";

const LoginForm = () => {
    const heading = "Welcome Back!";
    const body = "Make bills faster, track customer payments, and stay organized.";
    return (
        <div className="w-1/3 h-7/12 bg-white rounded-md">
            <FormHeadTag heading={heading} body={body} />
            <hr className="border-0 h-[1.5px] bg-linear-to-r from-transparent via-gray-400 to-transparent" />

            <form className="flex flex-col gap-4 m-8 items-center">
                <TextField id="user-email" label="User Email" variant="outlined" className="w-3/4" />
                <TextField id="user-password" label="User Password" type="password" variant="outlined" className="w-3/4" />
                <Button variant="contained" className="w-3/4">LOGIN</Button>
            </form>

            <p className="text-center text-xs">New to Billmitra, Click to <Link to="/auth/register" className="text-blue-600 underline transition-all font-semibold duration-300 ease-in-out hover: hover:text-blue-900">Register</Link> </p>
        </div>
    );
};

export default LoginForm;
