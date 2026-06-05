import { useState, useEffect } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import "./Friend.css";

const Friend = () => {
    let [request, setRequest] = useState([]);
    let [frineds, setFreinds] = useState(null);
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        getFrineds(userData?._id);
    }, []);


    const deleteFrineds = async (userId) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//deleteFriend?user=${userId}`
            axios.delete(apiUrl).then((response) => {
                if (response.data.data) {
                    getFrineds(userData?._id);
                }
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    const getFrineds = async (userId) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//get-friends?user=${userId}`
            axios.get(apiUrl).then((response) => {
                if (response.data.data) {
                    setFreinds(response.data.data);
                }
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return <div className="row h-100 p-3 m-0 d-flex flex-row flex-wrap" style={{ gap: 20, overflowY: "scroll" }}>
        {frineds?.length > 0 ? frineds?.map((ele, i) => {
            return <div key={i} style={{ height: 150, width: "35%" }} className="bg-light rounded border border-5 shadow p-3 mt-3 row m-0">
                <p className="h4">Name: {userData?._id == ele?.friend?._id ? ele?.user?.name : ele?.friend?.name}</p>
                <p className="h4">Phone: {userData?._id == ele?.friend?._id ? ele?.user?.phone : ele?.friend?.phone}</p>
                <Button variant="danger" onClick={() => {
                    deleteFrineds(userData?._id == ele?.friend?._id ? ele?.user?._id : ele?.friend?._id)
                }}>Unfriend</Button>
            </div>
        }) : <p className="display-3 text-center">No User Found</p>}
    </div>


}

export default Friend;
