import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined);

    //talk to the server endpoint
    //get the true or false value
    const getLoggedIn = async () => {
        const loggedInResponse = await axios.get("http://localhost:5000/auth/loggedin");
        setLoggedIn(loggedInResponse.data);
    };

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={ {loggedIn, getLoggedIn} }>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };