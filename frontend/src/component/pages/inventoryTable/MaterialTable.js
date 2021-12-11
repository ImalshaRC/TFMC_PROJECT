import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class MaterialTable extends Component {

    constructor(props){
        super(props);
        this.state = {materials:[]}
    }

    export = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Material Report";
        const headers = [["SKU", "Name","Unit_Price","Available_Units","Net.Weight","Updated_Date"]];
    
        const data = this.state.materials.map(material=>  [material.SKU, material.Name, material.Unit_Price, material.Available_Units,material.Net_Weight, material.updatedAt ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Material Report.pdf")
      }

    componentDidMount(){
        axios.get("http://localhost:5000/material/").then((res)=>{
            this.setState({
                materials:res.data
            })
        }).catch((err)=>{
            toast.warn("Data did not fethced from the Database!", {
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
        axios.delete(`http://localhost:5000/material/delete/${id}`).then((res)=>{
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
            toast.error("Error with deleting!", {
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

    filterContent(materials, searchTerm){
        const result = materials.filter((material) => 
        material.Name.toLowerCase().includes(searchTerm) ||
        material.Name.includes(searchTerm));
        this.setState({materials:result});
      }
    
      handleTextSearch=(e)=>{

        const searchTerm = e.currentTarget.value;

        axios.get("http://localhost:5000/material/").then(res=>{
           this.filterContent(res.data, searchTerm)
          
        });
    
      };
      

    render() {
        return (
            <div>
                <div className="searchPanel">
                                <div className="searchPanel_addNew">
                                    <button className="newCustomer_btn" onClick={event =>  window.location.href='/inventorymanagement/inventoryaddmaterial'}>
                                        <span>New Material</span>
                                    </button>
                                </div>
                                
                                <form className="searchBar">
                                    <input type="text" onChange={this.handleTextSearch} placeholder="Search Material..."/>
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
                                        <th>Unit_Price</th>
                                        <th>Available_Units</th>
                                        <th>New_Weight</th>
                                        <th>Updated_Date</th>
                                        <th>Action</th>
                                    </tr>
                                    <tbody>
                                        {this.state.materials.map((material)=>(
                                    <tr>
                                        <td>{material.SKU}</td>
                                        <td>{material.Name}</td>
                                        <td>{material.Unit_Price}</td>
                                        <td>{material.Available_Units}</td>
                                        <td>{material.Net_Weight}</td>
                                        <td><Moment format="YYYY/MM/DD">{material.updatedAt}</Moment></td>
                                        <td id="action">
                                            <a href={`/inventorymanagement/inventoryupdatematerial/${material._id}`}><i class="fa fa-refresh" aria-hidden="true"></i></a>&nbsp;
                                            <a onClick={()=>this.onDelete(material._id)}><i class="fa fa-trash" aria-hidden="true"></i></a>
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

export default MaterialTable;