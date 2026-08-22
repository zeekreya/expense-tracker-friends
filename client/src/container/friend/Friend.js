import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { Users, Phone, UserX, Search, UserCheck } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Friend.css";

const Friend = () => {
    let [frineds, setFreinds] = useState(null);
    let [userData, setUserData] = useState(null);
    let [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        if (userData?._id) {
            getFrineds(userData?._id);
        }
    }, []);

    const deleteFrineds = async (targetId) => {
        try {
            let apiUrl = `${API_BASE_URL}/deletefriend?user=${userData?._id}&friend=${targetId}`;
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
    };

    const getFrineds = async (userId) => {
        try {
            let apiUrl = `${API_BASE_URL}/get-friends?user=${userId}`;
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
    };

    // Filter friends list based on search term
    const filteredFriends = frineds?.filter((ele) => {
        const friendObj = userData?._id === ele?.friend?._id ? ele?.user : ele?.friend;
        const name = friendObj?.name?.toLowerCase() || "";
        const phone = friendObj?.phone?.toString() || "";
        return name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm);
    });

    return (
        <div className="friends-container">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                <div>
                    <h2 className="h2 brand-font mb-1 d-flex align-items-center gap-2">
                        <Users className="text-primary" size={28} />
                        Connected Friends
                    </h2>
                    <p className="text-muted mb-0">Manage your connected friends and split partners</p>
                </div>

                {/* Search Bar */}
                <div style={{ maxWidth: 320 }} className="w-100 position-relative">
                    <Search size={18} className="input-icon" />
                    <Form.Control
                        type="text"
                        placeholder="Search friends by name/phone..."
                        className="ps-5"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Friends Grid */}
            {filteredFriends?.length > 0 ? (
                <div className="row g-3">
                    {filteredFriends.map((ele, i) => {
                        const friendObj = userData?._id === ele?.friend?._id ? ele?.user : ele?.friend;
                        const friendName = friendObj?.name || "Friend";
                        const friendPhone = friendObj?.phone || "N/A";
                        const targetId = userData?._id === ele?.friend?._id ? ele?.user?._id : ele?.friend?._id;

                        return (
                            <div key={i} className="col-12 col-md-6 col-lg-4">
                                <div className="friend-card h-100 d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="user-avatar" style={{ width: 50, height: 50, fontSize: '1.2rem' }}>
                                                    {friendName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h5 className="mb-1 fw-bold">{friendName}</h5>
                                                    <span className="badge bg-success bg-opacity-25 text-success rounded-pill px-2.5 py-1 small d-inline-flex align-items-center gap-1">
                                                        <UserCheck size={12} />
                                                        Connected
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-dark bg-opacity-50 p-2.5 rounded-3 mb-3 border border-secondary border-opacity-25">
                                            <small className="text-muted d-flex align-items-center gap-2">
                                                <Phone size={14} className="text-primary" />
                                                <span className="text-light">{friendPhone}</span>
                                            </small>
                                        </div>
                                    </div>

                                    <Button
                                        className="btn-danger-gradient w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                                        onClick={() => deleteFrineds(targetId)}
                                    >
                                        <UserX size={16} />
                                        Unfriend
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-state-card mt-3">
                    <div className="user-avatar mx-auto mb-3" style={{ width: 64, height: 64, fontSize: '1.75rem' }}>
                        <Users size={32} />
                    </div>
                    <h4 className="h4 brand-font mb-2">No Friends Found</h4>
                    <p className="text-muted max-w-md mx-auto mb-4" style={{ maxWidth: 460 }}>
                        {searchTerm ? "No friend matched your search query." : "You haven't connected with any friends yet. Head over to Requests to find and add friends!"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Friend;
