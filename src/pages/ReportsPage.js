import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../components/header/Header";

const ReportsPage = () => {
    const history = useHistory();

    useEffect(() => {
        if(!localStorage.getItem('valid') || !localStorage.getItem('account')) {
            history.push('/');
        }
    });

    return(
        <React.Fragment>
            <div className="ui container banner">
                Settings<br/>
                Reports
            </div>
            <div className="ui container container-width">
                <div>
                    <Header />
                </div>
            </div>
            <div className="ui container home">
                <h1>Reports Page</h1>
                <h3>Under Construction</h3>
            </div>
        </React.Fragment>
    );
}
export default ReportsPage;