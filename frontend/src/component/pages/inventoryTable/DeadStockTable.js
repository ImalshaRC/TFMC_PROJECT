import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DeadStockTable extends Component {

    constructor(props){
        super(props);
        this.state = {deadstocks:[]}
    }
    
    export = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "DeadStock Report";
        const headers = [["Dead_Set","SKU", "Name","Unit_Price","Available_Units","Added_Date","Expire_Date"]];
    
        const data = this.state.deadstocks.map(deadstock=>  [deadstock.Safety_Set,deadstock.SKU, deadstock.Name, deadstock.Unit_Price, deadstock.Available_Units,deadstock.createdAt, deadstock.Expire_Date ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("DeadStock Report.pdf")
      }

    componentDidMount(){
        axios.get("http://localhost:5000/deadstock/").then((res)=>{
            this.setState({
                deadstocks:res.data
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
        axios.delete(`http://localhost:5000/deadstock/delete/${id}`).then((res)=>{
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

      filterContent(deadstocks, searchTerm){
        const result = deadstocks.filter((deadstock) => 
        deadstock.Name.toLowerCase().includes(searchTerm) ||
        deadstock.Name.includes(searchTerm));
        this.setState({deadstocks:result});
      }
    
      handleTextSearch=(e)=>{

        const searchTerm = e.currentTarget.value;

        axios.get("http://localhost:5000/deadstock/").then(res=>{
           this.filterContent(res.data, searchTerm)
          
        });
    
      };


    render() {
        return (
            <div>
                <div className="searchPanel">
                                <div className="searchPanel_addNew">
                                    <button className="newCustomer_btn" onClick={event =>  window.location.href='/inventorymanagement/inventoryadddeadset'}>
                                        <span>Add Set</span>
                                    </button>
                                </div>
                                <form className="searchBar">
                                    <input type="text" onChange={this.handleTextSearch} placeholder="Search Dead Set..."/>
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
                                        <th>Dead_Set</th>
                                        <th>SKU</th>
                                        <th>Name</th>
                                        <th>Unit_Price</th>
                                        <th>Available_Units</th>
                                        <th>Added_Date</th>
                                        <th>Expire_Date</th>
                                        <th>Action</th>
                                    </tr>
                                    <tbody>
                                        {this.state.deadstocks.map((deadstock)=>(
                                    <tr>
                                        <td>{deadstock.Dead_Set}</td>
                                        <td>{deadstock.SKU}</td>
                                        <td>{deadstock.Name}</td>
                                        <td>{deadstock.Unit_Price}</td>
                                        <td>{deadstock.Available_Units}</td>
                                        <td><Moment format="YYYY/MM/DD">{deadstock.createdAt}</Moment></td>
                                        <td><Moment format="YYYY/MM/DD">{deadstock.Expire_Date}</Moment></td>
                                        <td id="action">
                                        <a href={`/inventorymanagement/inventoryupdatedeadset/${deadstock._id}`}><i class="fa fa-refresh" aria-hidden="true"></i></a>&nbsp;
                                            <a onClick={()=>this.onDelete(deadstock._id)}><i class="fa fa-trash" aria-hidden="true"></i></a>
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

export default DeadStockTable;