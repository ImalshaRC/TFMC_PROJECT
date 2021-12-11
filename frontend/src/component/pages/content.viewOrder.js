import React,{ Component } from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const Order = (props) => {

  return (
    <tr>
      <td>{props.order._id}</td>
      <td>{props.order.itemcode}</td>
      <td>{props.order.quantity}</td>
      <td>{props.order.unitprice}</td>
      <td>{props.order.unitprice * props.order.quantity}</td>
      <td>{props.order.advance}</td>
      <td>{props.order.city}</td>
      <td>{props.order.country}</td>
      <td>{props.order.status}</td>
    </tr>
  )
}

class ViewOrderTable extends Component {
    constructor(props) {
      super(props);

      this.state = {
        orders: [],
        customers: []
      };
    }

    componentDidMount() {
      axios.get('http://localhost:5000/order/viewOrders/' + this.props.match.params.id)
        .then(response => {
            this.setState({ orders: response.data })
        })
      axios.get('http://localhost:5000/customer/get/' + this.props.match.params.id)
        .then(response => {
            this.setState({ customers: response.data })
        })
      .catch((err) => {
            console.log(err);
        })
    }

    orderList() {
      return this.state.orders.map(currentorder => {
        return <Order order={currentorder} key={currentorder._id}/>;
      })
    }

    render() {
        return(
          <div>
            <div className="viewOrderHeader">
              <div className="row">
                  <div className="col"><span className="spanText">Customer ID</span><span className="spanInput">{this.state.customers._id}</span></div>
                  <div className="col"><span className="spanText">No Of Orders</span><span className="spanInput">{this.state.orders.length}</span></div>
              </div>
              <div className="row">
                  <div className="col"><span className="spanText">First Name</span><span className="spanInput">{this.state.customers.firstname}</span></div>
                  <div className="col"><span className="spanText">Last Name</span><span className="spanInput">{this.state.customers.lastname}</span></div>
              </div>
              <div className="row">
                  <div className="col"><span className="spanText">Email</span><span className="spanInput">{this.state.customers.email}</span></div>
                  <div className="col"><span className="spanText">Mobile</span><span className="spanInput">{this.state.customers.mobile}</span></div>
              </div>
            </div>
            <div className="viewOrderBody">
              <table id="table">
                <thead>
                  <tr>
                    <th>OrderID</th>
                    <th>ItemCode</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Advance</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.orderList()}
                </tbody>
              </table>
            </div>
          </div>
            
        );
    }
}

export default withRouter(ViewOrderTable);