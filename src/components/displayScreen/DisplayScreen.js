import React from "react";

import { connect } from 'react-redux'

import '../../styles/app.css';

class DisplayScreen extends React.Component{

    renderDisplayScreen = () =>{
        if(this.props.checkout){
            return(
                <React.Fragment>
                    <div className="sp">
                        {`Total Amount: $ ${this.props.total.toFixed(2)}`}
                    </div>
                    <div className="sp">
                        {`Enter Payment Amount: $ ${this.props.paymentAmount.toFixed(2)}`}
                    </div>
                    <div className="sp">
                        <h3 className='changedue'>{`Change Due: $ ${this.props.changeDue.toFixed(2)}`}</h3>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <h4>************</h4>
            );
        }
    }

    render() {
        return (
            <>
                {this.renderDisplayScreen()}
            </>
            
            
        );

    }
}

 const mapStateToProps = (state) => {
     return {
         total: state.total,
         checkout: state.checkout,
         paymentAmount: state.paymentAmount,
         changeDue: state.changeDue
     }
 }

export default connect(mapStateToProps)(DisplayScreen);