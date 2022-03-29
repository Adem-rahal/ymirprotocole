import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import { TransactionContext } from "../context/TransactionContext.jsx";
import logo from "../../images/Ymir_logo2.png";
import { shortenAddress } from "../utils/shortenAddress.js";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { connectWallet, currentAccount, formData, handleChange, sendTransaction, isLoading } = useContext(TransactionContext);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["My Farm", "Green Bitcoin", "Guarantee & Ownership","Market Place", "Contact Us"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}

      {currentAccount ? (
       <li className="bg-[#d82a05] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#f4830a]">
       {shortenAddress(currentAccount)}
      </li> 
       )
      :(
          <button type="button" 
          onClick={connectWallet}
          className="flex flex-row justify-center items-center my-5 bg-[#d82a05] p-3 rounded-full cursor-pointer hover:bg-[#f4830a]">
              <p className="text-white text-base font-semibold ">Connect wallet</p>
          </button>
       )}
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["My Farm", "Green Bitcoin", "Guarantee & Ownership","Market Place", "Contact Us"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}

            {currentAccount ? (
            <li className="bg-[#d82a05] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#f4830a]">
            {shortenAddress(currentAccount)}
            </li> 
            )
            :(
                <button type="button" 
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#d82a05] p-3 rounded-full cursor-pointer hover:bg-[#f4830a]">
                    <p className="text-white text-base font-semibold ">Connect wallet</p>
                </button>
            )}

          </ul>
        )}
       
      </div>
    </nav>
  );
};

export default Navbar;
