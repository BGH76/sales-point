import React, { useState, useEffect } from "react";

import { useHistory } from 'react-router-dom';

import { httpSetUpAccount, httpGetPinNumber } from "../hooks/requests";

import '../styles/app.css'

const CreateAccount = () => {
    const history = useHistory();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [pinnum, setPinnum] = useState('');
    const [password, setPassword] = useState('');
    const [ passwordTwo, setPasswordTwo] = useState('');
    const [error, setError] = useState('hidden');
    const [message, setMessage] = useState('');
    let tempPin = [];

    useEffect(() => {
        if(localStorage.getItem('valid') || localStorage.getItem('account')) {
            history.push('/main');
        }
    });

    useEffect(() => {
        async function fetchData(){
            let temp = await httpGetPinNumber(localStorage.getItem('account'));
            for(let i=0; i<temp.length; i++) {
                tempPin.push(temp[i].pinnum);
            }
        }
        fetchData();
    });
  
    const handleSubmit = (e) => {
        e.preventDefault();
        if(tempPin.includes(pinnum)) { 
            setMessage("Error: Pin number already used");
            setError('');
            return;
        }
        else if (firstname==='' || lastname==='' || email==='' || password==='' || passwordTwo==='' || pinnum==='') {
            setMessage("Error: Please complete all fields");
            setError('');
            return;
        }
        else if (password !== passwordTwo) {
            setMessage("Error: Passwords must match");
            setError('');
            return;
        }        
        const newValues = {
            firstname: firstname,
            lastname: lastname,
            mail: email,
            password: password,
            pinnum: pinnum
        }
        httpSetUpAccount(newValues);
        history.push('/');
    }

    const renderInput = (itemLabel, itemName, itemValue, itemSetName, itemPlaceHolder) => {
        const className = `field field-login title required`;
        return (
            <div className={className}>
                <label>{itemLabel}</label>
                <input name={itemName} value={itemValue} onChange={(e)=>{itemSetName(e.target.value)}} onFocus={()=>setError('hidden')} placeholder={itemPlaceHolder} />
            </div>
        );
    }

    
    return (
        <React.Fragment>
            <div className="ui container login-container">
                <h1>Create Your Account</h1>
                <form onSubmit={handleSubmit} className="ui form error">
                    {renderInput('First Name', 'firstname', firstname, setFirstname, 'First Name')}
                    {renderInput('Last Name', 'lastname', lastname, setLastname, 'Last Name')}
                    {renderInput('Email', 'email', email, setEmail, 'Email')}
                    {renderInput('Pin Number', 'pinnumber', pinnum, setPinnum, 'Pin Number')}
                    {renderInput('Password', 'password', password, setPassword, 'Password')}
                    {renderInput('Password', 'passwordTwo', passwordTwo, setPasswordTwo, 'Retype Password')}
                    <button className="ui button blue btn-login">Submit</button>
                    <button className="ui button blue btn-login" onClick={()=>history.push('/')}>Back to Login</button>
                </form>
                <div className={`login error ${error}`} style={{color: 'red'}}>
                        {message}
                    </div>
            </div>
        </React.Fragment>
    ); 
}

export default CreateAccount;
              
                    