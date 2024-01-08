const Register = () => {

    return (
        <div>
            <h1>Sign up for an account</h1>
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

                <label htmlFor="passwordVerify"></label>
                <input 
                    type="password"
                    id="passwordVerify"
                    name="passwordVerify"
                    placeholder="Confirm paswsword:"
                    required
                />

                <button type="submit">Create account</button>
            
            </form>
        </div>
    );

}

export default Register;