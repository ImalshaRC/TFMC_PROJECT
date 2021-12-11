import React, { Component } from 'react';

import BOPF from './images/greentea.jpg';
import GT from './images/strawberrytea.jpg';
import OP from './images/international.jpg';

import './css/featured.css';

class Featured_Products extends Component {
    render() {
        return (
            <div>
                <section class="featured">
      <div class="container">
        <h2 class="section-title">Featured Products</h2>
        <div class="split">
          <a class="featured__item">
            <img src={BOPF} alt="" class="featured__img" />
            <p class="featured__details"><span class="price">$0.61</span>QUALITEA NATURAL GREEN TEA 25 TEA BAGS</p>
          </a>
          <a class="featured__item">
            <img src={GT} alt="" class="featured__img" />
            <p class="featured__details"><span class="price">$0.66</span>QUALITEA STRAWBERRY FLAVOURED TEA 20 TEA BAGS</p>
          </a>
          <a class="featured__item">
            <img src={OP} alt="" class="featured__img" />
            <p class="featured__details"><span class="price">$22.80</span>International Tea Collection</p>
          </a>
        </div>
      </div>
    </section>
            </div>
        );
    }
}

export default Featured_Products;