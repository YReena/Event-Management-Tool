import React, { useContext } from 'react'
import '../App.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const RendenMenu = () => {
        if (state) {
            return (<>
                <div className='menu-link'>
                    <ul>
                        <li><NavLink to='/eventregister'>Event Registration</NavLink></li>
                        <li><NavLink to='/eventlist'>Event Lists</NavLink></li>
                    </ul>
                </div>
                <div className='login-menu'>
                    <ul>
                        <li><NavLink to='/logout'>Logout</NavLink></li>
                    </ul>

                </div>
            </>)
        }
        else {
            return (<>
                <div className='login-menu'>
                    <ul>
                        <li><NavLink to='/login'>Login</NavLink></li>
                        <li><NavLink to='/signup'>Sign up</NavLink></li>
                    </ul>

                </div>
            </>)


        }
    }
    return (
        <>
            <nav className='main-nav'>
                <div className='logo'>
                    <h2>
                        <span>E</span>vent
                        <span>M</span>angement
                        <span>T</span>ool
                    </h2>

                </div>
                <RendenMenu/>
            </nav>
        </>
    )
}

export default Navbar;
