import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from '../components/header/Header';

import { httpAddEmployee, httpGetEmployeePinNumbers } from "../hooks/requests";

import '../styles/app.css'
let tempPin = [];

const AddEmployee = () => {  
    const history = useHistory();  
    const [thumbsUp, setThumbsUp] = useState('hidden');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [pinnum, setPinnum] = useState('');
    const [error, setError] = useState('hidden');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if(!localStorage.getItem('valid') || !localStorage.getItem('account')) {
            history.push('/');
        }
    })

    useEffect(async () => {
        let temp = await httpGetEmployeePinNumbers(localStorage.getItem('account'));
        console.log(`Account number is: ${localStorage.getItem('account')}`)
        for(let i=0; i<temp.length; i++) {
            tempPin.push(temp[i].pinnum);
        }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Number.isInteger(Number(e.target.pinnum.value))=== false || Number(e.target.pinnum.value) > 9999 || Number(e.target.pinnum.value)< 1000){
            setError('');
            setErrorMessage("Valid 4 digit pin number required");
            return;
        }
        if(tempPin.includes(pinnum)){
            setError('');
            setErrorMessage("Error: Pin number already in use");
            return;
        }
        if(!localStorage.getItem('account')) return;
        if(!e.target.title.value) e.target.title.value = 'employee'; 
        const temp = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            title: e.target.title.value,
            pinnum: e.target.pinnum.value,
            account_number: localStorage.getItem('account')
        }
        httpAddEmployee(temp);
        setThumbsUp('');
        setTimeout(()=>setThumbsUp('hidden'),500);
        e.target.reset();
        setFirstname('');
        setLastname('');
        setPinnum('');
        while(tempPin.length > 0) {
            tempPin.pop();
        }
    }

    const handlePinNumber = (e) => {
        setPinnum(e.target.value);
        setError('hidden');
    }
        
    return(
        <React.Fragment>
            <div className="ui container banner">
                Settings<br/>
                Add Employee
            </div>
            <div className="ui container container-width">
                <div>
                    <Header />
                </div>
                <form onSubmit={handleSubmit} className="ui form error">
                    <div className="ui two column grid">
                        <div className="row">
                            <div className="column">
                                <div className="field field-login title required">
                                    <label>First Name</label>
                                    <input name='firstname' value={`${firstname}`} onChange={(e)=> setFirstname(e.target.value)} placeholder="First Name"></input>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field field-login title required">
                                    <label>Last Name</label>
                                    <input name='lastname' value={`${lastname}`} onChange={(e)=> setLastname(e.target.value)} placeholder="Last Name"></input>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field field-login title required">
                                    <label>Title</label>
                                    <div className="radio-btns">
                                        <input name='title' type='radio' value='employee' />
                                        <label className="radio-label">Employee</label>
                                        <input name='title' type='radio' value='manager' />
                                        <label className="radio-label">Manager</label>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field field-login title required">
                                    <label>Pin Number</label>
                                    <input name='pinnum' value={`${pinnum}`} onChange={(e)=>handlePinNumber(e)} onClick={()=>setError('hidden')} placeholder='Pin Number'></input>
                                </div>
                                <div className={`login error ${error}`} style={{color: 'red'}} >
                                    {errorMessage}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="ui button blue large">Submit</button>
                    <i className={`thumbs up icon ${thumbsUp}`} />
                </form>
            </div>
        </React.Fragment>
    );
    
}

export default AddEmployee;