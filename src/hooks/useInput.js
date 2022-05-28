import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { normal, percent_off, dollar_off, remove_item, user_login } from '../actions/types'

import {
    addTransaction,
    checkOut,
    updateChangeDue,
    updateTotal,
    updatePaymentAmount,
    clearTransactionArray,
    actionMode,
    removeEntry,
    updateTransaction,
    updateKeyNumCounter
} from '../actions';
import useLogin from './useLogin';


const subState = {
    primaryValue: '',
    discountValue: '',
    discountKeyNumValue: '',
    discountKeyNumSelected: false,
    multiplier: false,
    multiplyBy: '1',
    transactionSuspended: false,
    suspendedArray: [],
    suspendedTotal: 0,
}

function useInput() {
    const { userLogin } = useLogin();
    const [displayValue, setDisplayValue] = useState('$')

    const mode = useSelector(state=>state.mode);
    const checkout = useSelector(state => state.checkout);
    const total = useSelector(state => state.total);
    const transactionArray = useSelector(state => state.transactionArray);
    const keyNumCounter = useSelector(state => state.keyNumCounter);
    const user = useSelector(state => state.userLoggedIn.user);
    const dispatch = useDispatch();
  
    useEffect(() =>{
        if(mode === normal) setDisplayValue('$');
        if(mode === percent_off) setDisplayValue('Enter item number to discount');
        if(mode === dollar_off) setDisplayValue('Enter item number to discount');
        if(mode === remove_item) setDisplayValue('Enter item number to remove');
        if(mode === user_login) {
            setDisplayValue("Enter User Pin Number: ")
            subState.primaryValue = '';
        }
    },[mode])

    const updateDisplayScreen = (value) => {  
        if(value === '*'){
            if(subState.primaryValue === '') return;
            subState.multiplier = true;
            subState.multiplyBy = '';
            setDisplayValue(`$ ${Number(subState.primaryValue/100).toFixed(2)} X `);
        }
        else {
            if(subState.multiplier) {
                subState.multiplyBy += value;
                setDisplayValue(`$ ${(Number(subState.primaryValue/100).toFixed(2))} X ${Number(subState.multiplyBy)}`);
            } else {
                switch(mode){
                    case normal:
                        subState.primaryValue = subState.primaryValue + value;
                        setDisplayValue(`$ ${Number(subState.primaryValue/100).toFixed(2)}`);
                        break;
                        
                    case percent_off:
                        if(subState.discountKeyNumSelected === false) {
                            subState.discountKeyNumValue = subState.discountKeyNumValue + value;
                            setDisplayValue(Number(subState.discountKeyNumValue));
                        } else {
                            subState.discountValue = subState.discountValue + value;
                            setDisplayValue(`${subState.discountValue} % OFF`);
                        }
                        break;

                    case dollar_off:
                        if(subState.discountKeyNumSelected === false) {
                            subState.discountKeyNumValue = subState.discountKeyNumValue + value;
                            setDisplayValue(Number(subState.discountKeyNumValue));
                        } else {
                            subState.discountValue = subState.discountValue + value;
                            setDisplayValue(`$ ${Number(subState.discountValue/100).toFixed(2)} OFF`);
                        }
                        break;

                    case remove_item:
                        subState.primaryValue = subState.primaryValue + value;
                        setDisplayValue(`Remove Item: ${Number(subState.primaryValue)}`);
                        break;

                    case user_login:
                        subState.primaryValue = subState.primaryValue + value;
                        setDisplayValue(displayValue + value);  
                        break;

                    default:
                        break;   
                }
            }
        }
    }

    const suspendTransaction = () => {
        if (!subState.transactionSuspended && transactionArray.length > 0) {
            subState.suspendedArray = [...transactionArray];
            subState.suspendedTotal = total;
            dispatch(updateTotal(0));
            dispatch(clearTransactionArray());
            dispatch(updateKeyNumCounter(1));
            subState.transactionSuspended = true;
        }
        else {
            if (transactionArray.length === 0 && subState.suspendedArray.length > 0) {
                dispatch(updateKeyNumCounter(subState.suspendedArray.length + 1));
                for(let i=0; i<subState.suspendedArray.length; i++){
                    dispatch(addTransaction(subState.suspendedArray[i]))
                }
                dispatch(updateTotal(subState.suspendedTotal));
                subState.suspendedTotal = 0;
                while(subState.suspendedArray > 0){
                    subState.suspendedArray.pop();
                }
                subState.transactionSuspended = false;
            }
        }
    }

    const enterValue = () => {
        if(user===null && mode !== user_login){
            setDisplayValue("Please login");
            subState.primaryValue = '';
            return
        }
        if ((subState.primaryValue === '' || Number(subState.primaryValue)===0) && subState.discountValue === '' && Number(subState.discountKeyNumValue) === 0){
            return;
        }
        if(checkout) {
            dispatch(updatePaymentAmount(Number(subState.primaryValue/100)));
            let tempChange = Number(subState.primaryValue/100) - total;
            dispatch(updateChangeDue(tempChange));
            return;
        }
        if(mode === normal){
            dispatch(updateKeyNumCounter(keyNumCounter + 1));
            dispatch(updateTotal(total + Number((subState.primaryValue * Number(subState.multiplyBy))/100)));
            dispatch(addTransaction({key:keyNumCounter, value: Number(subState.primaryValue * subState.multiplyBy/100), active: 'y', discount: 'n', data:`$${Number(subState.primaryValue/100).toFixed(2)} @ ${subState.multiplyBy} = ${Number((subState.primaryValue/100 * subState.multiplyBy)).toFixed(2)}`}));
        }
        if(mode === percent_off){
            if(subState.discountKeyNumSelected === false) {
                setDisplayValue('Enter % off');
                subState.discountKeyNumSelected = true;
                return;
            } else {
                if(Number(subState.discountValue) >= 100){
                setDisplayValue('Enter a percentage less than 100');
                return;
            }
            let tempVal = 0
            for (let i = 0; i < transactionArray.length; i++){
                if(transactionArray[i].key === Number(subState.discountKeyNumValue)){
                    tempVal = transactionArray[i].value;
                } 
            }
            dispatch(updateTotal(total - tempVal * Number(subState.discountValue/100))); 
            dispatch(updateTransaction(Number(subState.discountKeyNumValue), (tempVal * Number(subState.discountValue/100)).toFixed(2), `(%${subState.discountValue} off = ${(tempVal*Number(subState.discountValue/100)).toFixed(2)})`))
            subState.discountValue = ''
            subState.discountKeyNumValue = ''
            subState.discountKeyNumSelected = false
            }
        }

        if(mode === dollar_off) {
            if(subState.discountKeyNumSelected === false) {
                setDisplayValue('Enter $ amount');
                subState.discountKeyNumSelected = true;
                return;
            } else {
            let tempVal = 0
            for (let i = 0; i < transactionArray.length; i++){
                if(transactionArray[i].key === Number(subState.discountKeyNumValue)){
                    tempVal = transactionArray[i].value;
                } 
            }
            dispatch(updateTotal(total - Number(subState.discountValue/100))); 
            dispatch(updateTransaction(Number(subState.discountKeyNumValue), (tempVal - Number(subState.discountValue/100)).toFixed(2), `($${Number(subState.discountValue/100).toFixed(2)} off = ${(tempVal-Number(subState.discountValue/100)).toFixed(2)})`))
            subState.discountValue = ''
            subState.discountKeyNumValue = ''
            subState.discountKeyNumSelected = false
            }
        }
        if(mode === remove_item) {
            for (let i = 0; i < transactionArray.length; i++){
                if (transactionArray[i].key === Number(subState.primaryValue)){ 
                    if (transactionArray[i].active === 'n') return;
                    dispatch(updateTotal(total - transactionArray[i].value));
                }
            }
            dispatch(removeEntry(Number(subState.primaryValue))); 
        }
        if(mode === user_login) {
            userLogin(subState.primaryValue);
        }
        setDisplayValue('$');
        subState.primaryValue = '';
        subState.multiplier = false;
        subState.multiplyBy = '1';
        dispatch(actionMode(normal));
    }

    const clearDisplayScreen = () => {
        if (checkout) {
            resetScreen();
        }
        setDisplayValue('$');
        dispatch(actionMode(normal));
        subState.primaryValue = '';
        subState.discountValue = '';
        subState.multiplier = false;
        subState.multiplyBy = '1';
    }

    const resetScreen = () => {
        dispatch(updateTotal(0));
        dispatch(updatePaymentAmount(0));
        dispatch(updateChangeDue(0));
        dispatch(checkOut(false));
        dispatch(clearTransactionArray());
        dispatch(updateKeyNumCounter(0));
        subState.primaryValue = '';
        subState.multiplier = false;
        subState.multiplyBy = '1';
    }

    const finishTransaction = (x) => {
        if(transactionArray.length > 0) dispatch(checkOut(x));
    }

    return {
        resetScreen,
        clearDisplayScreen,
        enterValue,
        updateDisplayScreen,
        finishTransaction,
        suspendTransaction,
        displayValue
    };
 
}
export default useInput;
