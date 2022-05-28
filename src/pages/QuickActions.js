import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from '../components/header/Header';

import { httpGetQuickActions, httpUpdateQuickActions } from "../hooks/requests";

import '../styles/app.css';

const QuickActions = () => {
    const history = useHistory();
    const [quickArray, setQuickArray] = useState([]);
    const [id, setId] = useState('');
    const [service, setService] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [active, setActive] = useState('');

    useEffect(() => {
        if(!localStorage.getItem('valid') || !localStorage.getItem('account')) {
            history.push('/');
        }
    });
    
    useEffect (() => {
        async function fetchData(){
            const temp = await httpGetQuickActions(localStorage.getItem('account'));
            temp.sort(function (a, b) {
                return a.id - b.id;
            });
            setQuickArray(temp);
        }
        fetchData();
    },[]);
    
    const handleSubmit = (event) => {
        let temp = {
            id: event.target.id.value,
            service: event.target.service.value,
            description: event.target.description.value,
            value: event.target.value.value,
            active: event.target.active.value
        }
        httpUpdateQuickActions(temp);
    }
    
    const selectQuickAction = (id, service, description, value, active) => {
        setId(id);
        setService(service);
        setDescription(description);
        setValue(value);
        setActive(active);
    }

    const renderList = () => {
        return quickArray.map((ar) => {
            return (
                <tr key={ar.id} className='list' onClick={()=>selectQuickAction(ar.id, ar.service, ar.description, ar.value, ar.active)}>
                    <td>{ar.service}</td>
                    <td>{ar.description}</td>
                    <td>{ar.value}</td>
                    <td>{ar.active.toString()}</td>
                </tr>
            );
        })
    }
        return(
            <React.Fragment>
                <div className="ui container banner">
                    Settings<br/>
                    QuickAcions
                </div>
                <div className="ui container container-width">
                    <Header />
                    <form onSubmit={handleSubmit} className="ui form">
                        <div className="ui five column grid">
                            <div className="row">
                                <div className="column">
                                    <label>Id</label>
                                    <input name='id' value={`${id}`} disabled={true}  placeholder="id"></input>
                                </div>
                                <div className="column">
                                    <label>Service</label>
                                    <input name='service' value={`${service}`} onChange={(e)=> setService(e.target.value)} onClick={()=>setService('')} placeholder="service"></input>
                                    
                                </div>
                                <div className="column">
                                    <label>Description</label>
                                    <input name='description' value={`${description}`} onChange={(e)=>setDescription(e.target.value)} onClick={()=>setDescription('')} placeholder="description"></input>
                                </div>
                                <div className="column">
                                    <label>Value</label>
                                    <input name='value' value={`${value}`} onChange={(e)=>setValue(e.target.value)} onClick={()=>setValue('')} placeholder="Value"></input>
                                </div>
                                <div className="column">
                                    <label>Active</label>
                                    <input name='active' value={`${active}`} onChange={(e)=>setActive(e.target.value)} onClick={()=>setActive('')} placeholder="true"></input>
                                </div>
                            </div>
                            <button className="ui right floated button blue">Submit</button>
                        </div>
                    </form>
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>
                                    Service
                                </th>
                                <th>
                                    Description
                                </th>
                                <th>
                                    Value
                                </th>
                                <th>
                                    Active
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

export default (QuickActions);