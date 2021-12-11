import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.nextPath = this.nextPath.bind(this);
  
        this.state = {
          firstname: '',
          lastname: '',
          anchorEl: null
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
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                })
              })
        }
        else {
            this.nextPath('/Login');
        }

    }


    handleClick(event) {
        this.setState({anchorEl : event.currentTarget});
    };

    handleClose() {
        this.setState({anchorEl : null});
    };

    render(){
    return (
        <div className="navigationBar">
            <div className="navbarAlignLeft">
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
                <span>{this.state.firstname} {this.state.lastname}</span>
            </div>
            <div className="navbarAlignCenter">
                Control Panel
            </div>
            <div className="navbarAlignRight">
                <button onClick={()=> this.nextPath('/contactusdata')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chat-left-text-fill" viewBox="0 0 16 16">
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                    </svg>
                </button>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-bell-fill" viewBox="0 0 16 16">
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                    </svg>
                </button>
                <button onClick={this.handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-gear-fill" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </button>
                <Menu id="simple-menu" anchorEl={this.state.anchorEl} keepMounted open={Boolean(this.state.anchorEl)} onClose={this.handleClose}>
                    <MenuItem onClick={this.handleClose}>
                        <button className="menu_btn" onClick={() => this.nextPath('/MyAccount')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            </svg>
                            <span>My Profile</span>
                        </button>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <button className="menu_btn" onClick={() => this.nextPath('/UserManagement')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-people-fill" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                            </svg>
                            <span>System Users</span>
                        </button>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <button className="menu_btn" onClick={() => {
                                    localStorage.clear();
                                    this.nextPath('/Login')}
                                }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                            <span>Logout</span>
                        </button>
                    </MenuItem>
                </Menu>
            </div>
        </div>
        )};
}

export default withRouter(Header);