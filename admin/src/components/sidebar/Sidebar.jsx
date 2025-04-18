import React from 'react';
import { assets } from '../../assets/assets';
import './Sidebar.css';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to={'/add'} className="side-option">
                    <img src={assets.add_icon} alt="Add" />
                    <p>Add Items</p>
                </NavLink>

                <NavLink to={'/list'} className="side-option">
                    <img src={assets.order_icon} alt="List" />
                    <p>List Items</p>
                </NavLink>

                <NavLink to={'/orders'} className="side-option">
                    <img src={assets.order_icon} alt="Orders" />
                    <p>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
