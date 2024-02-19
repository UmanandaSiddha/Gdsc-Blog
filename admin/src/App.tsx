import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

import Header from "./components/header";
import Loader from "./components/loader";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { UserResponse } from "./types/api-types";
import axios from "axios";
import { RootState } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/protected-route";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("./pages/register"));
const NotFound = lazy(() => import("./pages/not-found"));
const Create = lazy(() => import("./pages/create"));
const Pannel = lazy(() => import("./pages/pannel"));
const Profile = lazy(() => import("./pages/profile"));
const AdminDetails = lazy(() => import("./pages/admin-details"));
const Verify = lazy(() => import("./pages/verify"));
const Forgot = lazy(() => import ("./pages/forgot"));
const Reset = lazy(() => import ("./pages/reset"));

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const { user, loading } = useSelector(
        (state: RootState) => state.userReducer
    );

    const dispatch = useDispatch();

    const gotUser = async () => {
        try {
            const { data }: { data: UserResponse } = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/me`, { withCredentials: true });
            dispatch(userExist(data.user));
        } catch (error: any) {
            dispatch(userNotExist());
        }
    }

    useEffect(() => {
        gotUser();
    }, []);

    return (
        loading ? (
            <Loader />
        ) : (
            <BrowserRouter>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Header user={user} />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home user={user} />} />
                        <Route
                            path="/login"
                            element={
                                <ProtectedRoute isAuthenticated={user ? false : true}>
                                    <Login />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/forgot"
                            element={
                                <ProtectedRoute isAuthenticated={user ? false : true}>
                                    <Forgot />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/reset"
                            element={
                                <ProtectedRoute isAuthenticated={user ? false : true}>
                                    <Reset />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <ProtectedRoute isAuthenticated={user ? false : true}>
                                    <Register />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
                        >
                            <Route path="/verify" element={<Verify />} />
                        </Route>

                        <Route
                            element={<ProtectedRoute isAuthenticated={(user?.role === "admin" || user?.role === "creator") ? true : false} />}
                        >
                            <Route path="/create" element={<Create />} />
                            <Route path="/profile" element={<Profile />} />
                        </Route>

                        {/* Only for Admin */}
                        <Route
                            element={<ProtectedRoute isAuthenticated={(user?.role === "admin") ? true : false} />}
                        >
                            <Route path="/pannel" element={<Pannel />} />
                            <Route path="/pannel/:id" element={<AdminDetails />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        )
    )
}

export default App;