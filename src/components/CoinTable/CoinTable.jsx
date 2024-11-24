// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchCoinData } from "../../services/fetchCoinData";
import { useQuery } from "react-query";

// eslint-disable-next-line react/prop-types
function CoinTable({ searchTerm, currency }) {
    const [page, setPage] = useState(1);
    const [visibleCoins, setVisibleCoins] = useState([]);
    const observer = useRef();

    // Use Query to fetch data with pagination
    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery(
        ['coins', page, currency],
        () => fetchCoinData(page, currency),
        {
            // cacheTime: 1000 * 60 * 2,
            // staleTime: 1000 * 60 * 2,
            keepPreviousData: true,
        }
    );

    // Callback function to observe the last coin element
    const lastCoinRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading]
    );

    useEffect(() => {
        if (data) {
            setVisibleCoins((prevCoins) => [...prevCoins, ...data]);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [page, refetch, currency]);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Yeh condition check karti hai ki user neeche scroll kar raha hai ya upar
        if (scrollTop + windowHeight >= documentHeight - 100) {
            // Agar user neeche scroll kar raha hai, toh purane data ko remove kar do
            setVisibleCoins((prevCoins) => prevCoins.slice(-20));
        } else if (scrollTop < 100) {
            // Agar user upar scroll kar raha hai, toh purane data ko wapas dikha do
            // eslint-disable-next-line no-unused-vars
            setVisibleCoins((prevCoins) => [...data]);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }
    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    // Yeh function search term ke basis par coins ko filter karti hai
    const filteredCoins = visibleCoins.filter(coin =>
        // eslint-disable-next-line react/prop-types
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // eslint-disable-next-line react/prop-types
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="my-5 flex flex-col items-center justify-center gap-5 w-[80vw] mx-auto">
            <div className="w-full bg-yellow-400 text-black flex py-4 px-2 font-semibold items-center justify-center">
                {/*header of the table*/}
                <div className="basis-[35%]">
                    Coin
                </div>
                <div className="basis-[25%]">
                    Price
                </div>
                <div className="basis-[20%]">
                    24h Change
                </div>
                <div className="basis-[20%]">
                    Market Cap
                </div>
            </div>

            <div className="flex flex-col w-[80vw] mx-auto">
                {filteredCoins.length > 0 ? (
                    filteredCoins.map((coin, index) => {
                        if (filteredCoins.length === index + 1) {
                            return (
                                <div
                                    ref={lastCoinRef}
                                    key={coin.id}
                                    className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between"
                                >
                                    <div className="flex items-center justify-start gap-3 basis-[35%]">
                                        <div className="w-[5rem] h-[5rem]">
                                            <img src={coin.image} alt={coin.name} className="w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="text-3xl">{coin.name}</div>
                                            <div className="text-xl">{coin.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="basis-[25%]">
                                        {coin.current_price}
                                    </div>
                                    <div className="basis-[20%]">
                                        {coin.price_change_percentage_24h}%
                                    </div>
                                    <div className="basis-[20%]">
                                        {coin.market_cap}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={coin.id}
                                    className="w-full bg-transparent text-white flex py-4 px-2 font-semibold items-center justify-between"
                                >
                                    <div className="flex items-center justify-start gap-3 basis-[35%]">
                                        <div className="w-[5rem] h-[5rem]">
                                            <img src={coin.image} alt={coin.name} className="w-full h-full" />
                                        </div>
                                        <div>
                                            <div className="text-3xl">{coin.name}</div>
                                            <div className="text-xl">{coin.symbol}</div>
                                        </div>
                                    </div>
                                    <div className="basis-[25%]">
                                        {coin.current_price}
                                    </div>
                                    <div className="basis-[20%]">
                                        {coin.price_change_percentage_24h}%
                                    </div>
                                    <div className="basis-[20%]">
                                        {coin.market_cap}
                                    </div>
                                </div>
                            );
                        }
                    })
                ) : (
                    <div className="text-center text-white mt-4">
                        Sorry, we  dont have data about this cryptocurrency.
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoinTable;
