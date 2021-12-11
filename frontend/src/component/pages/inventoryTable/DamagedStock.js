import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class DamgedStockTable extends Component {


    constructor(props){
        super(props);
        this.state = {damagedstocks:[]}
    }

    export = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Damaged Stock Report";
        const headers = [["SKU", "Name","Damage_Type","Available_Units","Updated_Date"]];
    
        const data = this.state.damagedstocks.map(damagedstock=>  [damagedstock.SKU, damagedstock.Name, damagedstock.Damaged_Type, damagedstock.Available_Units,damagedstock.updatedAt]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Damaged Stock Report.pdf")
      }


    componentDidMount(){
        axios.get("http://localhost:5000/damagedstock/").then((res)=>{
            this.setState({
                damagedstocks:res.data
            })
        }).catch((err)=>{
            toast.warn("Data did not fethced from the Database!" + err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

    onDelete = (id) =>{
        axios.delete(`http://localhost:5000/damagedstock/delete/${id}`).then((res)=>{
            toast.success("Deleted!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
          this.componentDidMount();
        }).catch((err)=>{
            toast.error("Error with deleting!" + err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
      }

      filterContent(damagedstocks, searchTerm){
        const result = damagedstocks.filter((damagedstock) => 
        damagedstock.Name.toLowerCase().includes(searchTerm) ||
        damagedstock.Name.includes(searchTerm));
        this.setState({damagedstocks:result});
      }
    
      handleTextSearch=(e)=>{

        const searchTerm = e.currentTarget.value;

        axios.get("http://localhost:5000/damagedstock/").then(res=>{
           this.filterContent(res.data, searchTerm)
          
        });
    
      };

    render() {
        return (
            <div>
                <div className="searchPanel">
                                <div className="searchPanel_addNew">
                                    <button className="newCustomer_btn" onClick={event =>  window.location.href='/inventorymanagement/inventoryadddamageset'}>
                                        <span>Add Product</span>
                                    </button>
                                </div>
                                <form className="searchBar">
                                    <input type="text" onChange={this.handleTextSearch} placeholder="Search Damage Set..."/>
                                </form>
                            </div>
                            <div className="tableContent">
                            <div className="export">
                                <button onClick={this.export}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                                </svg></span>
                                </button>
                                </div>
                                <table id="table">
                                    <tr>
                                        <th>SKU</th>
                                        <th>Name</th>
                                        <th>Damage_Type</th>
                                        <th>Available_Units</th>
                                        <th>Updated_Date</th>
                                        <th>Action</th>
                                    </tr>
                                    <tbody>
                                        
                                    {this.state.damagedstocks.map((damagedstock)=>(
                                    <tr>
                                        <td>{damagedstock.SKU}</td>
                                        <td>{damagedstock.Name}</td>
                                        <td>{damagedstock.Damaged_Type}</td>
                                        <td>{damagedstock.Available_Units}</td>
                                        <td><Moment format="YYYY/MM/DD">{damagedstock.updatedAt}</Moment></td>
                                        <td id="action">
                                            <a href={`/inventorymanagement/inventoryupdatedamageset/${damagedstock._id}`}><i class="fa fa-refresh" aria-hidden="true"></i></a>&nbsp;
                                            <a onClick={()=>this.onDelete(damagedstock._id)}><i class="fa fa-trash" aria-hidden="true"></i></a>
                                        
                                        </td>
                                    </tr>
                                    ))}
                                    </tbody>
                                </table>
                            <ToastContainer theme="dark"/>
                            </div>
            </div>
        );
    }
}

export default DamgedStockTable;