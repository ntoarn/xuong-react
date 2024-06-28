import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './../Header/Header';
import Footer from './../Footer/Footer';

const LayoutClient = () => {
  return (
    <>
        <Header/>
        <main className='container'>
          <Outlet/>
        </main>
        <Footer/>
        
    </>
  )
}

export default LayoutClient