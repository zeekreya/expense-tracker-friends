import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
    return (
        <div className="main-layout-wrapper min-vh-100 w-100 d-flex flex-column">
            <Header />
            <main className="flex-grow-1 w-100 p-3 p-md-4 main-content-area">
                <div className="container-fluid max-w-7xl mx-auto h-100">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;