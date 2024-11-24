// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Navbar = ({ onSearch, onCurrencyChange, setCurrency }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Yeh function search term ko parent component ko bhejta hai
    const handleSearch = () => {
        onSearch(searchTerm);
    };

    // Yeh function currency ko parent component ko bhejta hai
    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.textContent.toLowerCase();
        onCurrencyChange(selectedCurrency);
    };

    return (
        <div className="navbar bg-base-100 z-50 relative">
            <div className="navbar-start">
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1000] mt-3 w-52 p-2 shadow-lg absolute">
                        <li onClick={()=> setCurrency('inr')}><a onClick={handleCurrencyChange} className="hover:bg-gray-200 p-2 rounded">INR</a></li>
                        <li onClick={()=> setCurrency('usd')}><a onClick={handleCurrencyChange} className="hover:bg-gray-200 p-2 rounded">USD</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="navbar-brand">COIN DEKHO</a> {/* Yeh text capital letters mein hai */}
            </div>
            <div className="navbar-end">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered"
                    />
                    <button onClick={handleSearch} className="btn btn-primary ml-2">Search</button>
                </div>
                <button className="btn btn-ghost btn-circle">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Navbar;