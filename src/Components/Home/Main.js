//rafce
//importing react library from react into this java script file
import React from "react";  
//outlet is used to render the content of nested routes
import {Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

//arrow fuction 
const Main = () => {
  return (
    <div>
      {/* Rendering the Header, Footer component and outlet */}
        <Header />
        <Outlet />
        <Footer />
    </div>
  );
};

export default Main;