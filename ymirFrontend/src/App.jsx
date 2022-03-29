import {Navbar, Mint, Footer, Services, Transactions, Banner, Newsletter,Vision, Farm } from './components';
import { useState } from 'react';


const App = () => {

  return (
    <div className='min-h-screen'>
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Banner/>
        <Vision/>
      </div>
        <Mint/>
        {/* <Services/> */}
        <Farm/>
        <Newsletter/>
        
        {/* <Transactions/> */}
        <Footer/>
    </div>
  );
}

export default App
