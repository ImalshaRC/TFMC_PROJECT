import React, { Component } from 'react';
import './css/hero.css';
import logo from './images/logo.png';
import slide1 from './images/1.jpg';
import slide2 from './images/2.jpg';
import slide3 from './images/3.jpg';
import Button from '@material-ui/core/Button';



class Hero extends Component {
    render() {
        return (
          <div class="slideshow">
          <div class="slideshow-item">
              <img src={slide1} alt=""/>
          </div>
          <div class="slideshow-item">
              <img src={slide2} alt=""/>
          </div>
          <div class="slideshow-item">
              <img src={slide3} alt=""/>
          </div>
      
        <div class="hero">
          
          <div class="container spacing">
            <div class="subhero">
            <img src={logo} class="herologo" alt="FineLeaves"/>
            <p>In over one hundred and fifty years, the name Fine Leaves had become synonymous with the world’s finest tea. In the world’s eye and tongue, Fine Leaves was tea and tea was Fine Leaves.
    
              What Rolls Royce is to cars, Rolex is to watches, Havana is to cigars and Scotland is to whisky; Fine Leaves is to tea.
              
              The legendary lion of the Sri Lankan flag was introduced to the Fine Leaves Tea logo, to guard this commitment – the symbol of quality.</p>
                        <Button variant="outlined" color="inherit" size="medium" href="/explore">
                           EXPLORE
                          </Button>
          </div>
          </div>
        </div>
      </div>
        );
    }
}


export default Hero;