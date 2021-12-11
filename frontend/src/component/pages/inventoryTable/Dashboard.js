import React, { Component } from 'react';
import axios from 'axios';
import './inventory_dash.css';
import CurrencyFormat from 'react-currency-format';

class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            productSum:"0",
            materialSum:"0",
            safetystockSum:"0",
            deadstockSum:"0",
            productValue:"",
            materialValue:"",
            safetystockValue:"",
            deadstockValue:"",
            ltp:[],
            ltm:[],
            lts:[]
        }
    }
    
    componentDidMount(){
        axios.get("http://localhost:5000/products/lt").then((res)=>{
          
            this.setState({
                ltp:res.data.products
            })
        }).catch((err)=>{
            alert(err.message)
        })

        axios.get("http://localhost:5000/material/lt").then((res)=>{
            this.setState({
                ltm:res.data.materials,
            })
        }).catch((err)=>{
            alert(err.message)
        })

        axios.get("http://localhost:5000/safetystock/lt").then((res)=>{
            this.setState({
                lts:res.data.safetystocks,
            })
        }).catch((err)=>{
            alert(err.message)
        })

        axios.get("http://localhost:5000/products/").then((res)=>{

        var sum =0;
        for(let i = 0 ; i<= res.data.length-1 ; i++){
            sum = sum + res.data[i].Available_Units;
        }
        var proVal = 0;
        for(let pItem = 0; pItem <= res.data.length-1 ; pItem++){
            proVal = proVal + (res.data[pItem].Available_Units*res.data[pItem].Unit_Price);
        }
        console.log(res.data)

        this.setState({
            productSum:sum,
            productValue:proVal
        })

        }).catch((err)=>{
            alert(err.message)
        })

        axios.get("http://localhost:5000/material/").then((res)=>{
        var sum =0;
        for(let i = 0 ; i<= res.data.length-1 ; i++){
            sum = sum + res.data[i].Available_Units;
        }
        var matVal = 0;
        for(let mItem = 0; mItem <= res.data.length-1 ; mItem++){
            matVal = matVal + (res.data[mItem].Available_Units*res.data[mItem].Unit_Price);
        }
        this.setState({
            materialValue:matVal,
            materialSum:sum
        })

        }).catch((err)=>{
            alert(err.message)
        })

        axios.get("http://localhost:5000/safetystock/").then((res)=>{
        var sum =0;
        for(let i = 0 ; i<= res.data.length-1 ; i++){
            sum = sum + res.data[i].Available_Units;
        }
        var ssVal = 0;
        for(let ssItem = 0; ssItem <= res.data.length-1 ; ssItem++){
            ssVal = ssVal + (res.data[ssItem].Available_Units*res.data[ssItem].Unit_Price);
        }
        this.setState({
            safetystockValue:ssVal,
            safetystockSum:sum
        })

        }).catch((err)=>{
            alert(err.message)
        })

        axios.get("http://localhost:5000/deadstock/").then((res)=>{
        var sum =0;
        for(let i = 0 ; i<= res.data.length-1 ; i++){
            sum = sum + res.data[i].Available_Units;
        }
        var dVal = 0;
        for(let dItem = 0; dItem <= res.data.length-1 ; dItem++){
            dVal = dVal + (res.data[dItem].Available_Units*res.data[dItem].Unit_Price);
        }
        this.setState({
            deadstockValue:dVal,
            deadstockSum:sum  
        })

        }).catch((err)=>{
            alert(err.message)
        })

        
    }

    render() {
        return (
            <div className="tableContent">

                <div class="top-container">

                    <div class="dashboard_container">
                      <h4>Inventory Value</h4>
                      <div class="dashvalue">
                        <CurrencyFormat 
                        value={this.state.productValue+this.state.materialValue+this.state.safetystockValue+this.state.deadstockValue} 
                        displayType={'text'} thousandSeparator={true} prefix={'Rs.'} />
                      </div>
                    </div>

                    <div class="dashboard_container">
                      <h4>Inventory Stock Quantity</h4>
                      <div class="dashvalue">
                      {this.state.productSum+this.state.materialSum+this.state.safetystockSum+this.state.deadstockSum}
                      </div>
                    </div>
                    
                  </div>
                    <div class="dash_topic">
                  <h2>LOW STOCK ITEMS</h2>
                  </div>
                    <div class="low-stock-container">

                    <div class="dashboard_container">
                      <h4>Products</h4>
                      <table class="stocktable">
                        <tr>
                          <th>Item</th>
                          <th>Amount</th>
                        </tr>
                        <tbody>
                        {this.state.ltp.map((product)=>(
                            <tr>
                            <td>{product.Name}</td>
                            <td>{product.Available_Units}</td>
                            </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    <div class="dashboard_container">
                      <h4>Materials</h4>
                      <table class="stocktable">
                        <tr>
                          <th>Item</th>
                          <th>Amount</th>
                        </tr>
                        <tbody>
                        {this.state.ltm.map((material)=>(
                        <tr>
                            <td>{material.Name}</td>
                            <td>{material.Available_Units}</td>
                        </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>

                    <div class="dashboard_container">
                      <h4>Safety Stock</h4>
                      <table class="stocktable">
                        <tr>
                          <th>Item</th>
                          <th>Amount</th>
                        </tr>
                        <tbody>
                        {this.state.lts.map((safetystock)=>(
                        <tr>
                            <td>{safetystock.Name}</td>
                            <td>{safetystock.Available_Units}</td>
                        </tr>
                        ))}
                        </tbody>
                      </table>
                    
                    
                    </div>
                    
                  </div>

            </div>
        );
    }
}

export default Dashboard;