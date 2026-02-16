import React, { useState, useEffect } from "react";
import { createUser, getUsers } from "../api/userApi";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // for edit later

  useEffect(() => {
    // If edit, prefill form
    if (id) {
      getUsers().then((res) => {
        const user = res.data.users.find((u) => u._id === id);
        if (user) setForm(user);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form); // for edit, we will update API later
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /><br /><br />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><br /><br />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><br /><br />
        <input placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} /><br /><br />
        <button type="submit">{id ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
}

export default UserForm;
