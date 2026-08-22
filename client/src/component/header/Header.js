import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    let navigate = useNavigate();
    let location = useLocation();
    let currentPath = location.pathname;

    let userData = null;
    try {
        userData = JSON.parse(localStorage.getItem("userData"));
    } catch (e) {
        console.error(e);
    }

    const getUserInitial = () => {
        if (!userData?.name) return "U";
        return userData.name.charAt(0).toUpperCase();
    };

    return (
        <header className="w-100" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
            <Navbar expand="lg" className="custom-navbar">
                <Container fluid>
                    <Link to="/home/" className="brand-logo-container">
                        <div className="brand-icon-box">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
                            </svg>
                        </div>
                        <div>
                            <span className="brand-title">Expense Tracker</span>
                            <span className="brand-badge ms-2">Pro</span>
                        </div>
                    </Link>

                    <Navbar.Toggle aria-controls="main-navbar-nav" className="border-secondary text-white" />

                    <Navbar.Collapse id="main-navbar-nav">
                        <Nav className="mx-auto my-2 my-lg-0 gap-1">
                            <Link 
                                className={`nav-link-custom ${currentPath === '/home/' || currentPath === '/home' ? 'active' : ''}`} 
                                to="/home/"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                Dashboard
                            </Link>

                            <Link 
                                className={`nav-link-custom ${currentPath === '/home/friend' ? 'active' : ''}`} 
                                to="/home/friend"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                                Friends
                            </Link>

                            <Link 
                                className={`nav-link-custom ${currentPath === '/home/request' ? 'active' : ''}`} 
                                to="/home/request"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <line x1="19" y1="8" x2="19" y2="14" />
                                    <line x1="22" y1="11" x2="16" y2="11" />
                                </svg>
                                Requests
                            </Link>

                            <Link 
                                className={`nav-link-custom ${currentPath === '/home/expense' ? 'active' : ''}`} 
                                to="/home/expense"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23" />
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                </svg>
                                Add Expense
                            </Link>

                            <Link 
                                className={`nav-link-custom ${currentPath === '/home/profile' ? 'active' : ''}`} 
                                to="/home/profile"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Profile
                            </Link>
                        </Nav>

                        <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                            <div className="user-profile-widget">
                                <div className="user-avatar-circle">
                                    {getUserInitial()}
                                </div>
                                <span className="username-display me-1">
                                    {userData?.name || "User"}
                                </span>
                            </div>

                            <Button 
                                className="btn-danger-gradient d-flex align-items-center gap-2 py-2 px-3 fs-6"
                                onClick={() => {
                                    localStorage.clear();
                                    navigate("/");
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;