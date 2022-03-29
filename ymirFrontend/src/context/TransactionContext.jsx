import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';
// import { useMoralis } from "react-moralis";

import {tokenABI, stakingABI, tokenContractAddress, stakingContractAddress} from '../utils/constants.js';

export const TransactionContext = React.createContext();

const {ethereum} = window; 

const getContracts = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tokenContract = new ethers.Contract(tokenContractAddress, tokenABI, signer);
    const stakingContract = new ethers.Contract(stakingContractAddress, stakingABI, signer);

    return [tokenContract, stakingContract];
}

// const getUserInfo = async () => {
//   try {
    
//   if(currentAccount) {
//     const {Moralis} = useMoralis();
//     const query = new Moralis.Query("Pool_Info");
//     query.equalTo("user",currentAccount)
//     const user = await query.first();
//     const updatedValue = {btcAddress: user.get("networkAddress"), tokenBalance: user.get("updatedBalance") }
//     setUserInfo(userInfo => ({...userInfo, ...updatedValue}));

//   } else {
//     console.log("Please connect your account");
//   }

// } catch (error) {
//   console.log(error);  
// }

// }

export const TransactionProvider = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState('');
    const [fetchdata, setFetchData] = useState(false);
    const [formData, setformData] = useState({ networkAddress: "", amount: "",id: "0"});
    const [userInfo, setUserInfo] = useState({ btcAddress: "", tokenBalance: ""});
    const [batchInfo, setBatchInfo] = useState({currentSupply: '', maxSupply: '', price: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isApproved, setIsApproved] = useState(false);

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
      }
  
  

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_accounts'});

            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                // GET USERS TOKENS COUNT
            } else {
              console.log('No accounts found')
            }
                
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object.")
        }
    }


    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({method: 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object.")
            
        }
    }

    const stakeTokens = async () => {
      try {
        if(!ethereum) return alert("Please install metamask");

        const { networkAddress, amount, id} = formData;
        const [,stakingContract] = getContracts();

        const stake = await stakingContract.stake(id,amount,networkAddress);

        setIsLoading(true);
        console.log(`Loading - ${stake.hash}`);
        await stake.wait();
        console.log(`Success - ${stake.hash}`);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    }

    const unstakeTokens = async () => {
      try {
        if(!ethereum) return alert("Please install metamask");

        const { networkAddress, amount, id} = formData;
        const [,stakingContract] = getContracts();

        const unstake = await stakingContract.unstake(id,amount);

        setIsLoading(true);
        console.log(`Loading - ${unstake.hash}`);
        await unstake.wait();
        console.log(`Success - ${unstake.hash}`);
        setIsLoading(false);

      } catch (error) {
        console.log(error);
      }
      window.location.reload();
    }

    const setApprovalForStakingContract = async () => {
      try {

        if(!ethereum) return alert("Please install metamask");
        const [tokenContract,] = getContracts();
        const approve = await tokenContract.setApprovalForAll(stakingContractAddress,true);
        setIsApproved(approved);

      } catch (error) {
        
      }
    }

    const checkIfWalletIsApproved = async () => {
      try {
          if(!ethereum) return alert("Please install metamask");
          const [tokenContract,] = getContracts();
          
          const approved = await tokenContract.isApprovedForAll(currentAccount,stakingContractAddress);
          setIsApproved(approved);

      } catch (error) {
          console.log(error)
          throw new Error("No ethereum object.")
      }
    }

    const getBatchInfo = async () => {
      try {

        const { id} = formData;
        if(!ethereum) return alert("Please install metamask");
        const [tokenContract,] = getContracts();
        const batch = await tokenContract.getBatchInfo(id);
        const updatedValue = {currentSupply : String(parseInt(batch[0]['_hex'],16)),maxSupply:String(parseInt(batch[1]['_hex'],16)),price: String(parseInt(batch[2]['_hex'],16))}
        setBatchInfo(batchInfo => ({...batchInfo, ...updatedValue}));
      } catch (error) {
        console.log(error);
        throw new Error("No ethereum object");
      }
    }
 
    const mintToken = async () => {
        try {
          if (ethereum) {
            const { networkAddress, amount, id} = formData;
            const [tokenContract,] = getContracts();

            const cost = ethers.utils.parseEther(batchInfo.price);

            try {
              let overrides = {
                from: currentAccount, 
                gasLimit: 250000,
                value: String(cost * amount/10**18)
              }
              
              const transactionHash = await tokenContract.mint(id,amount, overrides);
              setIsLoading(true);
              console.log(`Loading - ${transactionHash.hash}`);
              await transactionHash.wait();
              console.log(`Success - ${transactionHash.hash}`);
              setIsLoading(false);
              
            }
            catch(err) {
              console.log(err);
            }
            
            window.location.reload();
          } else {
            console.log("No ethereum object");
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

      useEffect(() => {
        checkIfWalletIsConnected();
        checkIfWalletIsApproved();
        // getUserInfo();
        getBatchInfo();
      }, [currentAccount,isApproved,userInfo]);

    return (
        <TransactionContext.Provider value={{ userInfo, connectWallet,isApproved,stakeTokens,unstakeTokens, setApprovalForStakingContract, fetchdata, currentAccount,batchInfo ,getBatchInfo, formData, handleChange,mintToken, transactions, isLoading,checkIfWalletIsConnected }}>
            {children}
        </TransactionContext.Provider>
    )
}