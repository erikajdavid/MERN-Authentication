import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Logout = () => {

    const { getLoggedIn } = useContext(AuthContext);

    const logoutUser = async () => {

        //get logged out endpoint from server
        await axios.get("http://localhost:5000/auth/logout");
        getLoggedIn();
    }

    return (
        <button onClick={logoutUser}>Log out</button>
    );

}

export default Logout;