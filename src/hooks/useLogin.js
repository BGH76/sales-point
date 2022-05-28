// import React from "react";
import { useDispatch } from 'react-redux';
import { userLoggedIn } from "../actions";
import { useHistory } from "react-router-dom";
import { httpGetAccountInfo, httpGetEmployeePinNumbers } from "../hooks/requests";


const useLogin = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleLogin = async (formValues) => {
        if(formValues.username === '' || formValues.password === '') return;
       const response = await httpGetAccountInfo(formValues);
        if(response.body.valid === 'valid') {
            localStorage.setItem("valid", true);
            localStorage.setItem("account", response.body.account);
            setTimeout(()=> history.push('/main'), 500);
        } else {
            console.log("Your login failed");
            return 'invalid'
        }
    }

    const handleLogOut = () => {
        localStorage.removeItem("valid");
        localStorage.removeItem("account");
        history.push('/');
    }

    const userLogin = async (user) => {
        const response = await httpGetEmployeePinNumbers(localStorage.getItem('account'));
        response.forEach(idx => {
            if(idx.pinnum === user){
                dispatch(userLoggedIn({user: idx.pinnum, title: idx.title}));
                return;
            }
        })
    }

    return {
        handleLogin,
        handleLogOut,
        userLogin
    }
}
export default useLogin;