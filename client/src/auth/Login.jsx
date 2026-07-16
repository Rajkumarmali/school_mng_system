import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { login } from "../state/auth/Action";
import { useDispatch } from "react-redux";

const Login = () => {

    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        usernameOrEmail: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(loginData))
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="user-icon">
                    <i className="bi bi-person-fill"></i>
                </div>
                <h2 className="text-center text-white mb-4">
                    Sign In
                </h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Username Or Email"
                            name="usernameOrEmail"
                            value={loginData.usernameOrEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="custom-input"
                            placeholder="Password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="d-flex justify-content-between mb-4 text-white">
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input me-2"
                            />
                            Remember me
                        </div>
                        <Link
                            to="#"
                            className="text-white text-decoration-none"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="login-btn w-100"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;