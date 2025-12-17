import React, { useContext } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { signOut } from 'firebase/auth';
import auth from '../firebase/firebase.config';

const Navbar = () => {

    const {user} = useContext(AuthContext)
    console.log(user);

    const logOut = () => {
        signOut(auth)
    }
    

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to='/'><a>Home</a></Link></li>
        <li><Link to='/search'><a>Search</a></Link></li>
        <li><Link to='/donation-request'><a>Donation Request</a></Link></li>
        <li><Link to='/donate'><a>Donate</a></Link></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to='/'><a>Home</a></Link></li>
      <li><Link to='/search'><a>Search</a></Link></li>
      <li><Link to='/donation-request'><a>Donation Request</a></Link></li>
        <li><Link to='/donate'><a>Donate</a></Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to='/dashboard' className='btn mr-2'>Dashboard</Link>
    {
        user? (<Link onClick={logOut} className="btn">Logout</Link>) :(<Link to='/login' className="btn">Login</Link>)
    }
    
  </div>
</div>
        </div>
    );
};

export default Navbar;