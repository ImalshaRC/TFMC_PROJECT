import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class InventoryAddSafetySet extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeSKU = this.onChangeSKU.bind(this);
        this.onChangeSafetySet = this.onChangeSafetySet.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAvailableUnits = this.onChangeAvailableUnits.bind(this);
        this.onChangeUnitPrice = this.onChangeUnitPrice.bind(this);
        this.onChangeExpireDate = this.onChangeExpireDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          sku: '',
          safety_set:'',
          name: '',
          available_units: '',
          unit_price: '',
          expire_date: '',
          products:[]
        }
    
      }

      componentDidMount(){
        axios.get("http://localhost:5000/products/").then((res)=>{
            this.setState({
                products:res.data
            })
        }).catch((err)=>{
            alert(err.message)
        })
      }
    
      
    
      onChangeSKU(e) {

        const searchTerm = e.currentTarget.value;
        axios.get("http://localhost:5000/products/").then(res=>{
           for(let i = 0 ; i <= res.data.length-1;i++){
             if(searchTerm == res.data[i].SKU){
              this.setState({
                name:res.data[i].Name,
                unit_price:res.data[i].Unit_Price
              })
              console.log(res.data[i].Name)
             }
           }
        });

        this.setState({
          sku: e.target.value
          
        })
      }

      onChangeSafetySet(e){
        this.setState({
          safety_set: e.target.value
        })
      }
    
      onChangeName(e) {
        this.setState({
          name: e.target.value
        })
      }
    
      onChangeAvailableUnits(e) {
        this.setState({
          available_units: e.target.value
        })
      }

      onChangeUnitPrice(e) {
        this.setState({
          unit_price: e.target.value
        })
      }

      onChangeExpireDate(e){
        this.setState({
          expire_date: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
        
        const {sku,safety_set,name,available_units,unit_price,expire_date} = this.state;
        const safetyset = {
          SKU: sku,
          Safety_Set: safety_set,
          Name: name,
          Available_Units: available_units,
          Unit_Price:unit_price,
          Expire_Date: expire_date
        }
    
        console.log(safetyset);
    
        axios.post('http://localhost:5000/safetystock/add', safetyset).then(()=>{
          toast.success("Safety Set Added!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }).catch((error)=>{
          toast.error("Error!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })
    
        this.setState ({
          sku: '',
          safety_set: '',
          name: '',
          available_units: '',
          unit_price: '',
          expire_date:''
        })
      }

    render() {
        return (
                <div className="formBackground">
                    <div className="formContainer">
                        <div class="formHeader">
                            <button type="button" name="button" onClick={event =>  window.location.href='/inventorymanagement'}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Add New Safety Set</h2>
                        </div>

                        <div class="formBody">
                            <form onSubmit={this.onSubmit}>
                                <table>
                                    <tr>
                                        <th>SKU</th>
                                        <th>Safety Set</th>
                                    </tr>
                                    <tr>
                                        <td>
                                        <select onChange={this.onChangeSKU} value={this.state.sku}>
                                    {this.state.products.map((product)=>(
                                        <option value={product.SKU}>{product.SKU}</option>
                                    ))}
                                    </select>
                                        
                                          
                                          </td>
                                        <td><input type="text" value={this.state.safety_set} onChange={this.onChangeSafetySet} required /></td>
                                    </tr>
                                   
                                     <tr>
                                        <th colSpan="2">Name</th>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="colspanTd">
                                            <input type="text"style={{width: "90%"}} value={this.state.name} onChange={this.onChangeName} disabled />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Available Units</th>
                                        <th>Unit Price</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.available_units} onChange={this.onChangeAvailableUnits} /></td>
                                        <td><input type="text" value={this.state.unit_price} onChange={this.onChangeUnitPrice} /></td>
                                    </tr>
                                    <tr>
                                        <th>Expire Date</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="date" value={this.state.expire_date} onChange={this.onChangeExpireDate} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2"><input type="submit" value="Submit" /></td>
                                    </tr>
                                </table>
                            </form>
                            <ToastContainer theme="dark"/>
                        </div>
                    </div>
                </div>
        );
    }

}

export default InventoryAddSafetySet;