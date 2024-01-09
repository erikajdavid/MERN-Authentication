import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Logout from "../auth/Logout";

const Navbar = () => {

    const { loggedIn } = useContext(AuthContext);
    //console.log(loggedIn);

    return (
        <nav>
            <Link to="/">Home</Link>
            {loggedIn === false && (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            )}
            {
                loggedIn === true && (
                <>
                    <Link to="/todolist">To do list</Link>
                    <Logout />
                </>
            )}

        </nav>
    );

}

export default Navbar;