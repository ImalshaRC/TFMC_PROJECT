import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class UpdateOrder extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          item: '',
          itemcode: '',
          quantity: 0,
          deadline: new Date(),
          unitprice: 0,
          totalprice: 0,
          city: '',
          country: '',
          products: []
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:5000/order/get/' + this.props.match.params.id)
          .then(response => {
            this.setState({
              item: response.data.item,
              itemcode: response.data.itemcode,
              quantity: response.data.quantity,
              deadline: new Date(response.data.deadline),
              unitprice: response.data.unitprice,
              totalprice: response.data.totalprice,
              city: response.data.city,
              country: response.data.country
            })
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    onChangeDeadline(date) {
      this.setState({
        deadline: date
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
  
      const order = {
         deadline: this.state.deadline,
         city: this.state.city,
         country: this.state.country
      }
  
      console.log(order);
  
      axios.put('http://localhost:5000/order/update/' + this.props.match.params.id, order)
        .then(response => console.log(response.data))
  
      this.setState ({
        item: '',
        itemcode: '',
        quantity: 0,
        deadline: '',
        unitprice: 0,
        totalprice: 0,
        city: '',
        country: ''
      })

      this.props.history.push("/OrderManagement");

    }
 
    render() {
        return (
                <div className="formBackground">
                    <div className="formContainer">
                        <div className="formHeader">
                            <button type="button" name="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Update An Order</h2>
                        </div>

                        <div className="formBody">
                            <form onSubmit={this.onSubmit}>
                                <table>
                                  <tbody>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Item Code</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.item} disabled /></td>
                                        <td><input type="text" value={this.state.itemcode} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>Quantity</th>
                                        <th>Deadline</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.quantity} disabled/></td>
                                        <td><DatePicker selected={this.state.deadline} onChange={this.onChangeDeadline} /></td>
                                    </tr>
                                    <tr>
                                        <th>Unit Price</th>
                                        <th>Total Price</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.unitprice} disabled /></td>
                                        <td><input type="text" value={this.state.unitprice * this.state.quantity} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>Deliver City</th>
                                        <th>Deliver Country</th>
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
        );
    }

}

export default UpdateOrder;