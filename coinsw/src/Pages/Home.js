import React, { useEffect } from "react";
import { CoinList } from "../config/api";
import axios from 'axios'
import { CurrencyContext } from "../App";
const Home = () => {

    const { currency } = React.useContext(CurrencyContext)
    const [coins, setCoins] = React.useState([]);

    React.useEffect(() => {
        console.log(`Currency is ${currency}`)
    }, [currency])

    useEffect(() => {
        axios.get(CoinList(currency))
            .then(res => {
                const data = res.data
                console.log(data)
                setCoins(data)
            })
            .catch(err => {
                console.log(`Error: ${Error}`)
            })

    }, [currency])

    return (
        <div>
            <div className='home'>
                <p className='home--text'>Your One Stop Shop For All Your Favourite Crypto Currencies</p>
                <div className='threed-coin'></div>
            </div>
            <input className="search--bar" placeholder="Search for Cryptocurrencies" />
        </div>
    );
};

export default Home;
