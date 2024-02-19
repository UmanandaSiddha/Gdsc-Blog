import { useState } from "react";
import { User } from "../types/types";
import { toast } from "react-toastify";
import axios from "axios";

interface PropsType {
    user: User | null;
}

const Home = ({ user }: PropsType) => {

    const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

    const handleRequestVerify = async () => {
        setVerifyLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_BASE_URL}/user/request/verification`, { withCredentials: true });
            toast.success("Email Sent  Successfully")
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
        setVerifyLoading(false);
    }

    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                Home
                {user && (
                    <>
                        {!user?.isVerified && (
                            <div className="flex flex-col justify-center items-center space-y-4">
                                <p className="text-red-600 font-semibold">You are not verified</p>
                                <button onClick={handleRequestVerify} disabled={verifyLoading}>{verifyLoading ? "Sending Email..." : "Verify Email"}</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    )
}

export default Home;