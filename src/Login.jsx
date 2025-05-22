import './Login.css';



function Login() {
  return (
    <div className="Login">
        <main className="Login-main">
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" name="username" />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </main>
    </div>
  );
}

export default Login;
