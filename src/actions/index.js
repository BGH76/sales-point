
import { ADD_ENTRY,
    CHANGE_DUE,
    PAYMENT_AMOUNT,
    UPDATE_TOTAL,
    CHECK_OUT,
    CLEAR_ARRAY,
    MODE,
    REMOVE_ENTRY,
    UPDATE_TRANSACTION,
    KEY_NUM,
    USER_LOGGED } from "./types";

export const addTransaction = (str) => {
    return {
        type: ADD_ENTRY,
        payload: str
    };
}

export const updateKeyNumCounter = (num) => {
    return {
        type: KEY_NUM,
        payload: num
    }
}

export const updateTransaction = (key, value, data) => {
    return {
        type: UPDATE_TRANSACTION,
        payload: {
            key: key,
            value: value,
            data: data
        }
    }
}

export const removeEntry = (num) => {
    return {
        type: REMOVE_ENTRY,
        payload: num
    }
}

export const clearTransactionArray = () => {
    return {
        type: CLEAR_ARRAY
    }
}


export const updateTotal = (num) => {
    return {
        type: UPDATE_TOTAL,
        payload: num
    }
}

export const checkOut = (x) => {
    return {
        type: CHECK_OUT,
        payload: x
    }
}

export const updatePaymentAmount = (num) => {
    return {
        type: PAYMENT_AMOUNT,
        payload: num
    }
}

export const updateChangeDue = (num) => {
    return {
        type: CHANGE_DUE,
        payload: num
    }
}

export const actionMode = (index) => {
    return {
        type: MODE,
        payload: index
    }  
}

export const userLoggedIn = (data) => {
    return {
        type: USER_LOGGED,
        payload: data
    }
}
