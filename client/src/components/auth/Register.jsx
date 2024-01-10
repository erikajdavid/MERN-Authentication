import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import  { useNavigate }  from "react-router-dom";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const navigate = useNavigate();

    const { getLoggedIn } = useContext(AuthContext);
    const registerUser = async (e) => {
        //prevent refresh on submit
        e.preventDefault();

        try {
            //make an object with the data
            const registerData = 
             {
                email, 
                password, 
                passwordVerify
            }

            //make an http request
            //server time
            await axios.post("http://localhost:5000/auth/register", registerData, {
                withCredentials: true
            });
            await getLoggedIn();

            navigate("/");

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Sign up for an account</h1>
            <form onSubmit={registerUser}>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                    placeholder="Email:"
                    required
                />

                <label htmlFor="password"></label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }                    placeholder="Password:"
                    required
                />

                <label htmlFor="passwordVerify"></label>
                <input 
                    type="password"
                    id="passwordVerify"
                    name="passwordVerify"
                    value={passwordVerify}
                    onChange={ (e) => setPasswordVerify(e.target.value) }                    placeholder="Confirm paswsword:"
                    required
                />

                <button type="submit">Create account</button>
            
            </form>
        </div>
    );

}

export default Register;