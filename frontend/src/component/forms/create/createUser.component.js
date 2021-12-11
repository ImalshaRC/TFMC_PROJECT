import React, { Component } from 'react';
import axios from 'axios';

class CreateUser extends Component {

    constructor(props) {
        super(props);
    
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          mobile: '',
          department: '',
          password: 'user123',
          validateEmail: '2px solid grey',
          validateMobile: '2px solid grey'
        }
    
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
    
      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        })
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value,
          validateEmail: '2px solid grey'
        })
      }

      onChangeMobile(e) {
        this.setState({
          mobile: e.target.value,
          validateMobile: '2px solid grey'
        })
      }

      onChangeDepartment(e) {
        this.setState({
          department: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();

        if(this.state.mobile.match(/^[0-9\b]+$/) && this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    
        const user = {
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          username:this.state.username,
          email:this.state.email,
          mobile:this.state.mobile,
          department:this.state.department,
          password:'user123'
        }
    
        console.log(user);

    
        axios.post('http://localhost:5000/user/add', user)
          .then(response => console.log(response.data))
    
        this.setState ({
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            mobile: '',
            department: ''
        })

        this.props.history.push("/UserManagement");

      } else {

        if(!this.state.mobile.match(/^[0-9\b]+$/)) {
          this.setState({
            validateMobile: '2px solid red'
          })
        }

        if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          this.setState({
            validateEmail: '2px solid red'
          })
        }

      }

      }

    render() {
        return (
                <div className="formBackground">
                    <div className="User_formContainer">
                        <div className="User_formHeader">
                            <button type="button" name="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Create User</h2>
                        </div>
                        <div className="User_formBody">
                            <form onSubmit={this.onSubmit} encType="multipart/form-data">
                                <label>Firstname</label>
                                <input type="text" value={this.state.firstname} onChange={this.onChangeFirstname} required />
                                <label>Lastname</label>
                                <input type="text" value={this.state.lastname} onChange={this.onChangeLastname} required />
                                <label>Username</label>
                                <input type="text" value={this.state.username} onChange={this.onChangeUsername} required />
                                <label>Email</label>
                                <input type="text" style={{border: this.state.validateEmail}} value={this.state.email} onChange={this.onChangeEmail} required />
                                <label>Mobile</label>
                                <input type="text" style={{border: this.state.validateMobile}} value={this.state.mobile} onChange={this.onChangeMobile}/>
                                <label>Department</label>
                                <input type="text" value={this.state.department} onChange={this.onChangeDepartment}/>
                                <input type="submit" value="Submit"/>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }

}

export default CreateUser;