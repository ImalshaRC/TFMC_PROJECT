import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class CreateCustomer extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeStreet1 = this.onChangeStreet1.bind(this);
        this.onChangeStreet2 = this.onChangeStreet2.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          firstname: '',
          lastname: '',
          company: '',
          mobile: '',
          email: '',
          street1: '',
          street2: '',
          city: '',
          country: '',
          isCorporate: false,
          validateEmail: '3px solid grey',
          validateMobile: '3px solid grey',
          color : ''
        }
    
      }

      nextPath(path) {
        this.props.history.push(path);
      }
    
      onChangeFirstname(e) {
        this.setState({
          firstname: e.target.value
        })
      }
    
      onChangeLastname(e) {
        this.setState({
          lastname: e.target.value
        })
      }
    
      onChangeCompany(e) {
        this.setState({
          company: e.target.value
        })
      }

      onChangeMobile(e) {
        this.setState({
          mobile: e.target.value,
          validateMobile: '3px solid grey'
        })
      }

      onChangeEmail(e) {
          this.setState({
            email: e.target.value,
            validateEmail: '3px solid grey'
          })
      }

      onChangeStreet1(e) {
        this.setState({
          street1: e.target.value
        })
      }

      onChangeStreet2(e) {
        this.setState({
          street2: e.target.value
        })
      }

      onChangeCity(e) {
        this.setState({
          city: e.target.value
        })
      }

      onChangeCountry(e) {
        this.setState({
          country: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();

        if(this.state.mobile.match(/^[0-9\b]+$/) && this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {

          const customer = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            company: this.state.company,
            mobile: this.state.mobile,
            email: this.state.email,
            street1: this.state.street1,
            street2: this.state.street2,
            city: this.state.city,
            country: this.state.country,
            isCorporate: false
          }
        
          console.log(customer);
        
          axios.post('http://localhost:5000/customer/add', customer)
            .then((response) => {
              toast.success('Customer Added Successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              console.log(response.data);

              this.setState ({
                firstname: '',
                lastname: '',
                company: '',
                mobile: '',
                email: '',
                street1: '',
                street2: '',
                city: '',
                country: ''
              })
      
            })
            .catch((err) => {
              toast.error('Customer Already Registered!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
          });
            

        } else {

          if(!this.state.mobile.match(/^[0-9\b]+$/)) {
            this.setState({
              validateMobile: '3px solid red'
            })

            toast.error('Invalid Mobile Number', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          }
  
          if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({
              validateEmail: '3px solid red'
            })

            toast.error('Invalid Email Address!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          }

        }
 
      }

    render() {
        return (
              <div>
                <ToastContainer/>
                <div className="formBackground">
                    <div className="formContainer">
                        <div className="formHeader">
                            <button type="button" name="button" onClick={() => this.nextPath('/CustomerManagement')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>New Customer</h2>
                        </div>

                        <div className="formBody">
                            <form onSubmit={this.onSubmit}>
                                <table>
                                  <tbody>
                                    <tr>
                                        <th>First Name *</th>
                                        <th>Last Name *</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.firstname} onChange={this.onChangeFirstname} required /></td>
                                        <td><input type="text" value={this.state.lastname} onChange={this.onChangeLastname} required /></td>
                                    </tr>
                                    <tr>
                                        <th>Company</th>
                                        <th>Phone Number *</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.company} onChange={this.onChangeCompany} /></td>
                                        <td>
                                          <input type="text" style={{border: this.state.validateMobile}} value={this.state.mobile} onChange={this.onChangeMobile} required />
                                          
                                        </td>
                                    </tr>                                
                                    <tr>
                                        <th colSpan="2">Email *</th>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="colspanTd">
                                            <input type="text" style={{width: "90%", border: this.state.validateEmail}} value={this.state.email} onChange={this.onChangeEmail} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Street 1</th>
                                        <th>Street 2</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.street1} onChange={this.onChangeStreet1} /></td>
                                        <td><input type="text" value={this.state.street2} onChange={this.onChangeStreet2} /></td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <th>Country</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.city} onChange={this.onChangeCity} /></td>
                                        <td><input type="text" value={this.state.country} onChange={this.onChangeCountry} /></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><input type="submit" value="Submit" /></td>
                                    </tr>
                                  </tbody>
                                </table>
                            </form>
                        </div>
                    </div>                  
                </div>
              </div>
        );
    }

}

export default CreateCustomer;