// eslint-disable-next-line no-unused-vars
import React from 'react';
import BannerImage from "../../assets/coinimage1.jpeg" 

const Banner = () => {
    return (
        <div className='w-full h-[25rem] relative'>
                <img
                src={BannerImage}
                className='h-full w-full'
                />

                <div className='absolute top-10 left-0 right-0 mx-auto w-[20rem]'>
                    <div className='flex flex-col gap-4'>
                        <div className='font-semibold underline underline-offset-8 text-5xl text-white'>
                            Crypto Tracker 
                        </div>
                            
                        <div className='font-semibold  text-1xl text-stone-950 text-center'>
                        get all info regarding crypto  currency information
                        </div>
                    </div>

                </div>
        </div>
    )
}

export default Banner;