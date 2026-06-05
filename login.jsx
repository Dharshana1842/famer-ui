"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FarmerLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const validateIdentifier = (value) => {
    const normalized = value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
    const isPhone = /^\d{10}$/.test(normalized.replace(/\D/g, ""));
    return isEmail || isPhone;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Enter your phone or email";
    } else if (!validateIdentifier(formData.identifier)) {
      newErrors.identifier = "Use a valid email address or 10-digit phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const getNextRoute = () => {
    const normalized = formData.identifier.toLowerCase();
    if (
      normalized.includes("approved") ||
      normalized.includes("dashboard") ||
      /[02468]$/.test(normalized.replace(/\D/g, ""))
    ) {
      return "/dashboard";
    }
    return "/enrollment-status";
  };

  const getStatusText = () => {
    const route = getNextRoute();
    if (route === "/dashboard") {
      return "You are approved. Redirecting to your farmer dashboard...";
    }
    return "Enrollment pending. Redirecting to your enrollment status page...";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setStatusMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const nextRoute = getNextRoute();
      setStatusMessage(getStatusText());
      setTimeout(() => {
        router.push(nextRoute);
      }, 1200);
    } catch (error) {
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚜 Farmer Login</h1>
        <p className="description">
          Enrolled or approved farmers log in with phone or email and password to access the platform.
          After login you will be redirected to your enrollment status or dashboard.
        </p>

        {statusMessage && <div className="successMessage">✓ {statusMessage}</div>}
        {errors.submit && <div className="errorMessage">✕ {errors.submit}</div>}

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Phone or Email</label>
            <input
              type="text"
              name="identifier"
              placeholder="Enter your phone number or email"
              value={formData.identifier}
              onChange={handleChange}
              className={errors.identifier ? "inputError" : ""}
            />
            {errors.identifier && <span className="errorText">{errors.identifier}</span>}
          </div>

          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "inputError" : ""}
            />
            {errors.password && <span className="errorText">{errors.password}</span>}
          </div>

          <div className="formGroup checkbox">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label>Remember me</label>
          </div>

          <div className="actionsRow">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <a className="forgotLink" href="/forgot-password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .card {
          background: white;
          padding: 42px;
          border-radius: 16px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.18);
          animation: slideIn 0.35s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h1 {
          text-align: center;
          margin: 0 0 12px 0;
          color: #1f2a44;
          font-size: 30px;
        }

        .description {
          margin: 0 0 24px;
          color: #5f6d88;
          line-height: 1.6;
          text-align: center;
          font-size: 15px;
        }

        .successMessage,
        .errorMessage {
          border-radius: 8px;
          padding: 14px 16px;
          margin-bottom: 20px;
          font-size: 14px;
        }

        .successMessage {
          background: #e6f8ed;
          border: 1px solid #b8e6c9;
          color: #10532b;
        }

        .errorMessage {
          background: #fde8ea;
          border: 1px solid #f4c2c7;
          color: #8a1f26;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .formGroup.checkbox {
          flex-direction: row;
          align-items: center;
          gap: 12px;
          margin-top: 6px;
        }

        .formGroup.checkbox input {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .formGroup.checkbox label {
          margin: 0;
          font-size: 14px;
          color: #333;
        }

        label {
          font-size: 14px;
          font-weight: 600;
          color: #2d3a59;
        }

        input[type="text"],
        input[type="password"] {
          padding: 14px 16px;
          border: 2px solid #e6eaf3;
          border-radius: 10px;
          font-size: 15px;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          font-family: inherit;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #5d7ef2;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.12);
        }

        input.inputError {
          border-color: #e06a76;
          background-color: #fff2f3;
        }

        .errorText {
          color: #e03a47;
          font-size: 13px;
        }

        .actionsRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        button {
          flex: 1 1 180px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px 18px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 700;
          font-size: 15px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px rgba(102, 126, 234, 0.24);
        }

        button:disabled {
          opacity: 0.72;
          cursor: not-allowed;
        }

        .forgotLink {
          color: #5d7ef2;
          font-size: 14px;
          text-decoration: none;
          white-space: nowrap;
        }

        .forgotLink:hover {
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .card {
            padding: 28px;
          }

          h1 {
            font-size: 26px;
          }

          .actionsRow {
            flex-direction: column;
            align-items: stretch;
          }

          .forgotLink {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
