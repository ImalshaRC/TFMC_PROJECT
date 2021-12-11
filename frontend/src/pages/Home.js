import React, { Component } from 'react';
import Hero from '../components_home/Hero';
import OurProducts from '../components_home/Our_Products';
import Footer from '../components_home/Footer';
import Featured_Products from '../components_home/Featured_Products';

class Home extends Component {
    render() {
        return (
            <div>
                <Hero />
                <Featured_Products />
                <OurProducts />
                <Footer />
            </div>
        );
    }
}

export default Home;