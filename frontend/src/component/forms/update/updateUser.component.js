import React, { Component } from 'react';
import axios from 'axios';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeMobile = this.onChangeMobile.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          id: '',
          username: '',
          department: '',
          firstname: '',
          lastname: '',
          mobile: '',
          email: '',
          validateEmail: '3px solid grey',
          validateMobile: '3px solid grey'
        }
    
      }

      componentDidMount() {
        axios.get('http://localhost:5000/user/get/' + this.props.match.params.id)
          .then(response => {
            this.setState({
              id: response.data._id,
              username: response.data.username,
              department: response.data.department,
              firstname: response.data.firstname,
              lastname: response.data.lastname,
              mobile: response.data.mobile,
              email: response.data.email
            })
          })
      }

      nextPath(path) {
        this.props.history.push(path);
    }

      onChangeDepartment(e) {
        this.setState({
          department: e.target.value
        })
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
    
      onSubmit(e) {
        e.preventDefault();

        if(this.state.mobile.match(/^[0-9\b]+$/) && this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    
        const user = {
        department: this.state.department,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        mobile: this.state.mobile,
        email: this.state.email
        }
    
        console.log(user);

        this.props.history.push("/MyAccount");
    
        axios.put('http://localhost:5000/user/update/' + this.state.id, user)
          .then(response => console.log(response.data))
    
        this.setState ({
          id: '',
          username: '',
          department: '',
          firstname: '',
          lastname: '',
          mobile: '',
          email: '',
        })
        
        } else {

          if(!this.state.mobile.match(/^[0-9\b]+$/)) {
            this.setState({
              validateMobile: '3px solid red'
            })
          }
  
          if(!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({
              validateEmail: '3px solid red'
            })
          }

        }
      }

      render() {
        return (
            <div className="profileLayoutBody">
              <div className="updateUserWrapper">
                <div className="updateUserHeader">
                    <button type="button" name="button" onClick={() => this.nextPath('/MyAccount')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    <h2>Update Account</h2>
                </div>
                <div className="updateUserformBody">
                    <form onSubmit={this.onSubmit}>
                        <table>
                          <tbody>
                            <tr>
                                <th>UserName</th>
                                <th>Department</th>
                            </tr>
                            <tr>
                                <td><input type="text" value={this.state.username} required disabled /></td>
                                <td><input type="text" value={this.state.department} onChange={this.onChangeDepartment} /></td>
                            </tr>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                            </tr>
                            <tr>
                                <td><input type="text" value={this.state.firstname} onChange={this.onChangeFirstname} required /></td>
                                <td><input type="text" value={this.state.lastname} onChange={this.onChangeLastname} required /></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                            <tr>
                                <td><input type="text" style={{border: this.state.validateEmail}} value={this.state.email} onChange={this.onChangeEmail} required /></td>
                                <td><input type="text" style={{border: this.state.validateMobile}} value={this.state.mobile} onChange={this.onChangeMobile} required /></td>
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
        )};
}

export default UpdateProfile;