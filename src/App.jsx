import './App.css';
import CoinTable from './components/CoinTable/CoinTable'; // Make sure the path is correct
import Navbar from './components/Navbar/Navbar';
import Banner from './components/Banner/Banner';
import Footer from './components/Footer'; // Import the Footer component
import { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; // Import the ErrorBoundary component

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currency, setCurrency] = useState('usd');

    // Yeh function search term ko CoinTable component ko bhejta hai
    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    // Yeh function currency ko CoinTable component ko bhejta hai
    const handleCurrencyChange = (currency) => {
        setCurrency(currency);
    };

    return (
        <>
        
            <Navbar onSearch={handleSearch} onCurrencyChange={handleCurrencyChange} setCurrency={setCurrency} />
            <Banner />
            <ErrorBoundary>
                <CoinTable searchTerm={searchTerm} currency={currency} />
            </ErrorBoundary>
            <Footer />
        </>
    );
}

export default App;