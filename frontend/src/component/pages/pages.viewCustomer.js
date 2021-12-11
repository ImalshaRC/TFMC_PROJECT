import React, { Component } from 'react';
import axios from 'axios';

class ViewCustomer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        }
    
      }

    componentDidMount() {
      axios.get('http://localhost:5000/customer/get/' + this.props.match.params.id)
        .then(response => {
          this.setState({
              firstname: response.data.firstname,
              lastname: response.data.lastname,
              company: response.data.company,
              mobile: response.data.mobile,
              email: response.data.email,
              street1: response.data.street1,
              street2: response.data.street2,
              city: response.data.city,
              country: response.data.country
          })
      })
      .catch(function (error) {
        console.log(error);
      })
    }

    render() {
        return (
            <div className="viewCustomerBG">
                <div className="formContainer">
                        <div className="formHeader">
                            <button type="button" name="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Customer Details</h2>
                        </div>

                        <div className="formBody">
                            <form>
                                <table>
                                  <tbody>
                                    <tr>
                                        <th>First Name *</th>
                                        <th>Last Name *</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.firstname} disabled /></td>
                                        <td><input type="text" value={this.state.lastname} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>Company</th>
                                        <th>Phone Number *</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.company} disabled /></td>
                                        <td><input type="text"  value={this.state.mobile} disabled/></td>
                                    </tr>
                                    <tr>
                                        <th colSpan="2">Email *</th>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="colspanTd">
                                            <input type="text" style={{width: "90%"}} value={this.state.email} disabled />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Street 1</th>
                                        <th>Street 2</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.street1} disabled /></td>
                                        <td><input type="text" value={this.state.street2} disabled /></td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <th>Country</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.city} disabled /></td>
                                        <td><input type="text" value={this.state.country} disabled /></td>
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

export default ViewCustomer;