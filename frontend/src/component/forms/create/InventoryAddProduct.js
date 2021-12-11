import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class InventoryAddProduct extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeSKU = this.onChangeSKU.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAvailableUnits = this.onChangeAvailableUnits.bind(this);
        this.onChangeUnitPrice = this.onChangeUnitPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          sku: 'P',
          name: '',
          available_units: '',
          unit_price: '',
          products:[]
        }
    
      }


      onChangeSKU(e) {

        const searchTerm = e.currentTarget.value;
        axios.get("http://localhost:5000/products/").then(res=>{
           for(let i = 0 ; i <= res.data.length-1;i++){
             if(searchTerm == res.data[i].SKU){
              toast.warning("Existing SKU's cannot be used again!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
               this.setState({
                 sku:"P"
               })
             }
           }
        });
        this.setState({
          sku:e.target.value
        })
      }

      onChangeName(e) {

        const searchTerm = e.currentTarget.value;
        axios.get("http://localhost:5000/products/").then(res=>{
           for(let i = 0 ; i <= res.data.length-1;i++){
             if(searchTerm == res.data[i].Name){
              toast.warning("Cannot add multiple products with the same Name", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
               this.setState({
                 name:""
               })
             }
           }
        });
        
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
    
      onSubmit(e) {
        e.preventDefault();
    
        const {sku,name,available_units,unit_price} = this.state;
        const product = {
        SKU:sku,
        Name:name,
        Available_Units:available_units,
        Unit_Price:unit_price,
        }
    
        console.log(product);
    
        axios.post('http://localhost:5000/products/add', product).then(()=>{
          toast.success("Product Added!", {
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
          name: '',
          available_units: '',
          unit_price: ''
        })
      }

    render() {
        return (
                <div className="formBackground">
                    <div className="formContainer">
                        <div class="formHeader">
                            <button type="button" name="button" onClick={event =>  window.location.href='/inventorymanagement'}>
                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-chevron-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </button>
                            <h2>Add New Product</h2>
                        </div>

                        <div class="formBody">
                            <form onSubmit={this.onSubmit}>
                                <table>
                                    <tr>
                                        <th>SKU</th>
                                    </tr>
                                    <tr>
                                        <td><input type="text" value={this.state.sku} onChange={this.onChangeSKU} required /></td>
                                    </tr>
                                   
                                     <tr>
                                        <th colSpan="2">Name</th>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" className="colspanTd">
                                            <input type="text"style={{width: "90%"}} value={this.state.name} onChange={this.onChangeName} required placeholder="Variant_'Tea'_Weight(g)"/>
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

export default InventoryAddProduct;