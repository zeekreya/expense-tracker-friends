import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = () => {
    return <div className="vh-100 vw-100">
        <Header/>
        <div style={{height: "90vh"}} className="w-100">
            <Outlet/>
        </div>
    </div>
}

export default MainLayout;