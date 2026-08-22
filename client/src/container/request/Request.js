import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { UserPlus, Search, Check, X, Phone, Mail, Clock, UserCheck } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Request.css";

const Request = () => {
    let [request, setRequest] = useState([]);
    let [searchResult, setSearchResult] = useState(null);
    let [searchString, setSearchString] = useState("");
    let [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        if (userData?._id) {
            getRequests(userData?._id);
        }
    }, []);

    const getRequests = async (userId) => {
        try {
            let apiUrl = `${API_BASE_URL}/readfriend?user=${userId}`;
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
    };

    const searchUser = async (str) => {
        try {
            let apiUrl = `${API_BASE_URL}/readUser?phone=${str}`;
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
    };

    const updateRequest = async (requestId, data) => {
        try {
            let apiUrl = `${API_BASE_URL}/updatefriend?_id=${requestId}`;
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
    };

    const sendRequest = async (data) => {
        try {
            let apiUrl = `${API_BASE_URL}/savefriend`;
            axios.post(apiUrl, data).then((response) => {
                console.log(response.data);
                alert(response.data.message);
                if (response.data.success) {
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
    };

    return (
        <div className="container-fluid p-0 pb-4">
            {/* Header */}
            <div className="mb-4">
                <h2 className="h2 brand-font mb-1 d-flex align-items-center gap-2">
                    <UserPlus className="text-primary" size={28} />
                    Friend Requests & Connection Manager
                </h2>
                <p className="text-muted mb-0">Accept incoming requests or search users by phone number to connect</p>
            </div>

            <div className="row g-4">
                {/* Left Column: Friend Requests List */}
                <div className="col-12 col-lg-6">
                    <div className="request-panel-card h-100 d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                            <h4 className="h5 brand-font mb-0 d-flex align-items-center gap-2">
                                <Clock className="text-amber" size={20} />
                                Incoming Requests
                            </h4>
                            <span className="badge bg-secondary bg-opacity-25 text-light px-3 py-1.5 rounded-pill small">
                                {request?.length || 0} Total
                            </span>
                        </div>

                        <div className="flex-grow-1 overflow-auto d-flex flex-column gap-3pe-1" style={{ maxHeight: 520 }}>
                            {request?.length > 0 ? (
                                request.map((ele, i) => {
                                    const reqUser = ele?.user;
                                    const reqName = reqUser?.name || "Unknown User";
                                    const reqEmail = reqUser?.email || "N/A";
                                    const status = ele?.status || "pending";

                                    return (
                                        <div key={i} className="request-item-card d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="user-avatar" style={{ width: 46, height: 46, fontSize: '1.1rem' }}>
                                                    {reqName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h6 className="mb-1 fw-bold text-light">{reqName}</h6>
                                                    <small className="text-muted d-flex align-items-center gap-1">
                                                        <Mail size={13} />
                                                        {reqEmail}
                                                    </small>
                                                    <div className="mt-1">
                                                        {status === "accepted" ? (
                                                            <span className="badge-status badge-positive">Accepted</span>
                                                        ) : status === "rejected" ? (
                                                            <span className="badge-status badge-negative">Rejected</span>
                                                        ) : (
                                                            <span className="badge-status badge-pending">Pending</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
                                                <Button
                                                    className="btn-success-gradient py-2 px-3 d-flex align-items-center gap-1.5 small"
                                                    disabled={status !== "pending"}
                                                    onClick={() => updateRequest(ele?._id, { status: "accepted" })}
                                                >
                                                    <Check size={16} />
                                                    Accept
                                                </Button>
                                                <Button
                                                    className="btn-danger-gradient py-2 px-3 d-flex align-items-center gap-1.5 small"
                                                    disabled={status !== "pending"}
                                                    onClick={() => updateRequest(ele?._id, { status: "rejected" })}
                                                >
                                                    <X size={16} />
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-5">
                                    <div className="user-avatar mx-auto mb-3" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>
                                        <Clock size={28} />
                                    </div>
                                    <h5 className="brand-font mb-1">No Pending Requests</h5>
                                    <small className="text-muted">You have no friend requests pending at the moment.</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Search & Add Friend */}
                <div className="col-12 col-lg-6">
                    <div className="request-panel-card h-100 d-flex flex-column">
                        <div className="mb-3 pb-3 border-bottom border-secondary border-opacity-25">
                            <h4 className="h5 brand-font mb-1 d-flex align-items-center gap-2">
                                <Search className="text-primary" size={20} />
                                Find Friends by Phone
                            </h4>
                            <p className="text-muted small mb-0">Search registered users by mobile number to send requests</p>
                        </div>

                        {/* Search Input Box */}
                        <div className="search-input-box mb-4">
                            <div className="input-icon-wrapper input-with-icon position-relative">
                                <Phone size={18} className="input-icon" />
                                <Form.Control
                                    type="number"
                                    placeholder="Enter phone number..."
                                    className="py-3"
                                    onChange={(e) => {
                                        let str = e.target.value;
                                        if (str === userData?.phone) {
                                            alert("Cannot send request to self!");
                                            return;
                                        }
                                        setSearchString(str);
                                    }}
                                />
                                <Button
                                    className="btn-primary-gradient d-flex align-items-center gap-1.5"
                                    onClick={() => searchUser(searchString)}
                                >
                                    <Search size={16} />
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="flex-grow-1 overflow-auto d-flex flex-column gap-3 pe-1" style={{ maxHeight: 420 }}>
                            {searchResult?.length > 0 ? (
                                searchResult.map((ele, i) => (
                                    <div key={i} className="request-item-card d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="user-avatar" style={{ width: 44, height: 44, fontSize: '1.1rem' }}>
                                                {(ele?.name || "U").charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h6 className="mb-1 fw-bold text-light">{ele?.name}</h6>
                                                <small className="text-muted d-flex align-items-center gap-1">
                                                    <Phone size={13} />
                                                    {ele?.phone}
                                                </small>
                                            </div>
                                        </div>

                                        <Button
                                            className="btn-success-gradient py-2 px-3 d-flex align-items-center gap-1.5 small"
                                            onClick={() => {
                                                sendRequest({
                                                    user: userData?._id,
                                                    friend: ele?._id
                                                });
                                            }}
                                        >
                                            <UserCheck size={16} />
                                            Send Request
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <div className="user-avatar mx-auto mb-3" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>
                                        <Search size={28} />
                                    </div>
                                    <h5 className="brand-font mb-1">Search User</h5>
                                    <small className="text-muted">Enter a phone number above and click search to locate friends.</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Request;
