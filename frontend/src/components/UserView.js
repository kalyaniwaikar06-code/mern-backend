import React, { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";
import { useParams, Link } from "react-router-dom";

function UserView() {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUsers().then((res) => {
      const u = res.data.users.find((user) => user._id === id);
      setUser(u);
    });
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default UserView;
