import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { User, Mail, Phone, Lock, Eye, EyeOff, Save, ShieldCheck } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Profile.css";

const Profile = () => {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
            navigate("/");
            return;
        }
        setUserData(userData);
        setName(userData?.name);
        setEmail(userData?.email);
        setPhone(userData?.phone);
        setPassword(userData?.password);
    }, [navigate]);

    const updateUser = (userId, data) => {
        try {
            let apiUrl = `${API_BASE_URL}/updateUser?_id=${userId}`;
            axios.put(apiUrl, data).then((response) => {
                console.log(response.data);
                alert(response.data.message);
                if (response.data.success) {
                    localStorage.setItem("userData", JSON.stringify(response.data.data));
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
        <div className="container py-3">
            <div className="profile-card-wrapper">
                {/* Header Profile Avatar */}
                <div className="text-center mb-4">
                    <div className="profile-avatar-large">
                        {(userData?.name || "U").charAt(0).toUpperCase()}
                    </div>
                    <h3 className="h3 brand-font mb-1">{userData?.name || "User Profile"}</h3>
                    <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-30 px-3 py-1.5 rounded-pill small d-inline-flex align-items-center gap-1">
                        <ShieldCheck size={14} />
                        Active Member Account
                    </span>
                </div>

                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-muted small fw-semibold">Full Name</Form.Label>
                        <div className="input-icon-wrapper input-with-icon">
                            <User size={18} className="input-icon" />
                            <Form.Control
                                type="text"
                                maxLength={8}
                                placeholder="name"
                                onChange={(e) => setName(e.target.value)}
                                defaultValue={userData?.name}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className="text-muted small fw-semibold">Email Address (Locked)</Form.Label>
                        <div className="input-icon-wrapper input-with-icon">
                            <Mail size={18} className="input-icon" />
                            <Form.Control
                                type="email"
                                placeholder="emailId"
                                onChange={(e) => setEmail(e.target.value)}
                                defaultValue={userData?.email}
                                disabled
                                className="opacity-75"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className="text-muted small fw-semibold">Phone Number (Locked)</Form.Label>
                        <div className="input-icon-wrapper input-with-icon">
                            <Phone size={18} className="input-icon" />
                            <Form.Control
                                type="number"
                                maxLength={10}
                                placeholder="phone"
                                onChange={(e) => setPhone(e.target.value)}
                                defaultValue={userData?.phone}
                                disabled
                                className="opacity-75"
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label className="text-muted small fw-semibold">Password</Form.Label>
                        <div className="input-icon-wrapper input-with-icon position-relative">
                            <Lock size={18} className="input-icon" />
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                minLength={8}
                                placeholder="********"
                                onChange={(e) => setPassword(e.target.value)}
                                defaultValue={userData?.password}
                            />
                            <span
                                className="password-toggle-btn d-flex align-items-center gap-1"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                {showPassword ? "HIDE" : "SHOW"}
                            </span>
                        </div>
                    </Form.Group>

                    <Button
                        className="btn-primary-gradient w-100 py-3 d-flex align-items-center justify-content-center gap-2 fs-6"
                        onClick={() => {
                            updateUser(userData?._id, {
                                name: name,
                                phone: phone,
                                email: email,
                                password: password
                            });
                        }}
                    >
                        <Save size={18} />
                        Update Profile Changes
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Profile;
