import React, { useState } from "react";
import axios from "axios";
import "./style/Account.css";

function Account() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    newName: "",
    newEmail: "",
    newPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/account/update", form);

      if (res.data === "updated") {
        alert("Account updated successfully!");
      } else if (res.data === "notfound") {
        alert("Incorrect email or password!");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating account.");
    }
  }

  async function deleteAccount() {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await axios.post("http://localhost:5000/account/delete", {
        email: form.email,
        password: form.password
      });

      if (res.data === "deleted") {
        alert("Account deleted. Goodbye!");
      } else {
        alert("Email/password incorrect.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="account-container">
      <h1>Account Settings</h1>

      <form onSubmit={handleUpdate} className="account-form">

        <h2>Verify Identity</h2>
        <input name="email" placeholder="Current Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Current Password" onChange={handleChange} />

        <h2>Update Info</h2>
        <input name="newName" placeholder="New Name" onChange={handleChange} />
        <input name="newEmail" placeholder="New Email" onChange={handleChange} />
        <input name="newPassword" placeholder="New Password" onChange={handleChange} />

        <button className="save-btn" type="submit">Save Changes</button>
      </form>

      <button className="delete-btn" onClick={deleteAccount}>
        Delete Account
      </button>
    </div>
  );
}

export default Account;
