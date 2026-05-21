import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import "./Signup.css";

const Signup = () => {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState();

    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (userData) {
            navigate("/home");
        }
    }, []);

    const registerUser = (data) => {
        try {
            let apiUrl = "http://localhost:5000/saveUser"
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
        <div className="vh-100 vw-100 d-flex justify-content-center align-items-center ">
            <div className="  w-50 bg-light d-flex justify-content-center  border border-dark rounded shadow">
                <Form className="p-3 w-100 ">
                    <p className="text-center h3"> Signup Page </p>
                    <FloatingLabel
                        controlId="name"
                        label="Name "
                        className="mb-3"
                    >
                        <Form.Control type="text" maxLength={8} placeholder="name" onChange={(e) => {
                            setName(e.target.value)
                        }} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="email"
                        label="Email "
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="emailId" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="phone"
                        label="Phone "
                        className="mb-3"
                    >
                        <Form.Control type="number" maxLength={10} placeholder="phone" onChange={(e) => {
                            setPhone(e.target.value)
                        }} />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="password"
                        label="Password"
                        className="mb-3"
                        style={{ position: "relative" }}
                    >
                        <Form.Control type={showPassword ? "text" : "password"} minLength={8} placeholder="********" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <p className="" style={{ position: "absolute", right: 20, top: "35%" }} onClick={(e) => {
                            setShowPassword(!showPassword)
                        }}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </p>
                    </FloatingLabel>

                    <Button variant="primary" className="w-100 mt-3" onClick={() => {
                        registerUser({
                            name: name,
                            phone: phone,
                            email: email,
                            password: password
                        })
                    }} >Signup</Button>
                    <Button variant="danger" className="w-100 mt-3" onClick={() => {
                        navigate("/")
                    }}>Login</Button>
                </Form>
            </div>
        </div>
    )

}
export default Signup;