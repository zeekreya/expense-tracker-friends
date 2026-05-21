import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    let navigate = useNavigate();
    return <div style={{ height: "10vh" }} className="vw-100">
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary h-100">
            <Container fluid>
                <Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={{textDecoration: "none", color: "grey"}} className='fs-5 p-2' to="/home/">Home</Link>
                        <Link style={{textDecoration: "none", color: "grey"}} className='fs-5 p-2' to="/home/friend">Friends</Link>
                        <Link style={{textDecoration: "none", color: "grey"}} className='fs-5 p-2' to="/home/request">Request</Link>
                        <Link style={{textDecoration: "none", color: "grey"}} className='fs-5 p-2' to="/home/expense">Expense</Link>
                        <Link style={{textDecoration: "none", color: "grey"}} className='fs-5 p-2' to="/home/profile">Profile</Link>
                    </Nav>
                    <Nav>
                        <p className='h3 pe-2'>{JSON.parse(localStorage.getItem("userData"))?.name}</p>
                        <Button variant='danger' onClick={()=>{
                            localStorage.clear();
                            navigate("/");
                        }}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
}
export default Header;