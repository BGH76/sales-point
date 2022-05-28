import { combineReducers } from "redux";

import {
    checkOutReducer,
    updatePaymentAmountReducer,
    transactionReducer,
    totalReducer,
    updateChangeDueReducer,
    modeReducer,
    keyNumReducer,
    userLoggedInReducer,
} from "./transactionReducer";

export default combineReducers({
    transactionArray: transactionReducer,
    total: totalReducer,
    checkout: checkOutReducer,
    paymentAmount: updatePaymentAmountReducer,
    changeDue: updateChangeDueReducer,
    mode: modeReducer,
    keyNumCounter: keyNumReducer,
    userLoggedIn: userLoggedInReducer,
});