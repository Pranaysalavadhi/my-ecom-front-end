import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onLogin }) => {
  // Pre-fill the form with default credentials
  const [email, setEmail] = useState("pranaysalavadhi@gmail.com");
  const [password, setPassword] = useState("pranay");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication logic
    onLogin(); // Notify App.jsx that the user is authenticated
    navigate("/"); // Redirect to the Home page
  };

  // Handle OAuth login
  const handleOAuthLogin = () => {
    onLogin(); // Notify App.jsx that the user is authenticated
    navigate("/"); // Redirect to the Home page
  };

  return (
    <>
      {/* Scrolling Banner */}
      <div className="w-100 text-center bg-primary text-white py-2">
        <marquee>
          Kindly log in using your email and password, or sign in easily with GitHub or Google for quick access.
        </marquee>
      </div>

      {/* Main Container */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
        {/* Card container */}
        <div className="card shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
          <div className="card-body p-4">
            <div className="row">
              {/* Left column - Email/Password Login */}
              <div className="col-md-6 border-end">
                <h1 className="h3 mb-3 text-center">Login</h1>
                <p className="text-muted text-center mb-4">Use your organization email</p>

                <form onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      id="remember"
                      className="form-check-input"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember" className="form-check-label">
                      Remember me
                    </label>
                  </div>

                  {/* Login Button */}
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
              </div>

              {/* Right column - OAuth Buttons */}
              <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                {/* GitHub OAuth Button */}
                <button
                  onClick={handleOAuthLogin}
                  className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-github me-2"></i>
                  Sign in with GitHub
                </button>

                {/* Google OAuth Button */}
                <button
                  onClick={handleOAuthLogin}
                  className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-google me-2"></i>
                  Sign in with Google
                </button>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-muted">
                New to Appsmith?{" "}
                <a href="#" className="text-primary text-decoration-none">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;