import {BsCurrencyBitcoin} from 'react-icons/bs';
import STARTMINING_logo from '../../images/STARTMINING_logo-for-white-backgroud.png';
import moralis_logo from '../../images/moralis.png';
import cruxpool_logo from '../../images/cruxpool_logo.png';
import bitmain_logo from '../../images/Bitmain_logo.png';
import sapphire_logo from '../../images/sapphire_logo.png';

const Newsletter = () => {
    return (
        <section className="bg-[#0f0e13] dark:bg-gray-800">

        <div className="container px-6 py-16 mx-auto text-center">
            <div className="max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-white dark:text-white md:text-4xl capitalize mt-10">Join our newsletter</h1>
                
                <p className="mt-6 text-gray-500 dark:text-gray-300">
                   Get notified when tokens are available, and stay up to date with the project news.
                </p>

                <div className="w-full max-w-sm mx-auto mt-6 bg-transparent border rounded-md dark:border-gray-700 focus-within:border-[#f4830a] focus-within:ring focus-within:ring-[#f4830a] dark:focus-within:border-blue-300 focus-within:ring-opacity-40">
                    <form className="flex flex-col md:flex-row">
                        <input type="email" placeholder="Enter your email address" className="flex-1 h-10 px-4 py-2 m-1 text-gray-700 placeholder-gray-400 bg-transparent border-none appearance-none dark:text-gray-200 focus:outline-none focus:placeholder-transparent focus:ring-0" /> 
                        
                        <button type="button" className="h-10 px-4 py-2 m-1 text-white transition-colors duration-200 transform bg-[#d82a05] rounded-md hover:bg-[#f4830a] focus:outline-none focus:bg-[#f4830a]">
                            Join Us
                        </button>
                    </form>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto mt-10">
                    <p className='text-gray-400 font-bold text-2xl mb-7'>Our Partners</p>
                <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                    <div className="flex items-center text-white justify-center col-span-1 md:col-span-2 lg:col-span-1">
                    <img src={moralis_logo} alt="logo" className="w-32 cursor-pointer" />
                    </div>

                    <div className="flex items-center text-white justify-center col-span-1 md:col-span-2 lg:col-span-1">
                    <img src={bitmain_logo} alt="logo" className="w-32 cursor-pointer" />
                    </div>

                    <div className="flex items-center text-white justify-center col-span-1 md:col-span-2 lg:col-span-1">
                    <img src={STARTMINING_logo} alt="logo" className="w-32 cursor-pointer" />                   
                     </div>

                    <div className="flex items-center text-white justify-center col-span-1 md:col-span-3 lg:col-span-1">
                    <img src={cruxpool_logo} alt="logo" className="w-32 cursor-pointer" />                   
                    </div>
                    
                    <div className="flex items-center text-white justify-center col-span-2 md:col-span-3 lg:col-span-1">
                    <img src={sapphire_logo} alt="logo" className="w-32 cursor-pointer" />                    
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Newsletter;