import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Coin from './Pages/Coin';
import Header from './Components/Header';

export const CurrencyContext = React.createContext()
function App() {
  const [currency, setCurrency] = React.useState("usd")
  return (
    <BrowserRouter>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Home />}></Route>
            <Route path='coin/:id' element={<Coin />}></Route>
          </Route>
        </Routes>
      </CurrencyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
