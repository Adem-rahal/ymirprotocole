import React, { useContext,useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { FaBitcoin } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import {GiDuration, GiReceiveMoney} from 'react-icons/gi';
import {BsCurrencyBitcoin} from 'react-icons/bs';
import {BiChip} from 'react-icons/bi';


import STARTMINING_logo from '../../images/STARTMINING_logo-for-white-backgroud.png';
import logo from "../../images/Ymir_logo2.png";
import { TransactionContext } from "../context/TransactionContext.jsx";
import {Loader} from '.';
import { shortenAddress } from "../utils/shortenAddress.js";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const ServiceCard = ({color, title, icon, subtitle }) => (
    <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl'>
        <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className='ml-5 flex flex-col flex-1'>
            <h1 className='mt-2 text-white text-lg'>{title}</h1>
            <p className='mt-2 text-white text-sm md:9/12'>{subtitle}</p>
        </div>
    </div>
)


const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      step="1"
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );
  
const Mint = () => {
    const { connectWallet, currentAccount,batchInfo, formData,getBatchInfo,  handleChange, mintToken,fetchdata, isLoading,checkIfWalletIsConnected } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { networkAddress, amount, id} = formData;
        e.preventDefault(); //prevent the page from reloading 

        if(!networkAddress || !amount || !id ) return;
        
        mintToken();
    };

    // useEffect(async () => {
    //     checkIfWalletIsConnected();
    //     getBatchInfo();
    //   }, []);

    return (
        <div className="flex w-full justify-center items-center gradient-bg-mintsection">
            <div className="flex lg:flex-row flex-col items-center justify-between lg:p-20 py-12 px-4">
                <div className="flex justify-between items-center flex-col lg:mr-10 ">
                            <h1 className="text-5xl text-white  capitalize py-1 mb-5 ">
                                Buy now to start earning 90% APY
                            </h1>
                            {/* <p className="mt-5 font-light text-white md:w-9/12 w-11/12 text-base p-5">
                                What if you could mine bitcoin at the best price and without the stuggles of technicality straight from your home
                            </p> */}

                            
                            
                            <div className='flex flex-col justify-start items-start'>
                            <ServiceCard 
                            color="bg-[#049c02]"
                            title="Green Mining Power"
                            icon= {<BiChip fontSize={21} className="text-white"/>}
                            subtitle="Each token corresponds to 1TH of green mining power. Your mining power is under guarantee: every time we experience downtime on some equipment, we will use the whole farm to compensate and not leave some users with no rewards during this period. "
                            >
                            </ServiceCard>
                            <ServiceCard 
                            color="bg-[#f4830a]"
                            title="Token Lifespan"
                            icon= {<GiDuration fontSize={21} className="text-white"/>}
                            subtitle="The SFT lifespan is three years which corresponds approximately to the lifespan of an ASIC. During this period, you will be able to trade your tokens, sell them and buy used these SFTs from our marketplace as you please. "
                            >
                            </ServiceCard>
                            <ServiceCard 
                            color="bg-[#d82a05]"
                            title="Fees"
                            icon= {<GiReceiveMoney fontSize={21} className="text-white"/>}
                            subtitle="We ensure that you buy your tokens at the best market price with three years of prepaid electricity. On top of this, thanks to our partners, you will have 0% fees on the mining pools. But because of all this there is a fee of 5% to pay the mining company hosting your mining power and the plateform. "
                            >
                            </ServiceCard>
                            </div>
                </div>

                <div className="flex flex-col items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 w-72 w-full  my-5 eth-card .white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <BsCurrencyBitcoin fontSize={21} color="#fff" />
                                </div>
                                
                                    <img src={logo} alt="logo" className="w-16 cursor-pointer" />
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                    <p className="text-white font-light text-sm mt-5">
                                    {currentAccount ? (
                                        shortenAddress(currentAccount)
                                        )
                                        : ( "0x000...0000"
                                    )}
                                    </p>
                                    <p className="text-white font-semibold text-sm mt-1">
                                    HashPower: 1 TH / Token
                                    <br/>
                                    LifeSpan: 3 Years
                                    </p>
                                    </div>
                                    <img src={STARTMINING_logo} alt="logo" className="w-16 cursor-pointer mt-10"/>

                                </div>
                                </div>
                                
                                
                            
                        </div>

                        <div className=" items-center text-white text-sm font-bold mb-3">
                            
                            {
                            (!batchInfo.currentSupply || !batchInfo.maxSupply || !batchInfo.price ) ? (
                            <p>
                            Available tokens: connectWallet 
                            </p>):(   
                                <p>
                                Available tokens: {(batchInfo.maxSupply-batchInfo.currentSupply)}/{batchInfo.maxSupply}
                                </p>
                            )
                        }   
                        </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                    <Input placeholder="Bitcoin Address" name="networkAddress" type="text" handleChange={handleChange} />
                    <Input placeholder="Amount of Token" name="amount" type="number" handleChange={handleChange} />
                    <div className="h-[1px] w-full bg-gray-400 my-2"/>

                    {currentAccount ? (
                                    isLoading ? (
                                        <Loader />
                                    ):(<button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="text-white bg-[#d82a05] w-full mt-2  p-2  rounded-full cursor-pointer hover:bg-[#f4830a] font-bold">
                                            Buy Now
                                    </button>)
                                    )
                                    : ( <button type="button" 
                                    onClick={connectWallet}
                                    className="flex  flex-row w-full justify-center items-center my-5 bg-[#d82a05] p-3 rounded-full cursor-pointer hover:bg-[#f4830a]">
                                        <p className="text-white text-base font-semibold ">Connect wallet</p>
                                    </button>
                                )}
                    
                    </div>
                    </div>

                   

                </div>
            </div>
       
    );
}

export default Mint; 