import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';

class CreateOrder extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeItem = this.onChangeItem.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeAdvance = this.onChangeAdvance.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          Name: '',
          SKU: '',
          Unit_Price: '',
          Available_Units: 0,
          quantity: '',
          totalprice: '',
          advance: '',
          deadline: new Date(),
          city: '',
          country: '',
          status: 'active',
          products: [],
          validateQuantity: '3px solid grey',
          validateAdvance: '3px solid grey'
        }
    
      }

      componentDidMount() {
        axios.get('http://localhost:5000/products/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                products: response.data.map(product => product.Name),
                Name: response.data[0].Name
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
      }
    
      onChangeItem(e) {
        this.setState({
          Name: e.target.value
        })

        axios.get('http://localhost:5000/products/getProduct/' + e.target.value)
          .then(response => {
            console.log(response.data)
            this.setState({
              SKU: response.data[0].SKU,
              Unit_Price: response.data[0].Unit_Price,
              Available_Units: response.data[0].Available_Units
            })
          })
      }

      onChangeQuantity(e) {
        this.setState({
          quantity: e.target.value,
          validateQuantity: '3px solid grey'
        })
      }

      onChangeAdvance(e) {
        this.setState({
          advance: e.target.value
        })

        if(e.target.value > (this.state.Unit_Price * this.state.quantity)) {
          this.setState({
            validateAdvance: '3px solid	orange'
          })

          toast.warn('Please check the Advance!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        } else {
          this.setState({
            validateAdvance: '3px solid grey'
          })
        }
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

        if(this.state.quantity.match(/^[0-9]+$/) && this.state.advance.match(/^[+-]?\d+(\.\d+)?$/)) {
    
        const order = {
          item: this.state.Name,
          itemcode: this.state.SKU,
          quantity: this.state.quantity,
          unitprice: this.state.Unit_Price,
          advance: this.state.advance,
          deadline: this.state.deadline,
          city: this.state.city,
          country: this.state.country,
          status: this.state.status
        }
    
        console.log(order);
    
        axios.post('http://localhost:5000/order/add/' + this.props.match.params.id, order)
          .then(response => console.log(response.data))
    
        this.setState ({
          Name: '',
          SKU: '',
          Unit_Price: 0,
          Available_Units: 0,
          quantity: 0,
          totalprice: 0,
          advance: 0,
          deadline: new Date(),
          city: '',
          country: ''
        })

        this.props.history.push("/OrderManagement");

        } else {

          if(!this.state.quantity.match(/^[0-9\b]+$/)) {
            this.setState({
              validateQuantity: '3px solid red'
            })
          }

          if(!this.state.advance.match(/^[+-]?\d+(\.\d+)?$/)) {
            this.setState({
              validateAdvance: '3px solid red'
            })
          }
        }
      }

    render() {
        return (
          <div>
              <ToastContainer/>
                <div className="formBackground">
                    <div className="formContainer">
                        <div className="formHeader">
                            <button type="button" name="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Place An Order</h2>
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
                                        <td><select ref="userInput" required id="placeOrderSelect" value={this.state.Name} onChange={this.onChangeItem}>
                                            { this.state.products.map(function(product) {
                                                return <option key={product} value={product}>{product} </option>;})
                                            }
                                        </select></td>
                                        <td><input type="text" value={this.state.SKU} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>Availability</th>
                                        <th>Unit Price</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.Available_Units} disabled /></td>
                                        <td><input type="text" value={this.state.Unit_Price} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" style={{border: this.state.validateQuantity}} value={this.state.quantity} onChange={this.onChangeQuantity} /></td>
                                        <td><input type="text" value={this.state.Unit_Price * this.state.quantity} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>Advance</th>
                                        <th>Deadline</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text"  style={{border: this.state.validateAdvance}} value={this.state.advance} onChange={this.onChangeAdvance} /></td>
                                        <td><DatePicker selected={this.state.deadline} onChange={this.onChangeDeadline} /></td>
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
            </div>
        );
    }

}

export default CreateOrder;