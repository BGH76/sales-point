import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from '../components/header/Header';

import { httpUpdateEmployee, httpGetEmployees } from "../hooks/requests";

import '../styles/app.css';

const UpdateEmployee = () => {
    const history = useHistory();
    const [updateArray, setUpdateArray] = useState([]);
    const [thumbsUp, setThumbsUp] = useState('hidden');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    // const [title, setTitle] = useState('');
    const [pinnum, setPinnum] = useState('');

    useEffect(() => {
        if(!localStorage.getItem('valid') || !localStorage.getItem('account')) {
            history.push('/');
        }
    })
    
     useEffect(()=> {
        async function fetchData(){

            const temp = await httpGetEmployees(localStorage.getItem('account'));
            console.log(temp);
            temp.sort(function(a, b) {
                const nameA = a.firstname.toUpperCase();
                const nameB = b.firstname.toUpperCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
            })
            setUpdateArray(temp);
        }
        fetchData();
     },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        let temp = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            title: event.target.title.value,
            pinnum: event.target.pinnum.value,
        }
        httpUpdateEmployee(temp)
        .then(()=>{
            setThumbsUp('');
            setTimeout(()=>setThumbsUp('hidden'),500);
            history.push('/updateemp');
        })
        // setThumbsUp('');
        // setTimeout(()=>setThumbsUp('hidden'),500);
        // history.push('/updateemp');
    }

    const selectEmployee =  (ft, lt, t, p) => {
        setFirstname(ft);
        setLastname(lt);
        // setTitle(t);
        setPinnum(p)
    }

    const renderList = () => {
        if(updateArray === undefined) return;
        return updateArray.map((ar) => {
            return (
                <tr key={ar.pinnum} className='list' onClick={()=>selectEmployee(ar.firstname, ar.lastname, ar.title, ar.pinnum)}>
                    <td>{ar.firstname}</td>
                    <td>{ar.lastname}</td>
                    <td>{ar.pinnum}</td>
                    <td>{ar.title}</td>
                </tr>
            );
        })
    }

    return (
        <React.Fragment>
            <div className="ui container banner">
                Settings <br/>
                Update Employee
            </div>
            <div className="ui container container-width">
                <div>
                    <Header />
                </div>
                <form onSubmit={handleSubmit} className="ui form error">
                    <div className="ui two column grid">
                        <div className="row">
                            <div className="column">
                                <div className="field field-login title">
                                    <label>First Name</label>
                                    <input name='firstname' value={`${firstname}`} onChange={(e)=>setFirstname(e.target.value)} onClick={()=>setFirstname('')} placeholder="First Name"></input>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field field-login title">
                                    <label>Last Name</label>
                                    <input name='lastname' value={`${lastname}`} onChange={(e)=>setLastname(e.target.value)} onClick={()=>setLastname('')} placeholder="Last Name"></input>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field field-login title">
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
                                <div className="field field-login title">
                                    <label>Pin Number</label>
                                    <input name='pinnum' value={`${pinnum}`} onChange={(e)=>setPinnum(e.target.value)} onClick={()=>setPinnum('')} placeholder="Pin Number"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="ui button blue large">Submit</button>
                    <i className={`thumbs up icon ${thumbsUp}`} />
                </form>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Pin Number
                            </th>
                            <th>
                                Title
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderList()}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
    
}

export default UpdateEmployee;