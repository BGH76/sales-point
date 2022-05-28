import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import AddEmployee from "./pages/AddEmployee";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./pages/MainLayout";
import QuickActions from "./pages/QuickActions";
import ReportsPage from "./pages/ReportsPage";
import UpdateEmployee from "./pages/UpdateEmployee";

import './styles/app.css'

const App = () => {
    return (
        <div className="app">
            <BrowserRouter >
                <div className="">
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/reports' exact component={ReportsPage} />
                    <Route path='/create' component={CreateAccount} /> 
                    <Route path='/main' exact component={MainLayout} />
                    <Route path='/addemp' exact component={AddEmployee} />
                    <Route path='/updateemp' exact component={UpdateEmployee} />
                    <Route path='/quickactions' exact component={QuickActions} />

                </div>
            </BrowserRouter>  
        </div>
    );
}
export default App;
