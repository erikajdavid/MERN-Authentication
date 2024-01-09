const Login = () => {

    return (
        <div>
            <h1>Log into your account</h1>
            <form>

                <label htmlFor="email"></label>
                <input 
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email:"
                    required
                />

                <label htmlFor="password"></label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password:"
                    required
                />

                <button type="submit">Log in</button>
            
            </form>
        </div>
    );

}

export default Login;