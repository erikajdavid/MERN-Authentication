import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Logout = () => {

    const { getLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutUser = async () => {

        //get logged out endpoint from server
        await axios.get("http://localhost:5000/auth/logout");
        getLoggedIn();

        //redirect to homepage after logout
        navigate("/");
    }

    return (
        <button onClick={logoutUser}>Log out</button>
    );

}

export default Logout;