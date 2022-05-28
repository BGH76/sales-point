import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'

import Header from "../components/header/Header";

import useLogin from "../hooks/useLogin";

const Home = () => {
    const {handleLogOut} = useLogin();
    const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('valid') || !localStorage.getItem('account')) {
            history.push('/');
        }
    });

    const logOut = () => {
        console.log("handle log out clicked")
        handleLogOut();
    }
    return (
        <React.Fragment>
            <div className="ui container banner">
                Settings<br/>
                Home Page
            </div>
            <div className="ui container container-width">
                <div>
                    <Header />
                </div>
            </div>
            <div className="ui container">
                <div className="home">
                    <button className="ui button primary large" onClick={()=> logOut()}>Logout</button>
                </div>
            </div>
        </React.Fragment>
    );
}
export default Home;