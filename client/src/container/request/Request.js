import { useState, useEffect } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import axios from "axios";
import "./Request.css";

const Request = () => {
    let [request, setRequest] = useState([]);
    let [searchResult, setSearchResult] = useState(null);
    let [searchString, setSearchString] = useState("");
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        getRequests(userData?._id);
    }, []);

    const getRequests = async (userId) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//readfriend?user=${userId}`
            axios.get(apiUrl).then((response) => {
                if (response.data.data) {
                    setRequest(response.data.data);
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

    const searchUser = async (str) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//readUser?phone=${str}`
            axios.get(apiUrl).then((response) => {
                if (response.data.data) {
                    setSearchResult(response.data.data);
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

    const updateRequest = async (requestId, data) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//updatefriend?_id=${requestId}`
            axios.put(apiUrl, data).then((response) => {
                alert(response.data.message);
                if (response.data.success) {
                    getRequests(userData._id);
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

    const sendRequest = async (data) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//savefriend`
            axios.post(apiUrl, data).then((response) => {
                console.log(response.data);
                alert(response.data.message);
                if (response.data.success) {
                    // sendRequest(data);
                    getRequests(userData?._id);
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


    return <div className="row h-100 p-0 m-0">
        <div className="col-md-6 h-100 d-flex justify-content-center align-items-center p-2 m-0 flex-column" style={{ overflowY: "scroll" }}>
            {request?.length > 0 ? request.map((ele, i) => {
                return <div key={`${i}`} style={{ height: 150 }} className="w-100 bg-light rounded border border-5 shadow p-3 mt-3 row">
                    <div className="col-md-8">
                        <p className="h4">Name: {ele?.user?.name}</p>
                        <p className="h4">Email: {ele?.user?.email}</p>
                        <p className={`h4 ${ele?.status == "accepted" ? "text-success" : ele?.status == "rejected" ? "text-danger" : "text-warning"}`}>Status: {ele?.status}</p>
                    </div>
                    <div className="col-md-4 d-flex flex-column justify-content-center">
                        <Button variant="success" className="w-100" disabled={ele.status !== "pending"} onClick={() => {
                            updateRequest(ele?._id, { status: "accepted" });
                        }}>Accept</Button>
                        <Button variant="danger" className="w-100 mt-2" disabled={ele.status !== "pending"} onClick={() => {
                            updateRequest(ele?._id, { status: "rejected" });
                        }}>Reject</Button>
                    </div>
                </div>
            }) : <p className="display-3 text-center">No Requests</p>}
        </div>
        <div className="col-md-6 h-100 d-flex p-2 m-0 flex-column" style={{ overflowY: "scroll" }}>
            <FloatingLabel
                controlId="phone"
                label="Phone no"
                className="mb-3"
                style={{ position: "relative" }}
            >
                <Form.Control type="number" placeholder="phone" onChange={(e) => {
                    let str = e.target.value
                    if (str == userData.phone) {
                        alert("Cannot send request to self!");
                        return;
                    }
                    setSearchString(str)
                }} />
                <Button variant="primary" style={{ position: "absolute", right: 0, top: "0%" }} className="p-3" onClick={() => {
                    searchUser(searchString);
                }}>Search</Button>
            </FloatingLabel>
            {searchResult?.length > 0 ? searchResult?.map((ele, i) => {
                return <div key={i} style={{ height: 150 }} className="w-100 bg-light rounded border border-5 shadow p-3 mt-3 row m-0">
                    <p className="h4">Name: {ele?.name}</p>
                    <p className="h4">Phone: {ele?.phone}</p>
                    <Button variant="success" className="w-100" onClick={(e) => {
                        sendRequest({
                            user: userData?._id,
                            friend: ele?._id
                        })
                    }}>Send Request</Button>
                </div>
            }) : <p className="display-3 text-center">No User Found</p>}
        </div>

    </div>
}

export default Request;
