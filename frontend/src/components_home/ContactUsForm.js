import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import axios from 'axios'

class ContactUsForm extends Component {
  constructor(props){
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state={
      email:'',
      message:''
    }

  }

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  onChangeMessage(e){
    this.setState({
      message: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();

    const {email,message} = this.state;
    const contactus = {
      email:email,
      message:message
    }

    axios.post('http://localhost:5000/contactus/add', contactus).then(()=>{
          alert("Thank you for contacting Us. We will contact you through the provided Email")
        }).catch((error)=>{
          alert(error)
        })
        
        this.setState ({
          email:'',
          message:''
        })
      
  }


  render() {
    return (
      <div>
         
    
          <h5>Have any quiestions? We'd love to hear from you. </h5>
          <h6>Please view our Privacy Policy for further details on how we handle your data and your rights.</h6>
          
        <form onSubmit={this.onSubmit}>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" onChange={this.onChangeEmail} value={this.state.email} placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" onChange={this.onChangeMessage} value={this.state.message} rows={3} placeholder="Enter your message here..."/>
        </Form.Group>
        </Form>
        
      <Button type="submit" value="Submit" variant="contained" color="primary">Submit</Button>
        </form>
      </div>
    );
  }
}

export default ContactUsForm;