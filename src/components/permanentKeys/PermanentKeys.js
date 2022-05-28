import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { httpGetQuickActions } from "../../hooks/requests";

import { addTransaction, updateTotal, updateKeyNumCounter } from "../../actions";

import '../../styles/app.css';

const PermanentKeys = () => {
    const [ttempData, setTtempData] = useState([]);
    const dispatch = useDispatch();
    const total = useSelector(state => state.total);
    const keyNum = useSelector(state => state.keyNumCounter);
    const user = useSelector(state => state.userLoggedIn.user);

    // useEffect( async () => {
    //     const temp = await httpGetQuickActions(localStorage.getItem('account'));
    //     temp.sort(function(a, b) {
    //         return a.id - b.id;
    //     })
    //     setTtempData(temp);
    // },[])

    useEffect(() => {
        async function fetchData(){
            const temp = await httpGetQuickActions(localStorage.getItem('account'));
            temp.sort(function(a, b){
                return a.id - b.id;
            })
            setTtempData(temp);
        }
        fetchData();
    },[])

    const enterSelection = (pDescription, pValue) => {
        if(user===null) return;
        dispatch(updateTotal(total + Number(pValue)));
        dispatch(updateKeyNumCounter(keyNum + 1));
        dispatch(addTransaction({key: keyNum, value: pValue, active: 'y', discount: 'n', data: `${pDescription} @ $${pValue.toFixed(2)}`}));
    }

    const renderTempData = () => {
        return ttempData.map(tempData => {
            return (
                <div key={tempData.id} className="column">
                    <div className="pKeys" onClick={()=>enterSelection(tempData.description, tempData.value)}>
                        <div>
                            {tempData.service}
                        </div>
                        <div>
                            {tempData.value}
                        </div>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className="ui four column grid grid-layout">
            <div className="row">
                {renderTempData()}
            </div>
        </div>
    );
}

export default PermanentKeys;