import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Home = lazy(() => import ("./pages/home"));
const Blog = lazy(() => import ("./pages/blog"));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/view" element={<Blog />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;