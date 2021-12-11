import React,{ Component } from 'react';
import {withRouter} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "jspdf-autotable";

const Customer = (props) => {

  const history = useHistory();
  const viewUpdate = () => history.push("/UpdateCustomer/" + props.customer._id);
  const placeOrder = () => history.push("/PlaceAnOrder/" + props.customer._id);
  const viewOrder = () => history.push("/ViewOrder/" + props.customer._id);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <tr>
      <td>{props.customer._id}</td>
      <td>{props.customer.firstname}</td>
      <td>{props.customer.lastname}</td>
      <td>{props.customer.company}</td>
      <td>{props.customer.email}</td>
      <td>{props.customer.mobile}</td>
      <td>{props.customer.street1}</td>
      <td>{props.customer.street2}</td>
      <td>{props.customer.city}</td>
      <td>{props.customer.country}</td>
      <td>
      <button className="tableActionBtn" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
      </button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn"  onClick={placeOrder}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-cart3" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span>Add New Order</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={viewOrder}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-bag-plus" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                <span>View Orders</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={() => props.changeClickOpen(props.customer._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-x" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fillRule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                </svg>
                <span>Remove Corporate</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={viewUpdate}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
                <span>Update</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={() => props.removeClickOpen(props.customer._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                <span>Delete</span>
              </button>
          </MenuItem>
      </Menu>
      </td>
    </tr>
  )
}

class CorporateTable extends Component {
    constructor(props) {
      super(props);

      this.deleteCustomer = this.deleteCustomer.bind(this);
      this.markCorporate = this.markCorporate.bind(this);
      this.removeClickOpen = this.removeClickOpen.bind(this);
      this.removeClose = this.removeClose.bind(this);
      this.changeClickOpen = this.changeClickOpen.bind(this);
      this.changeClose = this.changeClose.bind(this);

      this.state = {
        customers: [],
        removeClick : false,
        changeClick: false,
        temp: ''
      };

    }

    //route...
    nextPath(path) {
      this.props.history.push(path);
    }

    //retrive customer records from database...
    componentDidMount() {
      axios.get('http://localhost:5000/customer/corporates')
        .then(response => {
            this.setState({ customers: response.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    //Filter and Search...
    filterContent(customers, searchTerm){
      const result = customers.filter((customer) => 
      customer._id.toLowerCase().includes(searchTerm) ||
      customer._id.includes(searchTerm)||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.email.includes(searchTerm)||
      customer.mobile.toLowerCase().includes(searchTerm)||
      customer.mobile.includes(searchTerm));
      this.setState({customers: result});
    }

    handleTextSearch=(e)=>{

      const searchTerm = e.currentTarget.value;

      axios.get("http://localhost:5000/customer/corporates").then(res=>{
        if(res.data){
         this.filterContent(res.data, searchTerm)
        }
      });
  
    };

    //delete customer record and filter...
    deleteCustomer() {

      axios.get('http://localhost:5000/order/viewOrders/' + this.state.temp)
        .then(response => {
          this.setState({ orders: response.data })
          console.log(this.state.orders);

          for(let i=0; i<this.state.orders.length; i++) {

            const order = {
              status : 'reject',
              description: 'Customer Deleted'
            }
      
            axios.put('http://localhost:5000/order/reject/' + this.state.orders[i]._id, order)
              .then(response => console.log(response.data));

          }

      })
      .catch((err) => {
          console.log(err);
      })

      axios.delete('http://localhost:5000/customer/delete/' + this.state.temp)
          .then(response => console.log(response.data));

      this.setState({
        customers: this.state.customers.filter(el => el._id !== this.state.temp),
        removeClick : false
      })
    }

    //Open Dialog Box...
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

    markCorporate() {

      const customer = {
        isCorporate: false
      }

      axios.put('http://localhost:5000/customer/type/' + this.state.temp, customer)
        .then(response => console.log(response.data));

      this.setState({
        customers: this.state.customers.filter(el => el._id !== this.state.temp),
        changeClick : false
      })
    }

    changeClickOpen(id) {
      this.setState({
        changeClick : true,
        temp: id
      });
    }

    //Close Dialog Box...
    changeClose() {
      this.setState({changeClick : false});
    }

    customerList() {
      return this.state.customers.map(currentcustomer => {
        return <Customer customer={currentcustomer} removeClickOpen={this.removeClickOpen} changeClickOpen={this.changeClickOpen} key={currentcustomer._id}/>;
      })
    }

    //Export Customer Array to pdf...
    exportPDF = () => {
      const unit = "pt";
      const size = "A4";
      const orientation = "portrait";
  
      const marginLeft = 20;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(12);
  
      const title = "Customer Report";
      const headers = [["ID", "FirstName", "LastName", "Email", "Mobile", "Street1", "Street2", "City", "Country"]];
  
      const data = this.state.customers.map(elt=> [elt._id, elt.firstname, elt.lastname, elt.email, elt.mobile, elt.street1, elt.street2, elt.city, elt.country]);
  
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
  
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
      doc.save("report.pdf")
    }

    render() {
        return(
          <div>
            <div className="searchPanel">
              <div className="searchPanel_addNew">
                  <button className="newCustomer_btn" onClick={() => this.nextPath('/CreateCorporate')}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                          <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                      </svg>
                      <span>New Corporate</span>
                  </button>
              </div>
              <form className="searchBar">
                  <input type="text" placeholder="Type here to search" onChange={this.handleTextSearch}/>
              </form>
            </div>

            <div className="tableContent">
              <div className="export">
                <button onClick={this.exportPDF}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                </button>
              </div>
              <table id="table">
                <thead>
                  <tr>
                    <th>CID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Street 1</th>
                    <th>Street 2</th>
                    <th>City</th>
                    <th>Country</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.customerList()}
                </tbody>
             </table>
            </div>

            <Dialog open={this.state.removeClick} onClose={this.removeClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to delete this customer ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.deleteCustomer} color="primary">
                  Yes
                </Button>
                <Button onClick={this.removeClose}  color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog open={this.state.changeClick} onClose={this.changeClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to change customer type?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.markCorporate} color="primary">
                  Yes
                </Button>
                <Button onClick={this.changeClose}  color="primary" autoFocus>
                  No
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

export default withRouter(CorporateTable);