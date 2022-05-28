import {
    ADD_ENTRY,
    REMOVE_ENTRY,
    CHANGE_DUE,
    CHECK_OUT,
    PAYMENT_AMOUNT,
    UPDATE_TOTAL,
    CLEAR_ARRAY,
    MODE,
    UPDATE_TRANSACTION,
    KEY_NUM,
    normal,
    percent_off,
    dollar_off,
    gift_card,
    remove_item,
    user_login,
    USER_LOGGED
} from "../actions/types";

export const transactionReducer = (currentArray = [], action) => {
    if (action.type === ADD_ENTRY) {
        return [...currentArray, action.payload]
    }
    if (action.type === UPDATE_TRANSACTION) {
        let tempArray = [...currentArray]
        for (let i = 0; i < tempArray.length; i++){
            if (tempArray[i].key === action.payload.key){
                tempArray[i].value = action.payload.value;
                tempArray[i].data += action.payload.data;
            }
        }
        return tempArray
    }
    
    if (action.type === REMOVE_ENTRY){
        const tempArray = [...currentArray];
        for(let i = 0; i < tempArray.length; i++){
            if(tempArray[i].key === action.payload){
                tempArray[i].active = 'n';
            }
        }
        return tempArray;
    }

    if (action.type === CLEAR_ARRAY) {
        const tempArray = [...currentArray];
        while(tempArray.length > 0){
            tempArray.pop();
        }
        return tempArray;
    }
    return currentArray;
}

export const keyNumReducer = (keyNum = 1, action) => {
    if (action.type === KEY_NUM) {
        return action.payload;
    }
    return keyNum;
}

export const totalReducer = (currentTotal = 0, action) => {
    if (action.type === UPDATE_TOTAL){
        return action.payload;
    }
    return currentTotal;
}

export const checkOutReducer = (checkout = false, action) => {
    if (action.type === CHECK_OUT){
        return action.payload;
    }
    return checkout;
}

export const updatePaymentAmountReducer = (paymentAmount = 0, action) => {
    if(action.type === PAYMENT_AMOUNT) {
        return action.payload;
    }
    return paymentAmount;
}

export const updateChangeDueReducer = (changeDue = 0, action) => {
    if (action.type === CHANGE_DUE) {
        return action.payload;
    }
    return changeDue;
}

export const modeReducer = (discountMode = normal, action) => {
    if (action.type === MODE) {
        switch(action.payload) {
            case percent_off:
                return percent_off
            case dollar_off:
                return dollar_off
            case gift_card:
                return gift_card
            case normal:
                return normal
            case remove_item:
                return remove_item
            case user_login:
                return user_login    
            default:
                break;           
        }
    }
    return discountMode;
}

export const userLoggedInReducer = (isLoggedIn = {user:null, title:null}, action) => {
    if (action.type === USER_LOGGED){
        return action.payload;
    }
    return isLoggedIn;
}