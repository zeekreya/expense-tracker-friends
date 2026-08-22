import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, ArrowLeft, ShieldCheck, Zap, Sparkles } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Signup.css";

const Signup = () => {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            navigate("/home");
        }
    }, [navigate]);

    const registerUser = (data) => {
        try {
            let apiUrl = `${API_BASE_URL}/saveUser`;
            axios.post(apiUrl, data).then((response) => {
                console.log(response.data);
                alert(response.data.message);
                if (response.data.success) {
                    navigate("/");
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

    return (
        <div className="signup-container ambient-bg">
            <div className="signup-card-wrapper row g-0">
                {/* Left Side: Brand Banner */}
                <div className="col-lg-5 signup-banner-side d-none d-lg-flex">
                    <div>
                        <div className="auth-brand-icon">
                            <UserPlus size={30} />
                        </div>
                        <h2 className="gradient-text display-6 mb-2">Join Expense Tracker</h2>
                        <p className="text-muted fs-6 mb-4">
                            Start tracking shared balances with friends and flatmates seamlessly in one centralized hub.
                        </p>

                        <div className="feature-pill-list">
                            <div className="feature-pill-item">
                                <div className="feature-pill-icon">
                                    <Sparkles size={16} />
                                </div>
                                <span>Free & Easy Registration</span>
                            </div>
                            <div className="feature-pill-item">
                                <div className="feature-pill-icon">
                                    <Zap size={16} />
                                </div>
                                <span>Instant Friend Connections</span>
                            </div>
                            <div className="feature-pill-item">
                                <div className="feature-pill-icon">
                                    <ShieldCheck size={16} />
                                </div>
                                <span>Transparent Split Reports</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-top border-secondary border-opacity-25">
                        <small className="text-dim">MERN Stack Architecture &bull; Final Year Project</small>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-lg-7 auth-form-side d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="h2 mb-1">Create an Account</h3>
                        <p className="text-muted">Fill out your details to get started</p>
                    </div>

                    <Form onSubmit={(e) => e.preventDefault()}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Group className="mb-2" controlId="name">
                                    <Form.Label className="text-muted small fw-semibold">Full Name</Form.Label>
                                    <div className="input-icon-wrapper input-with-icon">
                                        <User size={18} className="input-icon" />
                                        <Form.Control 
                                            type="text" 
                                            maxLength={8} 
                                            placeholder="John Doe" 
                                            onChange={(e) => setName(e.target.value)} 
                                        />
                                    </div>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-2" controlId="email">
                                    <Form.Label className="text-muted small fw-semibold">Email Address</Form.Label>
                                    <div className="input-icon-wrapper input-with-icon">
                                        <Mail size={18} className="input-icon" />
                                        <Form.Control 
                                            type="email" 
                                            placeholder="john@example.com" 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </div>
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-3 mt-2" controlId="phone">
                            <Form.Label className="text-muted small fw-semibold">Phone Number</Form.Label>
                            <div className="input-icon-wrapper input-with-icon">
                                <Phone size={18} className="input-icon" />
                                <Form.Control 
                                    type="number" 
                                    maxLength={10} 
                                    placeholder="Enter 10-digit mobile number" 
                                    onChange={(e) => setPhone(e.target.value)} 
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
                                    placeholder="Minimum 8 characters" 
                                    onChange={(e) => setPassword(e.target.value)} 
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
                            className="btn-primary-gradient w-100 py-3 d-flex align-items-center justify-content-center gap-2 mb-3" 
                            onClick={() => {
                                registerUser({
                                    name: name,
                                    phone: phone,
                                    email: email,
                                    password: password
                                })
                            }}
                        >
                            <UserPlus size={18} />
                            Complete Registration
                        </Button>

                        <Button 
                            variant="link"
                            className="w-100 text-decoration-none text-muted d-flex align-items-center justify-content-center gap-2 hover-white" 
                            onClick={() => navigate("/")}
                        >
                            <ArrowLeft size={16} />
                            Already registered? Back to Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Signup;