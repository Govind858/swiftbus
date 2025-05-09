// src/components/BusOperatorLogin.jsx
import { useState } from "react";
import { useAuth } from "./AuthContext";
import "./AuthLogin.css";
import BusOperatorAxios from "../../Axios/BusOperatorAxios"

const AuthLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await BusOperatorAxios.post("/bus-operator/login", form);
      if (res.data.success) {
        console.log("Server result:", res.data.result);
        loginUser(res.data.result);
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Bus Operator Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthLogin;
