import React from "react";
import { connect } from 'react-redux'

import { actionMode, userLoggedIn, clearTransactionArray, updateTotal, updateKeyNumCounter } from "../../actions";

import "../../styles/app.css"

class ActionScreen extends React.Component {
    state = {
        suspendedStatus: false,
    }
    suspendedStatusHelper = () => {
        if (this.props.transactionArray.length > 0 || this.state.suspendedStatus === true) {
            this.props.suspendTransaction();
            return this.state.suspendedStatus ? this.setState({suspendedStatus: false}): this.setState({suspendedStatus: true});
        }
    }

    actionModeHelper = (mode) => {
        if (this.props.transactionArray.length > 0) {
            this.props.actionMode(mode);
        }
        return; 
    } 
    
    userLoginHelper = (mode) => {
        if(this.props.user===null){
            this.props.actionMode(mode);
        }
        else if(this.props.user !== null) {
            this.props.userLoggedIn({user:null, title:null});
            this.props.clearTransactionArray();
            this.props.updateTotal(0);
            this.props.updateKeyNumCounter(0);
        } 
    }   

    render() {
        return(
            <React.Fragment>
                <div className="ui three column grid">
                    <div className="row inside-column">
                        <div className="column">
                            <div className="inside-action-screen one" onClick={() => this.actionModeHelper('percent_off')}>
                                % percent off
                            </div>
                        </div>
                        <div className="column">
                            <div className="inside-action-screen two" onClick={() => this.actionModeHelper('dollar_off')}>
                                $ Off
                            </div>
                        </div>
                        <div className="column">
                            <div className={`inside-action-screen three ${this.props.mode==='remove_item'?'active':''}`} onClick={() => this.actionModeHelper('remove_item')}>
                                Remove Item
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column">
                            <div className={`inside-action-screen four ${this.state.suspendedStatus=== true?'active':''}`} onClick={() => this.suspendedStatusHelper()}>
                                {this.state.suspendedStatus === true ? 'click to Unsuspend': 'Suspend'} 
                            </div>
                        </div>
                        <div className="column">
                            <div className="inside-action-screen eight" onClick={() => this.props.resetScreen()}>
                                Cancel Transaction
                            </div>
                        </div>
                        <div className="column">
                            <div className="inside-action-screen seven" onClick={() => this.userLoginHelper('user_login')}>
                                {this.props.user===null? "Login": "Logout"}
                                <p style={{textAlign:'center', color: 'red'}}>Demo pin 2222</p>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{marginLeft: '5px'}}>
                        Account# {localStorage.getItem('account')}
                        <br />
                        {`Logged In User: ${this.props.user}`}
                    </div>
                </div>
            </React.Fragment>
                
        );
    };

    
}

const mapStateToProps = state => {
    return {
        mode: state.mode,
        transactionArray: state.transactionArray,
        user: state.userLoggedIn.user
    }
}

export default connect(mapStateToProps, { actionMode, userLoggedIn, clearTransactionArray, updateTotal, updateKeyNumCounter })(ActionScreen);

