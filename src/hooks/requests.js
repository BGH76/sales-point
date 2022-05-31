
import lhost from '../apis/index';

const API_URL = 'https://my-point-of-sale.herokuapp.com';

async function httpGetAccountInfo(loginInput) {
    const response =  await fetch(`${API_URL}/emplogin?username=${loginInput.username}&password=${loginInput.password}`)
        .then(res => res.json())
        return response; 
}

async function httpSetUpAccount (formValues) {
    console.log(formValues)
    await lhost.post(`${API_URL}/setup`, formValues);
}

async function httpGetPinNumber (acc) {
    const response = await fetch(`${API_URL}/getpin?acc=${acc}`)
    .then(res => res.json());
    return response;
}

async function httpGetEmployeePinNumbers (acc) {
    const response =  await fetch(`${API_URL}/getpin_emp?acc=${acc}`)
    .then(res => res.json());
    return response;
}

async function httpAddEmployee (formValues) {
    const response = await lhost.post(`${API_URL}/addemp`, formValues);
    console.log(response);
}

async function httpGetEmployees (acc) {
    const response = await fetch(`${API_URL}/employees?acc=${acc}`)
    .then(res => res.json());
    return response;
}

async function httpUpdateEmployee (formValues) {
    await lhost.post(`${API_URL}/updateemp`, formValues);
}

async function httpGetQuickActions (acc) {
    const response = await fetch(`${API_URL}/quickactions?acc=${acc}`)
    .then(res => res.json());
    return response;
}

async function httpUpdateQuickActions(formValues) {
    await lhost.post(`${API_URL}/updateQuickActions?id=${formValues.id}&acc=${localStorage.getItem('account')}`, formValues);
    
}

export {
    httpGetAccountInfo,
    httpSetUpAccount,
    httpAddEmployee,
    httpGetQuickActions,
    httpUpdateQuickActions,
    httpUpdateEmployee,
    httpGetEmployees,
    httpGetPinNumber,
    httpGetEmployeePinNumbers
}
