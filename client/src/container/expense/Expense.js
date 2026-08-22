import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { DollarSign, PlusCircle, Users,  Phone } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Expense.css";

const Expense = () => {

    let [amount, setAmount] = useState(0);
    const [friends, setFreinds] = useState([]);
    let [userData, setUserData] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const addExpense = async (data) => {
        try {
            let apiUrl = `${API_BASE_URL}/saveExpence`;
            axios.post(apiUrl, data).then((response) => {
                alert(response.data.message);
            }).catch((error) => {
                console.log(error);
                alert(error.message);
            });
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    const getFrineds = async (userData) => {
        try {
            let apiUrl = `${API_BASE_URL}/get-friends?user=${userData?._id}`;
            axios.get(apiUrl).then((response) => {
                if (response.data.data) {
                    setFreinds([...response.data.data, { friend: { _id: userData?._id, name: userData?.name, email: userData?.email, phone: userData?.phone }, user: { _id: userData?._id, name: userData?.name, email: userData?.email, phone: userData?.phone } }]);
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

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        setUserData(userData);
        if (userData?._id) {
            getFrineds(userData);
        }
    }, []);

    const handleCheckboxToggle = (targetId) => {
        let updated = [...selectedFriends];
        if (updated.includes(targetId)) {
            updated = updated.filter((ele) => ele !== targetId);
        } else {
            updated.push(targetId);
        }
        setSelectedFriends(updated);
    };

    return (
        <div className="container-fluid p-0 pb-4">
            {/* Header */}
            <div className="mb-4">
                <h2 className="h2 brand-font mb-1 d-flex align-items-center gap-2">
                    <PlusCircle className="text-primary" size={28} />
                    Add Shared Expense
                </h2>
                <p className="text-muted mb-0">Enter total amount and select group members to split the cost evenly</p>
            </div>

            <div className="row g-4">
                {/* Left Column: Form & Amount Input */}
                <div className="col-12 col-lg-5">
                    <div className="expense-panel-card h-100 d-flex flex-column justify-content-between">
                        <div>
                            <div className="mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                                <h4 className="h5 brand-font mb-1">Expense Details</h4>
                                <small className="text-muted">Specify the total bill amount to split</small>
                            </div>

                            <Form.Group className="mb-4" controlId="amount">
                                <Form.Label className="text-muted small fw-semibold">Total Amount ($)</Form.Label>
                                <div className="input-icon-wrapper input-with-icon">
                                    <DollarSign size={20} className="input-icon" />
                                    <Form.Control
                                        type="number"
                                        placeholder="0.00"
                                        className="py-3 fs-5 fw-bold"
                                        value={amount || ''}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>

                                {/* Quick Preset Buttons */}
                                <div className="d-flex align-items-center gap-2 mt-3 flex-wrap">
                                    <span className="text-dim small me-1">Quick Select:</span>
                                    {[10, 50, 100, 250, 500].map((val) => (
                                        <button
                                            key={val}
                                            type="button"
                                            className="preset-btn"
                                            onClick={() => setAmount(val)}
                                        >
                                            +${val}
                                        </button>
                                    ))}
                                </div>
                            </Form.Group>

                            {/* Split Summary Info Box */}
                            <div className="bg-dark bg-opacity-60 p-3 rounded-3 mb-4 border border-secondary border-opacity-25">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span className="text-muted small">Selected Members:</span>
                                    <span className="fw-bold text-light">{selectedFriends.length} Member(s)</span>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <span className="text-muted small">Estimated Split per Person:</span>
                                    <span className="fw-bold text-emerald fs-6">
                                        ${selectedFriends.length > 0 && amount ? (Number(amount) / selectedFriends.length).toFixed(2) : "0.00"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="btn-primary-gradient w-100 py-3 d-flex align-items-center justify-content-center gap-2 fs-6"
                            onClick={() => {
                                addExpense({
                                    amount: amount,
                                    friends: selectedFriends,
                                    user: userData?._id
                                });
                            }}
                        >
                            <PlusCircle size={18} />
                            Add Expense & Split
                        </Button>
                    </div>
                </div>

                {/* Right Column: Friends Checkbox Selector */}
                <div className="col-12 col-lg-7">
                    <div className="expense-panel-card h-100 d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                            <div>
                                <h4 className="h5 brand-font mb-1 d-flex align-items-center gap-2">
                                    <Users className="text-primary" size={20} />
                                    Select Members to Split With
                                </h4>
                                <small className="text-muted">Check friends who participate in this bill</small>
                            </div>
                            <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30 px-3 py-1.5 rounded-pill small fw-bold">
                                {selectedFriends.length} Selected
                            </span>
                        </div>

                        <div className="flex-grow-1 overflow-auto d-flex flex-column gap-3 pe-1" style={{ maxHeight: 480 }}>
                            {friends?.length > 0 ? (
                                friends.map((ele, i) => {
                                    const friendObj = userData?._id === ele?.friend?._id ? ele?.user : ele?.friend;
                                    const friendName = friendObj?.name || "Friend";
                                    const friendPhone = friendObj?.phone || "N/A";
                                    const targetId = userData?._id === ele?.friend?._id ? ele?.user?._id : ele?.friend?._id;
                                    const isSelected = selectedFriends.includes(targetId);

                                    return (
                                        <div
                                            key={i}
                                            className={`friend-select-item d-flex align-items-center justify-content-between ${isSelected ? "selected" : ""}`}
                                            onClick={() => handleCheckboxToggle(targetId)}
                                        >
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="user-avatar" style={{ width: 44, height: 44, fontSize: '1.1rem' }}>
                                                    {friendName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h6 className="mb-1 fw-bold text-light">{friendName}</h6>
                                                    <small className="text-muted d-flex align-items-center gap-1">
                                                        <Phone size={13} />
                                                        {friendPhone}
                                                    </small>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center gap-2">
                                                <Form.Check
                                                    type="checkbox"
                                                    id={`friend-check-${i}`}
                                                    checked={isSelected}
                                                    onChange={() => {}} // Handled by parent container click
                                                    style={{ transform: "scale(1.3)", cursor: "pointer" }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-5">
                                    <div className="user-avatar mx-auto mb-3" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>
                                        <Users size={28} />
                                    </div>
                                    <h5 className="brand-font mb-1">No Friends Connected</h5>
                                    <small className="text-muted">Connect with friends first before splitting expenses.</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expense;
