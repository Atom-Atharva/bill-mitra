import TextField from "@mui/material/TextField";
import FormHeadTag from "./FormHeadTag";
import Button from "@mui/material/Button";
import { Link } from "@tanstack/react-router";

const RegisterForm = () => {
    const heading = "Register Your Store";
    const body = "Let’s get your store ready for seamless customer billing.";
    return (
        <div className="w-1/3 h-3/4 bg-white rounded-md">
            <FormHeadTag heading={heading} body={body} />
            <hr className="border-0 h-[1.5px] bg-linear-to-r from-transparent via-gray-400 to-transparent" />

            <form className="flex flex-col gap-4 m-8 items-center">
                <TextField id="store-name" label="Store Name" variant="outlined" className="w-3/4" />
                <TextField id="user-name" label="User Name" variant="outlined" className="w-3/4" />
                <TextField id="user-email" label="User Email" variant="outlined" className="w-3/4" />
                <TextField id="user-password" label="User Password" type="password" variant="outlined" className="w-3/4" />
                <Button variant="contained" className="w-3/4">Register</Button>
            </form>

            <p className="text-center text-xs">Already have a store, Click to <Link to="/auth/login" className="text-blue-600 underline transition-all font-semibold duration-300 ease-in-out hover: hover:text-blue-900">Login</Link> </p>
        </div>
    );
}

export default RegisterForm