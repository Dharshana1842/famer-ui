"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Registration Successful");
    console.log(formData);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Farmer Registration</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f4f4f4;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          width: 400px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        input {
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        button {
          background: green;
          color: white;
          padding: 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background: darkgreen;
        }
      `}</style>
    </div>
  );
}  