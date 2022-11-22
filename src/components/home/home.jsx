import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <div>
<h1>Welcome to CHATSCRUM</h1>
<div className='link'>
    <h4><Link to="/signup">SIGN UP</Link></h4>
    <h4><Link to="/signin">SIGN IN</Link></h4>

</div>

        </div>
    )
}
