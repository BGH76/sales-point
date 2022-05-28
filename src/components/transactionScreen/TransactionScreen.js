import React from "react";
import { connect } from 'react-redux';

import '../../styles/app.css';

class TransactionScreen extends React.Component {

    renderTransactions() {
        if(this.props.transactionArray === undefined){
            return;
        }
        return this.props.transactionArray.map(t => {
            return(
                <p key={t.key} className={t.active==='y'?'':'strike'}>
                    {`${t.key} :  ${t.data}`}
                </p>
            );   
        })
    }

    render(){
        return(
            <React.Fragment>
                <h3>Transaction Screen</h3>
                <br />
                {this.renderTransactions()}
                <hr />
                <h3>{`Total: $ ${this.props.total.toFixed(2)}`}</h3>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        transactionArray: state.transactionArray,
        total: state.total
    }
}

export default connect(mapStateToProps)(TransactionScreen);