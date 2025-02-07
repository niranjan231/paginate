import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser } from "../Redux/counterSlice"; 
import AddUser from "./AddUser"; 
import "../App.css"

const User = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowAddUser(true);
  };

  return (
    <div className="user-1">
      <button className="post-btn" onClick={() => {
        setEditingUser(null);
        setShowAddUser(!showAddUser);
      }}>
        {showAddUser ? "Close" : "Post"}
      </button>

      {showAddUser && <AddUser onClose={() => setShowAddUser(false)} editingUser={editingUser} />}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.title}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
