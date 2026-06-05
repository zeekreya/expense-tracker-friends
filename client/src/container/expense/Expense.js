import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Expense.css";

const Expense = () => {

    let [amount, setAmount] = useState(0);
    const [friends, setFreinds] = useState([]);
    let [userData, setUserData] = useState(null);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const addExpense = async (data) => {
        try {
            let apiUrl = `https://expense-tracker-friends.onrender.com//saveExpence`;
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
            let apiUrl = `http://localhost:5000/get-friends?user=${userData?._id}`
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
        getFrineds(userData);
    }, []);

    return <div className="row m-0 p-0 h-100 w-100">
        <div className="col-md-6 h-100 d-flex justify-content-center align-items-center flex-column">
            <FloatingLabel
                controlId="amount"
                label="Amount"
                className="mb-3 w-75"
            >
                <Form.Control type="number" placeholder="Amount" onChange={(e) => {
                    setAmount(e.target.value)
                }} />
            </FloatingLabel>
            <Button variant="primary" className="py-3 w-75" onClick={() => {
                addExpense({
                    amount: amount,
                    friends: selectedFriends,
                    user: userData?._id
                });
            }}>
                Add Expense
            </Button>
        </div>
        <div className="col-md-6 h-100">
            {friends?.length > 0 ? friends?.map((ele, i) => {
                return <div key={i} style={{ height: 150, position: "relative" }} className="bg-light rounded border border-5 shadow p-3 mt-3 w-100">
                    <p className="h4">Name: {userData?._id == ele?.friend?._id ? ele?.user?.name : ele?.friend?.name}</p>
                    <p className="h4">Phone: {userData?._id == ele?.friend?._id ? ele?.user?.phone : ele?.friend?.phone}</p>
                    <Form.Check
                        style={{ position: "absolute", top: "30%", right: 30, fontSize: 40 }}
                        type={"checkbox"}
                        id={i}
                        label={``}
                        value={userData?._id == ele?.friend?._id ? ele?.user?._id : ele?.friend?._id}
                        onChange={(event) => {
                            let data = selectedFriends;
                            if (data.includes(event.target.value)) {
                                data = data.filter((ele) => ele != event.target.value);
                            } else {
                                data.push(event.target.value);
                            }
                            setSelectedFriends(data);
                        }}
                    />
                </div>
            }) : <p className="display-3 text-center">No User Found</p>}
        </div>
    </div>
}

export default Expense;
