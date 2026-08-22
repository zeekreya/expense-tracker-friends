import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Phone, Lock, Eye, EyeOff, Wallet, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import API_BASE_URL from "../../config/api";
import "./Login.css";

const Login = () => {

    let navigate = useNavigate();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            navigate("/home");
        }
    }, [navigate]);

    const loginUser = (data) => {
        try {
            const apiUrl = `${API_BASE_URL}/readUser?phone=${data.phone}&password=${data.password}`;          
            axios.get(apiUrl).then((response) => {
                if (response.data.data.length) {
                    alert("Authenticated successfully")
                    localStorage.setItem("userData", JSON.stringify(response.data.data[0]));
                    navigate("/home")
                } else {
                    alert("Invalid Credentials")
                }
            }).catch((error) => {
                console.log(error)
                alert(error.message)
            })

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className="auth-container ambient-bg">
            <div className="auth-card-wrapper row g-0">
                {/* Left Side: Brand Banner */}
                <div className="col-lg-6 auth-banner-side d-none d-lg-flex">
                    <div>
                        <div className="auth-brand-icon">
                            <Wallet size={30} />
                        </div>
                        <h2 className="gradient-text display-6 mb-2">Expense Tracker</h2>
                        <p className="text-muted fs-6 mb-4">
                            Smart Group Expense & Split Engine. Split expenses, track friend balances, and settle up easily.
                        </p>

                        <div className="feature-pill-list">
                            <div className="feature-pill-item">
                                <div className="feature-pill-icon">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span>Real-time Expense Balancing</span>
                            </div>
                            <div className="feature-pill-item">
                                <div className="feature-pill-icon">
                                    <ShieldCheck size={16} />
                                </div>
                                <span>Secure Friend Request System</span>
                            </div>
                            <div className="feature-pill-item">
                                <div className="feature-pill-icon">
                                    <CheckCircle2 size={16} />
                                </div>
                                <span>Instant Net Settlement Calculations</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-top border-secondary border-opacity-25">
                        <small className="text-dim">College Final Year Project &bull; MERN Stack Edition</small>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="col-lg-6 auth-form-side d-flex flex-column justify-content-center">
                    <div className="mb-4">
                        <h3 className="h2 mb-1">Welcome Back</h3>
                        <p className="text-muted">Sign in to manage your group expenses</p>
                    </div>

                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label className="text-muted small fw-semibold">Phone Number</Form.Label>
                            <div className="input-icon-wrapper input-with-icon">
                                <Phone size={18} className="input-icon" />
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter your phone number" 
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
                                    placeholder="Enter your password" 
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
                                loginUser({
                                    phone: phone,
                                    password: password
                                })
                            }}
                        >
                            Sign In to Account
                            <ArrowRight size={18} />
                        </Button>

                        <div className="text-center my-3 text-muted position-relative">
                            <hr className="border-secondary opacity-25" />
                            <span className="bg-dark px-3 position-absolute top-50 start-50 translate-middle text-dim small">
                                Don't have an account?
                            </span>
                        </div>

                        <Button 
                            className="btn-danger-gradient w-100 py-3 mt-2" 
                            onClick={() => navigate("/signup")}
                        >
                            Create New Account (Signup)
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
