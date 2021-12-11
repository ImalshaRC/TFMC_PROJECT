import React,{ Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const User = (props) => {

  return (
    <tr>
      <td>{props.user._id}</td>
      <td>{props.user.firstname}</td>
      <td>{props.user.lastname}</td>
      <td>{props.user.email}</td>
      <td>{props.user.mobile}</td>
      <td>{props.user.department}</td>
      <td>
      <button className="tableActionBtn" onClick={() => props.removeClickOpen(props.user._id)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
      </button>
      </td>
    </tr>
  )
}

class UserTable extends Component {
    constructor(props) {
      super(props);

      this.removeStatus = this.removeStatus.bind(this);
      this.removeClickOpen = this.removeClickOpen.bind(this);
      this.removeClose = this.removeClose.bind(this);

      this.state = {
        users: [],
        removeClick : false,
        temp : ''
      };
    }

    componentDidMount() {
      axios.get('http://localhost:5000/user/')
        .then(response => {
            this.setState({ users: response.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //route...
    nextPath(path) {
        this.props.history.push(path);
    }

    userList() {
      return this.state.users.map(currentuser => {
        return <User user={currentuser} removeClickOpen={this.removeClickOpen} key={currentuser._id}/>;
      })
    }

    filterContent(users, searchTerm) {
        const result = users.filter((user) => 
        user.username.toLowerCase().includes(searchTerm) ||
        user.username.includes(searchTerm));
       this.setState({users: result});
    }

    handleTextSearch=(e)=>{

       const searchTerm = e.currentTarget.value;

       axios.get("http://localhost:5000/user/").then(res=>{
         if(res.data){
          this.filterContent(res.data, searchTerm)
         }
       });
  
    };

    removeStatus() {

      axios.delete('http://localhost:5000/user/delete/' + this.state.temp)
        .then(response => console.log(response.data));

      this.setState({
        users: this.state.users.filter(el => el._id !== this.state.temp),
        removeClick : false
      })
    }

    removeClickOpen(id) {
      this.setState({
        removeClick : true,
        temp: id
      });
    }

    //Close Dialog Box...
    removeClose() {
      this.setState({removeClick : false});
    }

    render() {
        return(
          <div>
            <div className="searchPanel">
              <div className="searchPanel_addNew">
              <button className="newCustomer_btn" onClick={() => this.nextPath('/CreateUser')}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                      </svg>
                      <span>New User</span>
                  </button>
              </div>
              <form className="searchBar">
                  <input type="text" placeholder="Type here to search" onChange={this.handleTextSearch}/>
              </form>
            </div>

            <div className="tableContent">
              <table id="table">
                <thead>
                  <tr>
                    <th>UserID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Department</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.userList()}
                </tbody>
             </table>
            </div>

            <Dialog open={this.state.removeClick} onClose={this.removeClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
              <DialogContent>
                <DialogContentText className="alertContent" id="alert-dialog-description">
                  <div>Do you want to remove this user?</div>
                  <textarea></textarea>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.removeStatus} color="primary">
                  Yes
                </Button>
                <Button onClick={this.removeClose}  color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

export default withRouter(UserTable);