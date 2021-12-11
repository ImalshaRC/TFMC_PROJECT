import React,{ Component } from 'react';
import { useHistory } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Moment from 'react-moment';
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

const Order = (props) => {

  const history = useHistory();
  const viewUpdate = () => history.push("/UpdateOrder/" + props.order._id);
  const viewCustomer = () => history.push("/ViewCustomer/" + props.order.customerID);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
      setAnchorEl(null);
  };

  return (
    <tr>
      <td>{props.order._id}</td>
      <td>{props.order.itemcode}</td>
      <td>{props.order.item}</td>
      <td>{props.order.quantity}</td>
      <td>{props.order.unitprice}</td>
      <td>{props.order.unitprice * props.order.quantity}</td>
      <td>{props.order.advance}</td>
      <td><Moment format="YYYY MMM DD">{props.order.deadline}</Moment></td>
      <td><Moment format="YYYY MMM DD">{props.order.completedDate}</Moment></td>
      <td>
      <button className="tableActionBtn" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
        </svg>
      </button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={viewCustomer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
              </svg>
                <span>View Customer</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={() => props.changeClickOpen(props.order._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-bag-check" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                </svg>
                <span>Deliver Order</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={viewUpdate}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-pen" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                </svg>
                <span>Update Order</span>
              </button>
          </MenuItem>
          <MenuItem onClick={handleClose}>
              <button className="tableMenuBtn" onClick={() => props.removeClickOpen(props.order._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
                <span>Reject Order</span>
              </button>
          </MenuItem>
      </Menu>
      </td>
    </tr>
  )
}

class CompleteOrderTable extends Component {
    constructor(props) {
      super(props);

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      this.changeStatus = this.changeStatus.bind(this);
      this.removeStatus = this.removeStatus.bind(this);
      this.removeClickOpen = this.removeClickOpen.bind(this);
      this.removeClose = this.removeClose.bind(this);
      this.changeClickOpen = this.changeClickOpen.bind(this);
      this.changeClose = this.changeClose.bind(this);
      this.onChangeDescription = this.onChangeDescription.bind(this);

      this.state = {
        orders: [],
        removeClick : false,
        changeClick : false,
        temp : '',
        description : '',
        deliveredDate : date
      };
    }

    componentDidMount() {
      axios.get('http://localhost:5000/order/complete')
        .then(response => {
            this.setState({ orders: response.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    orderList() {
      return this.state.orders.map(currentorder => {
        return <Order order={currentorder} removeClickOpen={this.removeClickOpen} changeClickOpen={this.changeClickOpen} key={currentorder._id}/>;
      })
    }

    filterContent(orders, searchTerm){
        const result = orders.filter((order) => 
        order._id.toLowerCase().includes(searchTerm) ||
        order._id.includes(searchTerm)||
        order.itemcode.toLowerCase().includes(searchTerm) ||
        order.itemcode.includes(searchTerm));
       this.setState({orders: result});
     }

    handleTextSearch=(e)=>{

       const searchTerm = e.currentTarget.value;

       axios.get("http://localhost:5000/order/complete").then(res=>{
         if(res.data){
          this.filterContent(res.data, searchTerm)
         }
       });
  
     };

     removeStatus() {

      const order = {
        status : 'reject',
        description: this.state.description
      }

      axios.put('http://localhost:5000/order/reject/' + this.state.temp, order)
        .then(response => console.log(response.data));

      this.setState({
        orders: this.state.orders.filter(el => el._id !== this.state.temp),
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

    changeStatus() {

      const order = {
        status : 'deliver',
        deliveredDate : this.state.deliveredDate
      }

      axios.put('http://localhost:5000/order/status/' + this.state.temp, order)
        .then(response => console.log(response.data));

      this.setState({
        orders: this.state.orders.filter(el => el._id !== this.state.temp),
        changeClick : false
      })
    }

    changeClickOpen(id) {
      this.setState({
        changeClick : true,
        temp: id
      });
    }

    //Close change status Dialog Box...
    changeClose() {
      this.setState({changeClick : false});
    }

    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      })
    }

    exportPDF = () => {
      const unit = "pt";
      const size = "A4";
      const orientation = "portrait";
  
      const marginLeft = 20;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(12);
  
      const title = "Order Report";
      const headers = [["ID", "ItemCode", "Quantity", "UnitPrice", "Advance", "Deadline", "Country"]];
  
      const data = this.state.orders.map(elt=> [elt._id, elt.itemcode, elt.quantity, elt.unitprice, elt.advance, elt.deadline, elt.country]);
  
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
              </div>
              <form className="searchBar">
                  <input type="text" placeholder="Type here to search" onChange={this.handleTextSearch}/>
              </form>
            </div>

            <div className="tableContent">
              <div className="export">
                <button onClick={this.exportPDF}>
                  <svg xmlns="http://www.w3.org/2000/svg"  className="bi bi-download" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </svg>
                </button>
              </div>
              <table id="table">
                <thead>
                  <tr>
                    <th>OrderID</th>
                    <th>ItemCode</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Advance</th>
                    <th>Deadline</th>
                    <th>Completed</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.orderList()}
                </tbody>
             </table>
            </div>

            <Dialog open={this.state.removeClick} onClose={this.removeClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
              <DialogContent>
                <DialogContentText className="alertContent" id="alert-dialog-description">
                  <div>Do you want to remove this order?</div>
                  <textarea onChange={this.onChangeDescription}></textarea>
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

            <Dialog open={this.state.changeClick} onClose={this.changeClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to deliver this order?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.changeStatus} color="primary">
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

export default withRouter(CompleteOrderTable);