import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {

    let navigate = useNavigate();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState();

    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            navigate("/home");
        }
    }, []);

    const loginUser = (data) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//readUser?phone=${data.phone}&password=${data.password}`
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
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center ">
            <div className="  w-50 bg-light d-flex justify-content-center  border border-dark rounded shadow">
                <Form className="p-3 w-100 ">
                    <p className="text-center h3"> Login Page </p>
                    <FloatingLabel
                        controlId="phone"
                        label="Phone no"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="phone" onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="password"
                        label="Password"
                        className="mb-3"
                        style={{ position: "relative" }}
                    >
                        <Form.Control type={showPassword ? "text" : "password"} placeholder="********" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <p className="" style={{ position: "absolute", right: 20, top: "35%" }} onClick={(e) => {
                            setShowPassword(!showPassword)
                        }}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </p>
                    </FloatingLabel>
                    <Button variant="primary" className="w-100 mt-3" onClick={() => {
                        loginUser({
                            phone: phone,
                            password: password
                        })
                    }}>Login</Button>
                    <Button variant="danger" className="w-100 mt-3" onClick={() => {
                        navigate("/signup")
                    }}>Signup</Button>
                </Form>

            </div>
        </div>
    )

}
export default Login;
