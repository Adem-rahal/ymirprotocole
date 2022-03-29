import { Chart } from "chart.js";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext.jsx";
import { shortenAddress } from "../utils/shortenAddress.js";

const Farm = () => {
    const { userInfo, connectWallet, currentAccount,batchInfo,stakeTokens,unstakeTokens, formData,getBatchInfo, isApproved, setApprovalForStakingContract, handleChange, mintToken,fetchdata, isLoading,checkIfWalletIsConnected } = useContext(TransactionContext);

    const handleStake = (e) => {
        const { networkAddress, amount, id} = formData;
        e.preventDefault(); //prevent the page from reloading 

        if(!networkAddress || !amount || !id ) return;

        stakeTokens();
    };

    const handleUnstake = (e) => {
        const { networkAddress, amount, id} = formData;
        e.preventDefault(); //prevent the page from reloading 

        if( !amount || !id ) return;
        
        unstakeTokens();
    };

    const handleApproveStaking = (e) => {
        e.preventDefault(); //prevent the page from reloading 
        setApprovalForStakingContract();
    };


    return (
        <div className="gradient-bg-vision">
        <div className="w-full flex">
        <div className="container w-full mx-auto pt-20">
		    <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">	
			
			<div className="flex flex-wrap">
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-black border border-gray-800 rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-green-600"><i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-400">Total Revenue</h5>
                                <h3 className="font-bold text-3xl text-gray-600"> 0.0003 BTC <span className="text-green-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-black border border-gray-800 rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-pink-600"><i className="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-400">Total Mining Power</h5>
                                <h3 className="font-bold text-3xl text-gray-600">10 TH <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-black border border-gray-800 rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-yellow-600"><i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-400">Bitcoin address</h5>
                                <h3 className="font-bold text-3xl text-gray-600">{batchInfo.networkAddress ? (
                                        shortenAddress(batchInfo.networkAddress)
                                        )
                                        : ( "000...0000"
                                    )} <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-black border border-gray-800 rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-blue-600"><i className="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-400">Token days left</h5>
                                <h3 className="font-bold text-3xl text-gray-600">1022 days</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">

                    <div className="bg-black border border-gray-800 rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-indigo-600"><i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-400">Token staked</h5>
                                <h3 className="font-bold text-3xl text-gray-600"> 10 </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    <div className="bg-black border border-gray-800 rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-red-600"><i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                            </div>
                            <div className="flex-1 text-right md:text-center">
                                <h5 className="font-bold uppercase text-gray-400">estimated day until next withdrawal</h5>
                                <h3 className="font-bold text-3xl text-gray-600"> 16 days <span className="text-red-500"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
                    </div>
                </div>
            </div>

            <section className="flex flex-col w-5/6 mx-auto overflow-hidden rounded-lg shadow-lg dark:bg-gray-800 md:flex-row md:h-48">
                <div className="md:flex md:items-center md:justify-center md:w-1/2 white-glassmorphism ">
                    <div className="px-6 py-6 md:px-8 md:py-0">
                        <h2 className="text-lg font-bold text-gray-700 dark:text-white md:text-gray-100">Stake your tokens to enter the <span className="text-[#d82a05] ">Farm</span> and start earning bitcoins</h2>
                    </div>
                </div>

                <div className="flex items-center flex-row justify-evenly  pb-6 md:py-0 md:w-1/2">
                    <form>
                        <div className="flex flex-col p-1 overflow-hidden border rounded-lg dark:border-gray-600 dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-[#f4830a] focus-within:ring-[#f4830a]">
                            <input className="px-6 py-2 text-white placeholder-gray-500 bg-transparent mt-3 mb-3 outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="text" name="networkAddress" placeholder="Enter your bitcoin address" onChange={(e) => handleChange(e, "networkAddress")}></input>
                            <input className="px-6 py-2 text-white placeholder-gray-500 bg-transparent mt-3 mb-3 outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="number" name="amount" placeholder="amount" onChange={(e) => handleChange(e, "amount")}></input>   
                            {isApproved ? (
                                    <button className="px-4 py-3 text-sm ml-2 font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-[#d82a05] rounded-lg hover:bg-[#f4830a] focus:bg-[#f4830a] focus:outline-none" onClick={handleStake} >Stake</button>
                            ):(
                                <button className="px-4 py-3 text-sm ml-2 font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-[#d82a05] rounded-lg hover:bg-[#f4830a] focus:bg-[#f4830a] focus:outline-none" onClick={handleApproveStaking} >Approve</button>
                            )}
                        </div>
                        </form>

                        <form>
                        <div className="flex flex-col p-1 overflow-hidden border rounded-lg dark:border-gray-600 dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-[#f4830a] focus-within:ring-[#f4830a]">
                            
                            <input className="px-6 py-2 text-white placeholder-gray-500 bg-transparent mt-10 mb-10 outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent" type="number" name="amount" placeholder="amount" onChange={(e) => handleChange(e, "amount")}></input>   
                            {isApproved ? (
                                    <button className="px-4 py-3 text-sm ml-2 font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-[#d82a05] rounded-lg hover:bg-[#f4830a] focus:bg-[#f4830a] focus:outline-none" onClick={handleUnstake} >Unstake</button>
                            ):(
                                <button className="px-4 py-3 text-sm ml-2 font-medium tracking-wider text-gray-100 uppercase transition-colors duration-200 transform bg-[#d82a05] rounded-lg hover:bg-[#f4830a] focus:bg-[#f4830a] focus:outline-none" onClick={handleApproveStaking} >Approve</button>
                            )}
                        </div>
                        </form>
                </div>
            </section>

            </div>

            
    );
}

export default Farm;