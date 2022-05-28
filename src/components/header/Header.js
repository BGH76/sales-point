import React from "react";
import Link from '../Link';

import '../../styles/app.css';

class Header extends React.Component {
    render() {
        return(
            <div className="ui six item menu">
                <Link href='/addemp' className='item'>Add Employee</Link>
                <Link href='/updateemp' className='item'>Update Employee</Link>
                <Link href='/quickactions' className='item'>Quick Actions</Link>
                <Link href='/reports' className='item'>Reports</Link>
                <Link href='/main' className='item'>Main</Link>
                <Link href='/home' className='item'>Home</Link>
            </div>
        );
    };
}
export default Header;