import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useState } from "react";
import { userExist } from "../redux/reducer/userReducer";
import Loader from "../components/loader";
import axios from "axios";

const Verify = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search] = useSearchParams();
    const token = search.get("token");
    const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

    const handleVerify = async () => {
        setVerifyLoading(true);
        if (token) {
            try {
                const { data }: { data: any } = await axios.put(`${import.meta.env.VITE_BASE_URL}/user/verify/${token}`, { withCredentials: true });
                dispatch(userExist(data.user));
                toast.success("User Verified!");
                navigate("/profile");
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
        setVerifyLoading(false);
    }

    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {token ? (
                    <button 
                        onClick={handleVerify} 
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        disabled={verifyLoading}
                    >
                        {verifyLoading ? "Verifying..." : "Click here to verify"}
                    </button>
                ) : (
                    <Loader />
                )}
            </div>
        </main>
    )
}

export default Verify;