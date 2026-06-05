"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone.replace(/\D/g, ""));
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    setPasswordStrength(strength);
    return strength;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (checkPasswordStrength(formData.password) < 2) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      checkPasswordStrength(value);
    }

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
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration data:", formData);
      setSuccess(true);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
      });
      setErrors({});

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🚜 Farmer Registration</h1>

        {success && (
          <div className="successMessage">
            ✓ Registration Successful! Welcome aboard.
          </div>
        )}

        {errors.submit && (
          <div className="errorMessage">
            ✕ {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "inputError" : ""}
            />
            {errors.fullName && (
              <span className="errorText">{errors.fullName}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "inputError" : ""}
            />
            {errors.phone && (
              <span className="errorText">{errors.phone}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "inputError" : ""}
            />
            {errors.email && (
              <span className="errorText">{errors.email}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "inputError" : ""}
            />
            {formData.password && (
              <div className="passwordStrength">
                <div className="strengthBar">
                  <div
                    className={`strengthFill strength${passwordStrength}`}
                  ></div>
                </div>
                <span className="strengthText">
                  {passwordStrength === 0 && "Weak"}
                  {passwordStrength === 1 && "Fair"}
                  {passwordStrength === 2 && "Good"}
                  {passwordStrength === 3 && "Strong"}
                  {passwordStrength === 4 && "Very Strong"}
                </span>
              </div>
            )}
            {errors.password && (
              <span className="errorText">{errors.password}</span>
            )}
          </div>

          <div className="formGroup">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "inputError" : ""}
            />
            {errors.confirmPassword && (
              <span className="errorText">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="formGroup checkbox">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label>I agree to the terms and conditions</label>
            {errors.agreeTerms && (
              <span className="errorText">{errors.agreeTerms}</span>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
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
          padding: 40px;
          border-radius: 12px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h1 {
          text-align: center;
          margin: 0 0 30px 0;
          color: #333;
          font-size: 28px;
        }

        .successMessage {
          background: #d4edda;
          border: 1px solid #c3e6cb;
          color: #155724;
          padding: 12px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
          animation: fadeIn 0.3s ease-out;
        }

        .errorMessage {
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          color: #721c24;
          padding: 12px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .formGroup.checkbox {
          flex-direction: row;
          gap: 10px;
          align-items: flex-start;
          margin-top: 10px;
        }

        .formGroup.checkbox input {
          margin-top: 5px;
          cursor: pointer;
          width: 20px;
          height: 20px;
        }

        .formGroup.checkbox label {
          margin: 0;
        }

        label {
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="password"] {
          padding: 12px 14px;
          border: 2px solid #e1e8ed;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        input.inputError {
          border-color: #dc3545;
          background-color: #fff5f5;
        }

        input.inputError:focus {
          box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }

        .errorText {
          color: #dc3545;
          font-size: 13px;
          margin-top: 4px;
        }

        .passwordStrength {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .strengthBar {
          width: 100%;
          height: 6px;
          background-color: #e1e8ed;
          border-radius: 3px;
          overflow: hidden;
        }

        .strengthFill {
          height: 100%;
          border-radius: 3px;
          transition: all 0.3s ease;
          width: 0%;
        }

        .strength1 {
          width: 25%;
          background-color: #dc3545;
        }

        .strength2 {
          width: 50%;
          background-color: #ffc107;
        }

        .strength3 {
          width: 75%;
          background-color: #28a745;
        }

        .strength4 {
          width: 100%;
          background-color: #20c997;
        }

        .strengthText {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        @media (max-width: 600px) {
          .card {
            padding: 25px;
          }

          h1 {
            font-size: 24px;
          }

          button {
            padding: 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
