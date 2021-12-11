import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import './css/sample.css';
import BOPF from './images/BOPF.png';
import FBOP from './images/FBOP.png';
import GT from './images/GT.png';
import OP from './images/OP.png';
import ST from './images/ST.png';


class Products extends Component {
    render() {
        return (
            <div class="productsdivision" >
            <h2 class="section-title" id="products" > Products</h2>
            <hr/>
            <Typography variant="h4" gutterBottom align="center">
            Types & Grades
            </Typography> 

            <div>
                <Typography variant="h6" display="block" gutterBottom align="left">
                SILVER TIPS
                </Typography>
                <div class="product-section">
                <img src={ST}  alt="silver tips"/>
                <Typography variant="button" gutterBottom align="left">
                The finest buds of a special cultivar
                which turn velvety-silver when dried. 
                Extremely rare, and usually handpicked before
                 sunrise,
                 they offer the gentlest fragrant brew.
                </Typography>
                <br/>
                </div>
            </div>

            <div>
                <Typography variant="h6" display="block" gutterBottom align="right">
                BOPF - Broken Orange Pekoe Fannings
                </Typography>
                <div class="product-section">
                <Typography variant="button" gutterBottom align="left">
                Uniform, black-leaf tea particles which are smaller than BOP but without tips, hailing from higher elevated regions. Bright in colour with a strong taste that retains most characteristics of BOP. Ideal for tea bags.
                </Typography>
                <img src={BOPF}   alt="BOPF"/>
                <br/>
                </div>
            </div>

            <div>
                <Typography variant="h6" display="block" gutterBottom align="left">
                GOLDEN TIPS
                </Typography>
                <div class="product-section">
                <img src={GT}   alt="GT"/>
                <Typography variant="button" gutterBottom align="left">
                Very rare pale golden velvety whole buds taken from select plants, has a very delicate brew with a mild floral bouquet
                </Typography>
                <br/>
                </div>
            </div>
            
            <div>
                <Typography variant="h6" display="block" gutterBottom align="right">
                FBOP – Flowery Broken Orange Pekoe
                </Typography>
                <div class="product-section">
                <Typography variant="button" gutterBottom align="right">
                Similar to Broken Orange Pekoe but bigger in size. It is a coarser, semi-leaf tea with a small portion of tips that produce a mild yet flavourful brew.
                </Typography>
                <img src={FBOP}  alt="FBOP"/>
                <br/>
                </div>
            </div>

            <div>
                <Typography variant="h6" display="block" gutterBottom align="left">
                OP – Orange Pekoe
                </Typography>
                <div class="product-section">
                <img src={OP} alt="OP"/>
                <Typography variant="button" gutterBottom align="left">
                Contrary to popular belief, Orange Pekoe refers to a leaf size and not a flavour. Orange Pekoe tea has a strong scent and a smooth flavour with a sweet finish.
                </Typography>
                <br/>
                </div>
            </div>


            </div>
        );
    }
}

export default Products;