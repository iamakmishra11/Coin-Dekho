import BannerImage from "../../assets/coinimage1.jpeg";

function Banner() {
    return (
        <div className="w-full h-[25rem] relative bg-blue-900">

            <img
                src={BannerImage}
                className="h-full w-full"
                alt="Banner"
            />

            <div className="absolute top-10 left-0 right-0 mx-auto w-[30rem] flex flex-col items-center">
                <div className="flex flex-row gap-4 items-center">

                    <div
                        className="font-semibold text-5xl text-white overflow-hidden whitespace-nowrap border-r-2 border-white"
                        style={{
                            animation: 'typing 3s steps(40, end) infinite',
                            width: '0',
                            animationFillMode: 'forwards'
                        }}
                    >
                        Coin Dekho
                    </div>

                    <div
                        className="font-bold text-lg text-yellow-300 opacity-0 transform translate-x-4"
                        style={{
                            animation: 'slideIn 2s ease-in-out forwards',
                            animationDelay: '3s'
                        }}
                    >
                        Get all info regarding cryptocurrencies
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes typing {
                    from {
                        width: 0;
                    }
                    to {
                        width: 100%;
                    }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>

        </div>
    );
}

export default Banner;
