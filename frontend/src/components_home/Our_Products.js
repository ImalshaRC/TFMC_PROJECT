import React, { Component } from 'react';
import './css/our_products.css';
import tea1 from './images/green.png';
import tea2 from './images/black.png';
import tea3 from './images/herb.png';

class Our_Products extends Component {
    render() {
        return (
            <div>
                <section class="our-products">
                <div class="our_products_container">
                    <h2 class="section-title">GOLDEN ERA OF A TEA CUP...</h2>

                    <article class="product tea-birth spacing">
                    <img src={tea1} alt="" class="product__image"/>
                    <h3 class="product__title">Birth of Fine Leaves</h3>
                    <p class="product__description">
                        The early 1880s were a lean time in Ceylon. The colonial economy had been built almost entirely on the coffee enterprise, and when the enterprise collapsed, so did the economy. Plantations ‘up-country’ were sold for a song, while in Colombo there were runs on the banks. Frantic experiments with indigo and cinchona came to naught. The Planters’ Association presented the government with panic-stricken proposals for administrative retrenchment – which were, fortunately, rejected. An aura of panic settled over the colony.
                    </p>
                    </article>

                    <article class="product tea-health tea-left spacing">
                    <img src={tea2} alt="" class="product__image"/>
                    <h3 class="product__title">Tea & Health</h3>
                    <p class="product__description">The function of tea, the health benefits of tea and natural, bioactive compounds in tea, as essential elements in a healthy lifestyle is best explained by the first line in Kakuzo Okakura’s 1906 philosophical treatise on tea, The Book of Tea. Okakura sums up the historical and ancient belief in tea as more than just a pleasing beverage by writing, "Tea began as a medicine and grew into a beverage."</p>
                    </article>

                    <article class="product tea-herbal spacing">
                    <img src={tea3} alt="" class="product__image"/>
                    <h3 class="product__title">Revolution</h3>
                    <p class="product__description">Tea is the most popular manufactured drink consumed in the world, equaling all others – including coffee, soft drinks, and alcohol – combined.[4] Most tea consumed outside East Asia is produced on large plantations in the hilly regions of India and Sri Lanka and is destined to be sold to large businesses. Opposite this large-scale industrial production are many small "gardens," sometimes minuscule plantations, that produce highly sought-after teas prized by gourmets. These teas are both rare and expensive and can be compared to some of the most expensive wines in this respect.</p>
                    </article>
                </div>
                </section>
            </div>
 
        );
    }
}

export default Our_Products;