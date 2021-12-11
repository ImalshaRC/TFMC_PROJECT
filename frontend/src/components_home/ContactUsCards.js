import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import './css/contactusform.css';


class ContactUsCards extends Component {
    render() {
        return (
            <div>
                <h2 class="section-title"> Contact Us</h2>
        <hr/>

        <div class = "cardset">
         <Card class="card">
          <CardContent>
          <Typography  color="textSecondary" gutterBottom>
          Contact Number
          </Typography>
          <Typography variant="body2" component="p">         
            +94 70 3175 556<br/>
            +94 77 4727 423
          </Typography>
          </CardContent>
          </Card>

          <Card class="card">
          <CardContent>
          <Typography  color="textSecondary" gutterBottom>
          Email Address
          </Typography>
          <Typography variant="body2" component="p">
            <p>fineleaves@domain.com</p>
          </Typography>
          </CardContent>
          </Card>

          <Card class="card">
          <CardContent>
          <Typography  color="textSecondary" gutterBottom>
          Address
          </Typography>
          <Typography variant="body2" component="p">
          342/B Fine Leaves Estate,
          Nuwaraeliya
          </Typography>
          </CardContent>
          </Card>
          </div>
          <br/>
            </div>
        );
    }
}

export default ContactUsCards;