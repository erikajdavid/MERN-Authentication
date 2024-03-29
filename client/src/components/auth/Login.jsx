import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nagivate = useNavigate();

    const { getLoggedIn } = useContext(AuthContext);

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password
            };

            await axios.post("http://localhost:5000/auth/login", loginData);
            getLoggedIn();

            nagivate("/");
            
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Log into your account</h1>
            <form onSubmit={loginUser}>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email:"
                    required
                />

                <label htmlFor="password"></label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password:"
                    required
                />

                <button type="submit">Log in</button>
            
            </form>
        </div>
    );

}

export default Login;