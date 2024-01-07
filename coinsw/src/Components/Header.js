import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../images/CS_Icon.svg';
import { CurrencyContext } from '../App';

const Header = () => {
    const { currency, setCurrency } = useContext(CurrencyContext);

    function handleChange(event) {
        const selectedCurrency = event.target.value;
        setCurrency(selectedCurrency);
        console.log(selectedCurrency);
    }

    return (
        <>
            <div className='header'>
                <Link className='bar' to='/'>
                    <img className="logo" src={logo} alt='logo' />
                    <h1 className='title'>Coin Switch</h1>
                </Link>

                <select className='select' onChange={handleChange} value={currency}>
                    <option className="option" value="usd">USD</option>
                    <option className="option" value="inr">INR</option>
                </select>
                <div className='profile'></div>
            </div>
            <Outlet />
        </>
    );
}

export default Header;
