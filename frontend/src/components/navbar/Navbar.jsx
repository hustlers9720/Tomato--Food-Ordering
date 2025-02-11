import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
// import { useNavigate } from 'react-router-dom';
const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home")
    const { cartTotal, token, setToken } = useContext(StoreContext)
    // const token = localStorage.getItem('token')
    const atoken = token || localStorage.getItem('token');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        navigate('/')
    }

    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to={'/'}>
                    <img src={assets.logo} alt="Logo" className="logo" />
                </Link>
            </div>
            <ul className="navbar-menu">
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === 'home' ? 'active' : ''}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === 'menu' ? 'active' : ''}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === 'mobile-app' ? 'active' : ''}>Mobile-App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" className="icon" />
                <div className='navbar-search-icon'>
                    <Link to={'/cart'}>
                        <img src={assets.basket_icon} alt="Basket" className="icon" />
                    </Link>
                    <div className={cartTotal() === 0 ? '' : 'dot'}></div>
                </div>
                {!atoken ?
                    <button onClick={() => setShowLogin(true)}>Signin</button> :
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt="" /> <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;
