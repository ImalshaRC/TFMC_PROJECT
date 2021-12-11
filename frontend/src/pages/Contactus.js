import React, { Component } from 'react';
import ContactUsForm from '../components_home/ContactUsForm';
import ContactUsCards from '../components_home/ContactUsCards';
import '../components_home/css/contactusform.css';
import SocialMedia from '../components_home/SocialMedia';

class Contactus extends Component {
  render() {
    return (
      <div>
      <div class="contactusform" id="contactus"> 
        <ContactUsCards />
        <ContactUsForm />
        <SocialMedia />
      </div>
      </div>
    );
  }
}

export default Contactus;