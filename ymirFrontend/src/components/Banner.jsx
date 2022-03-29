import { FaBitcoin, FaLeaf,FaUserCheck } from "react-icons/fa";
import {BsCurrencyBitcoin} from 'react-icons/bs';


const Banner = () =>{
    return (
      <div>
        <div className="flex w-full justify-center items-center mt-24 ">
          <div className="text-5xl font-bold text-white text-gradient py-1">
            Join Ymir Protocole & Earn 90% APY
            <p className="mt-5 text-white font-bold text-xl p-5">
             Earn passive income by leveraging the power of bitcoin mining through our token
            </p>
            
          </div>
        </div>

        <div className="container px-6 py-10 mx-auto mt-20">
                
                {/* <h1 className="text-3xl font-semibold text-center text-white capitalize lg:text-4xl mt-20">Our Guarantees </h1> */}
                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
                    <div className="flex flex-col items-center p-6 space-y-3 text-center white-glassmorphism rounded-xl ">
                        <span className="inline-block p-3 text-white bg-[#049c02] rounded-full">
                          <FaLeaf/>
                        </span>
                        <h1 className="text-2xl font-semibold text-[#049c02] capitalize">Green Mining</h1>

                        <p className="text-gray-500 ">
                        All of our partners are selected on high standards, but one of the most important is their energy sources which are required to be 100% green.
                        </p>

                        <a href="#" className="flex items-center -mx-1 text-sm text-[#049c02] capitalize transition-colors duration-200 transform hover:underline hover:text-[#049c02]">
                            <span className="mx-1">read more</span>
                            <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center white-glassmorphism rounded-xl ">
                        <span className="inline-block p-3 text-white bg-[#f4830a] rounded-full">
                            <FaUserCheck/>
                        </span>

                        <h1 className="text-2xl font-semibold text-[#f4830a] capitalize">Ownership</h1>

                        <p className="text-gray-500">
                        Each time you buy a token, you will be issued an SFT (semi-fungible token) that will give you full rights to that mining power. You will be able to sell it at any time on our marketplace
                        </p>

                        <a href="#" className="flex items-center -mx-1 text-sm text-[#f4830a] capitalize transition-colors duration-200 transform hover:underline hover:text-[#f4830a]">
                            <span className="mx-1">read more</span>
                            <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>

                    <div className="flex flex-col items-center p-6 space-y-3 text-center white-glassmorphism rounded-xl ">
                        <span className="inline-block p-3 text-white bg-[#d82a05] rounded-full">
                            <BsCurrencyBitcoin/>
                        </span>

                        <h1 className="text-2xl font-semibold text-[#d82a05] capitalize">90% APY </h1>

                        <p className="text-gray-500 00">
                        This is the first time in history that you will be able to invest in Bitcoin with an APY of 90%. Thanks to our tokenization of mining, we are bringing this investment to you at the click of a button. 
                        </p>

                        <a href="#" className="flex items-center -mx-1 text-sm text-[#d82a05] capitalize transition-colors duration-200 transform hover:underline hover:text-[#d82a05]">
                            <span className="mx-1">read more</span>
                            <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
            </div>
      </div>
    )
}




export default Banner;