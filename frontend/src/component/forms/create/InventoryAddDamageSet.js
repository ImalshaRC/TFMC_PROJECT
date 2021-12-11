import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class InventoryAddDamageSet extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeSKU = this.onChangeSKU.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeAvailableUnits = this.onChangeAvailableUnits.bind(this);
        this.onDamageValueChange = this.onDamageValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          sku: '',
          name: '',
          available_units: '',
          damage_type: '',
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
                name:res.data[i].Name
              })
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

      onDamageValueChange(e) {
        this.setState({
          damage_type: e.target.value
        });
      }

    
      onSubmit(e) {
        e.preventDefault();
    
        const {sku,name,available_units,damage_type} = this.state;

        const damageset = {
          SKU: sku,
          Name: name,
          Available_Units: available_units,
          Damaged_Type: damage_type

        }
    
        console.log(damageset);
    
    
        axios.post('http://localhost:5000/damagedstock/add', damageset).then(()=>{
          toast.success("Product Added to Damaged Stock!", {
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
          damage_type: ''
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
                            <h2>Add to Damaged Stock</h2>
                        </div>

                        <div class="formBody">
                            <form onSubmit={this.onSubmit}>
                                <table>
                                    <tr>
                                        <th>SKU</th>
                                    </tr>
                                    <tr>
                                    <select onChange={this.onChangeSKU} value={this.state.sku}>
                                    {this.state.products.map((product)=>(
                                        <option value={product.SKU}>{product.SKU}</option>
                                    ))}
                                    </select>
                                    </tr>
                                   
                                     <tr>
                                        <th>Name</th>
                                        <th>Available Units</th>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="text" value={this.state.name} onChange={this.onChangeName} disabled />
                                        </td>
                                        <td>
                                            <input type="text" value={this.state.available_units} onChange={this.onChangeAvailableUnits} required />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Damage Type</th>
                                    </tr>
                                    <tr>
                                        <td>
                                          <div>
                                          <label>
                                            <input type="radio" value="During Packing" checked={this.state.damage_type === "During Packing"} onChange={this.onDamageValueChange}/> During Packing 
                                          </label><br/>
                                          <label>
                                            <input type="radio" value="During Transporting" checked={this.state.damage_type === "During Transporting"} onChange={this.onDamageValueChange}/> During Transporting
                                          </label><br/>
                                          <label>
                                            <input type="radio" value="During Unloading" checked={this.state.damage_type === "During Unloading"} onChange={this.onDamageValueChange}/> During Unloading
                                          </label>
                                        </div>
                                        
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

export default InventoryAddDamageSet;