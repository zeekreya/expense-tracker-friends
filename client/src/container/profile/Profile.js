import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios'
import "./Profile.css";

const Profile = () => {

    let navigate = useNavigate();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
            navigate("/");
        }
        setUserData(userData);
        setName(userData?.name);
        setEmail(userData?.email);
        setPhone(userData?.phone);
        setPassword(userData?.password);
    }, []);

    const updateUser = (userId, data) => {
        try {
            let apiUrl = `http://localhost:5000/updateUser?_id=${userId}`;
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
    }



    return (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center ">
            <div className="  w-50 bg-light d-flex justify-content-center  border border-dark rounded shadow">
                <Form className="p-3 w-100 ">
                    <p className="text-center h3"> Profile Page </p>
                    <FloatingLabel
                        controlId="name"
                        label="Name "
                        className="mb-3"
                    >
                        <Form.Control type="text" maxLength={8} placeholder="name" onChange={(e) => {
                            setName(e.target.value)
                        }} defaultValue={userData?.name}/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="email"
                        label="Email "
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="emailId" onChange={(e) => {
                            setEmail(e.target.value)
                        }}  defaultValue={userData?.email} disabled/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="phone"
                        label="Phone "
                        className="mb-3"
                    >
                        <Form.Control type="number" maxLength={10} placeholder="phone" onChange={(e) => {
                            setPhone(e.target.value)
                        }}  defaultValue={userData?.phone} disabled/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="password"
                        label="Password"
                        className="mb-3"
                        style={{ position: "relative" }}
                    >
                        <Form.Control type={showPassword ? "text" : "password"} minLength={8} placeholder="********" onChange={(e) => {
                            setPassword(e.target.value)
                        }}  defaultValue={userData?.password}/>
                        <p className="" style={{ position: "absolute", right: 20, top: "35%" }} onClick={(e) => {
                            setShowPassword(!showPassword)
                        }}>
                            {showPassword ? "HIDE" : "SHOW"}
                        </p>
                    </FloatingLabel>

                    <Button variant="primary" className="w-100 mt-3" onClick={() => {
                        updateUser(userData?._id, {
                            name: name,
                            phone: phone,
                            email: email,
                            password: password
                        })
                    }} >Update Profile</Button>
                </Form>
            </div>
        </div>
    )

}
export default Profile;