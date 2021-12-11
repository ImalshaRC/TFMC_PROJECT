import React,{ Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";

const Order = (props) => {

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
      <td>{props.order.city}</td>
      <td>{props.order.country}</td>
      <td><Moment format="YYYY MMM DD">{props.order.deliveredDate}</Moment></td>
      <td>
        <button className="tableActionTrash" onClick={() => props.deleteOrder(props.order._id)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </td>
    </tr>
  )
}

class DeliverOrderTable extends Component {
    constructor(props) {
      super(props);

      this.deleteOrder = this.deleteOrder.bind(this);

      this.state = {
        orders: [],
      };
    }

    componentDidMount() {
      axios.get('http://localhost:5000/order/deliver')
        .then(response => {
            this.setState({ orders: response.data })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    orderList() {
      return this.state.orders.map(currentorder => {
        return <Order order={currentorder} deleteOrder={this.deleteOrder} key={currentorder._id}/>;
      })
    }

    deleteOrder(id) {
      axios.delete('http://localhost:5000/order/delete/' + id)
        .then(response => console.log(response.data));

      this.setState({
        orders: this.state.orders.filter(el => el._id !== id)
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

       axios.get("http://localhost:5000/order/deliver").then(res=>{
         if(res.data){
          this.filterContent(res.data, searchTerm)
         }
       });
  
     };

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
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
                    <th>City</th>
                    <th>Country</th>
                    <th>Delivered</th>
                    <th></th>
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

export default DeliverOrderTable;