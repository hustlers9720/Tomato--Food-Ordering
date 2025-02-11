import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>
                    Delicious meals delivered to your doorstep, fresh and fast!  
                    Savor the finest ingredients, expertly prepared for a taste you'll love.  
                    Whether it's breakfast, lunch, or dinner, we've got you covered.  
                    Order now and enjoy a hassle-free dining experience!
                </p>
                <button>View Menu</button>
            </div>
        </div>
    );
};

export default Header;
