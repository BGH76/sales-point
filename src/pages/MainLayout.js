import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import ActionScreen from "../components/actionScreen/ActionScreen";
import DisplayScreen from "../components/displayScreen/DisplayScreen";
import InputScreen from "../components/inputScreen/InputScreen";
import PermanentKeys from "../components/permanentKeys/PermanentKeys";
import TransactionScreen from "../components/transactionScreen/TransactionScreen";

import useInput from '../hooks/useInput'

import '../styles/app.css';

const MainLayout = () => {
 
    const { clearDisplayScreen, enterValue, updateDisplayScreen, finishTransaction, suspendTransaction,resetScreen, displayValue} = useInput();
    const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('valid') || !localStorage.getItem('account')) {
            history.push('/');
        }

    });

    return(
        <React.Fragment>
            <div className="ui container main-screen">
                <div className="ui two column wide grid m-0">
                    <div className="row" style={{padding:'0'}}>
                        <div className="column" style={{border: 'solid',borderWidth:'1px', textAlign: 'center', paddingTop:'5px'}}>
                            <TransactionScreen />
                        </div>
                        <div className="column" style={{padding: '25px'}}>
                            <PermanentKeys />
                        </div>
                    </div>
                    <div className="row" style={{padding: '0'}}>
                        <div className="column">
                            <div className="display-screen-div" style={{textAlign: 'center'}}>
                                <DisplayScreen />
                            </div>
                            <div className="action-screen-div">
                                <ActionScreen 
                                suspendTransaction={suspendTransaction}
                                resetScreen={resetScreen}
                                />
                            </div>
                        </div>
                        <div className="column">
                            <InputScreen 
                                updateDisplayScreen={updateDisplayScreen}
                                displayValue={displayValue}
                                enterValue={enterValue}
                                clearDisplayScreen={clearDisplayScreen}
                                finishTransaction={finishTransaction}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    
    );
}
export default MainLayout;
