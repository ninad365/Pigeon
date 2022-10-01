import axios from "axios";
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const login = async (inputs) => {
    console.log(inputs)
    const res = await axios.post("/auth/login", inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/chats");
    } catch (err) {
      console.log(err)
      setError(err.response.data);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
      </form>
      <span>
        Don't you have an account? <Link to="/Signup">Signup</Link>
      </span>
    </div>
  )
}
