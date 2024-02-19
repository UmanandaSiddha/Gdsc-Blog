import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Pannel = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const gotUsers = async () => {
        try {
            const { data }: { data: any } = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/admin/users`, { withCredentials: true });
            setUsers(data.users);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        gotUsers();
    }, []);

    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                <p className="text-2xl font-semibold">All Users</p>
                {users.map((user: User, index: number) => (
                    <div onClick={() => navigate(`/pannel/${user?._id}`, {
                        state: user
                    })} key={index} className="flex flex-wrap justify-evenly items-center gap-4 py-3 my-6 rounded-xl bg-slate-400">
                        <p>{user?.name}</p>
                        <p>{user?.email}</p>
                        <p>{user?.role}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Pannel;