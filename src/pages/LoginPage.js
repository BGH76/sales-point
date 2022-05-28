import React, {useState} from "react";

import { Link } from 'react-router-dom'

import useLogin from "../hooks/useLogin";

import '../styles/app.css'

const LoginPage = () => {
    const {handleLogin} = useLogin();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('hidden');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const temp = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        const result = await handleLogin(temp);
        if (result === 'invalid') {
            console.log(result);
            setError('');
        }
    }

        return (
            <React.Fragment>
                <div className="ui container login-container">
                    <h1>Welcome to the Login Page</h1>
                    <form onSubmit={handleSubmit} className="ui form error">
                        {/* <Field name="username" component={this.renderInput} label="Username" /> */}
                        <div className="field field-login">
                            <label>Username</label>
                            <input name='username' value={`${username}`} onChange={(e)=> setUsername(e.target.value)} onFocus={()=>setError('hidden')} placeholder="Username"></input>
                        </div>
                        {/* <Field name="password" component={this.renderInput} label="Password" /> */}
                        <div className="field field-login">
                            <label>Password</label>
                            <input name='password' value={`${password}`} onChange={(e)=> setPassword(e.target.value)} onFocus={()=>setError('hidden')} placeholder="Password"></input>
                        </div>
                        <button className="ui button blue btn-login">Login</button>
                        <Link to={`/create`} className="ui button blue btn-login">Create Account</Link>
                    </form>
                    <div className={`login error ${error}`} style={{color: 'red'}}>
                        Error: Invalid Username or Password
                    </div>
                </div>
            </React.Fragment>
        );
}


export default LoginPage;
