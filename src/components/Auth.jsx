import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import './Auth.css'
const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };

    axios
      .post(register ? `register` : `login`, body)
      .then((res) => {
        console.log("After Auth", res.data);
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
      })
      .catch((err) => {
        setPassword("");
        setUsername("");
        console.log(err);
      });
  };

  return (
    <main className="text-white">
      <h1 className="auth-h1">Welcome!</h1>
      <h2 className="auth-h2">Please login or register</h2>
      <form className="auth-form"
      onSubmit={submitHandler}>
        <input
        className="auth-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <div>
      <button className="register-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
      </div>
    </main>
  );
};

export default Auth;
