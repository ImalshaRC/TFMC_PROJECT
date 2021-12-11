import React, { Component } from 'react';
import UserImage from './../../images/icon/userImage.png';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.nextPath = this.nextPath.bind(this);

    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      mobile: '',
      department: '',
      imageURL: ''
    };

  }

  nextPath(path) {
    this.props.history.push(path);
  }

  componentDidMount() {

    const userInfo = localStorage.getItem("userInfo")
    
    if (userInfo) {

        const username = userInfo.slice(13, (userInfo.length-2));

        axios.get('http://localhost:5000/user/get/' + username)
        .then(response => {
            this.setState({
                id: response.data._id,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                username: response.data.username,
                email: response.data.email,
                mobile: response.data.mobile,
                department: response.data.department,
                imageURL: response.data.imageURL
            })
          })
    }

  }

  render() {
  return (
      <div className="profileLayoutBody">
        <div className="profileWrapper">
          <div className="profileLeft">
              <div className="profileHeader">
                <img src={UserImage} alt="UserProfileImage" />
                <span>
                  <div><h2>{this.state.firstname}</h2></div>
                  <div><h2>{this.state.lastname}</h2></div>
                </span>
              </div>
              <div className="profileContent">
                <div className="row">
                  <label>UserName</label>
                  <div className="data">{this.state.username}</div>
                </div>
                <div className="row">
                  <label>Email</label>
                  <div className="data">{this.state.email}</div>
                </div>
                <div className="row">
                  <label>Mobile</label>
                  <div className="data">{this.state.mobile}</div>
                </div>
                <div className="row">
                  <label>Department</label>
                  <div className="data">{this.state.department}</div>
                </div>
              </div>
          </div>
          <div className="profileRight">
            <div className="buttonPanel">
            <button>Change Profile Picture</button>
              <button onClick={() => this.nextPath('/UpdateAccount/' + this.state.username)}>Update Account</button>
              <button onClick={() => this.nextPath('/ChangePassword')}>Reset Password</button>
              <button>Delete Account</button>
              <button onClick={() => this.nextPath('/Dashboard')}>Back to Home</button>
            </div>
          </div>
        </div>
      </div>
  )};
}

export default Profile;