import { Route, Routes } from "react-router-dom";
import { FullPageLayout } from "../layouts/FullPageLayout";
import Home from "../pages/Home";
import { DefaultLayout } from "../layouts/DefaultLayout";
import About from "../pages/About";
import AdoptionPage from "../pages/Adoption";
import Signup from "../pages/Signup";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<FullPageLayout />}>
                <Route element={<DefaultLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/adoption" element={<AdoptionPage />} />
                    <Route path="/signup" element={<Signup />} /> {/* Nova rota */}
                </Route>
            </Route>
        </Routes>
    );
};
