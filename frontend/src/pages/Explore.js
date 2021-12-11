import React, { Component } from 'react';
import NavBar from '../components_home/NavBar';
import Footer from '../components_home/Footer';
import Aboutus from './Aboutus';
import Contactus from './Contactus';
import Teastory from '../components_home/Teastory';
import Products from '../components_home/Products';
import ProgressBar from "react-scroll-progress-bar";
import ScrollToTop from "react-scroll-to-top";

class Explore extends Component {
    render() {
        return (
            <div>
                <ScrollToTop smooth="true"/>
                <ProgressBar />
                <NavBar />
                <Teastory />
                <Products />
                <Aboutus />
                <Contactus />
                <Footer />
            </div>
        );
    }
}

export default Explore;