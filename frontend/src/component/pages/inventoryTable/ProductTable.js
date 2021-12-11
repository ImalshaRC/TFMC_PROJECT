import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Moment from "react-moment";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

class ProductTable extends Component {

    constructor(props){
        super(props);

        this.state = {products:[]}
    };

    export = () => {
        const unit = "pt";
        const size = "A4"; 
        const orientation = "landscape";
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Product Report";
        const headers = [["SKU", "Name","Unit_Price","Available_Units","Updated_Date"]];
    
        const data = this.state.products.map(product=>  [product.SKU, product.Name, product.Unit_Price, product.Available_Units, product.updatedAt ]);
    
        let content = {
          startY: 50,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("Product Report.pdf")
      }

    componentDidMount(){
        axios.get("http://localhost:5000/products/").then((res)=>{
            this.setState({
                products:res.data
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

    filterContent(products, searchTerm){
        const result = products.filter((product) => 
        product.Name.toLowerCase().includes(searchTerm) ||
        product.Name.includes(searchTerm));
        this.setState({products:result});
      }
    
      handleTextSearch=(e)=>{

        const searchTerm = e.currentTarget.value;

        axios.get("http://localhost:5000/products/").then(res=>{
           this.filterContent(res.data, searchTerm)
          
        });
    
      };

    onDelete = (id) =>{
        axios.delete(`http://localhost:5000/products/delete/${id}`).then((res)=>{
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

    render() {
        return (
            <div>
                <div className="searchPanel">
                                <div className="searchPanel_addNew">
                                    <button className="newCustomer_btn" onClick={event =>  window.location.href='/inventorymanagement/inventoryaddproduct'}>
                                        <span>New Product</span>
                                    </button>
                                </div>
                                <form className="searchBar">
                                    <input type="text"  onChange={this.handleTextSearch} placeholder="Search Product..."/>
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
                                        <th>Updated_Date</th>
                                        <th>Action</th>
                                    </tr>
                                    <tbody>

                                    {this.state.products.map((product)=>(
                                    <tr>
                                        <td>{product.SKU}</td>
                                        <td>{product.Name}</td>
                                        <td>{product.Unit_Price}</td>
                                        <td>{product.Available_Units}</td>
                                        <td><Moment format="YYYY/MM/DD">{product.updatedAt}</Moment></td>
                                        <td id="action">
                                            <Link className="tableActionTrash" to={"/inventorymanagement/inventoryupdateproduct/" + product._id}  >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                                <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                            </svg>
                                            </Link>
                                            <button className="tableActionTrash" onClick={()=>this.onDelete(product._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                            </button>
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
export default ProductTable;