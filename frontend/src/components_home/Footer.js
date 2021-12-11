import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/footer.css'

class Footer extends Component {

    render() {
        return (
            <div class="bodyfooter" id="ft">
      <div class="footer">
          <div class="footcontainer">
               <div class="sec aboutus">
                   <h2>About Us</h2>
                   <p>In over one hundred and fifty years, the name Fine Leaves had become synonymous with the world’s finest tea. In the world’s eye and tongue, Fine Leaves was tea and tea was Fine Leaves. What Rolls Royce is to cars, Rolex is to watches, Havana is to cigars and Scotland is to whisky; Fine Leaves is to tea. The legendary lion of the Sri Lankan flag was introduced to the Fine Leaves Tea logo, to guard this commitment – the symbol of quality.</p>
                 
                  </div>
                <div class="sec quickLinks">
                      <h2>Quick Links</h2>
                          <ul>
                              <li><a href="/explore#aboutus">About Us</a></li>
                              <li><a href="/faq">FAQ</a></li>
                              <li><a href="/policy">Privacy Policy</a></li>
                              <li><a href="/help">Help</a></li>
                              <li><a href="/terms">Terms</a></li>
                              <li><a href="/explore#contactus">Contact Us</a></li>
                              <li><Link to="/Login"> <span> <i class="fa fa-sign-in" aria-hidden="true" /></span>&nbsp;Sign In</Link></li>
                          </ul>
                  </div>
                <div class="sec contact">
                      <h2>Contact Info</h2>
                      <ul class="info">
                          <li>
                              <span>
                                <i class="fa fa-address-card" aria-hidden="true"></i>

                              </span>
                              <span>
                               342/B Fine Leaves Estate,<br/>
                               Nuwaraeliya   
                              </span>
                          </li>
                          <li>
                              <span>
                                <i class="fa fa-phone" aria-hidden="true"></i>

                              </span>
                              <p><a href="/phone">+94 70 3175 556</a><br/>
                                 <a href="/phone">+94 77 4727 423</a></p> 
                          </li>
                          <li>
                              <span>
                                <i class="fa fa-envelope" aria-hidden="true"></i>

                              </span>
                              <span>
                               <p><a href="/email">fineleaves@domain.com</a></p>   
                              </span>
                          </li>
                          
                      </ul>
                  </div>
                 
          </div>
            <div class="bottom_footer">
      <span>© 2021 Fine Leaves Tea Corporation Ltd. All Rights Reserved.</span>
    </div>
      </div>
  </div>
        );
    }
}

export default Footer;