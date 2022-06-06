import React from "react";

import { useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'

import "../../styles/app.css"

const InputScreen = (props) => {
    const history = useHistory();
    const user = useSelector(state=>state.userLoggedIn.user);
    let settingsCounter = 0;

    const settingsLogin = () => {
        if(user === null) return;
        settingsCounter += 1;
        if (settingsCounter === 2){
            history.push('/home');
        }
        setTimeout(() => {
            settingsCounter = 0;
        }, 500);
    }
    
    return (
        <div className="size">
            <div className="dis">
                <h3>{props.displayValue}</h3>
            </div>
            <div className="ui four column grid grid-layout">
                <div className="row row-row">
                    <div className="column column-column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('7')}>
                            7
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('8')}>
                            8
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('9')}>
                            9
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside checkout" onClick={()=>props.finishTransaction(true)}>
                            Checkout
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('4')}>
                            4
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('5')}>
                            5
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('6')}>
                            6
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.clearDisplayScreen()}>
                            Clear
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('1')}>
                            1
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('2')}>
                            2
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('3')}>
                            3
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('*')}>
                            X
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('0')}>
                            0
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> props.updateDisplayScreen('00')}>
                            00
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside" onClick={()=> settingsLogin()} >
                            Settings
                            <div style={{color:'red', fontSize:'.9rem'}}>
                                Double click
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="inside enter" onClick={()=> props.enterValue()}>
                            Enter
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
}    

export default (InputScreen);