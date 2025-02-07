import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "../Redux/counterSlice";
import "../App.css";

const AddUser = ({ onClose, editingUser }) => {
    const [user, setUser] = useState({ name: "", email: "", title: "" });
    const dispatch = useDispatch();

    useEffect(() => {
        if (editingUser) {
            setUser(editingUser); // Populate form with editing user details
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.name && user.email && user.title) {
            if (editingUser) {
                dispatch(editUser(user)); // Dispatch edit action
            } else {
                dispatch(addUser(user)); // Dispatch add action
            }
            setUser({ name: "", email: "", title: "" });
            onClose();
        }
    };

    return (
        <div className="add-user">
            <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                />
                <input
                    type="text"
                    name="title"
                    value={user.title}
                    onChange={handleChange}
                    placeholder="Enter Title"
                    required
                />
                <button type="submit" className="add-btn">
                    {editingUser ? "Update User" : "Add User"}
                </button>
            </form>
        </div>
    );
};

export default AddUser;
