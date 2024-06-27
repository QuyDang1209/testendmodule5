import React from 'react';
import {Outlet} from "react-router-dom";
import Header from './header/Header';
import Footer from './footer/footer';

export default function Master() {
  return (
    <>
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
  )
}
