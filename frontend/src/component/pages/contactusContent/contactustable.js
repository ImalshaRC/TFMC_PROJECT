import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';

class Contactustable extends Component {

    constructor(props){
        super(props);

        this.state = {
            msg:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/contactus/").then((res)=>{
            this.setState({
                msg:res.data
            })

            console.log(this.state.msg);
        }).catch((err)=>{
            alert(err.message)
        })
    }

    onDelete = (id) =>{
        axios.delete(`http://localhost:5000/contactus/delete/${id}`).then((res)=>{
          alert("Deleted");
          this.componentDidMount();
        }).catch((err)=>{
            alert(err.message)
        })
      }


    render() {
        return (
            <div>
            <div className="tableContent">
                <h2>Messages</h2>
                <table id="table">
                                    <tr>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Added Date</th>
                                        <th>Action</th>
                                    </tr>
                                    <tbody>

                                    {this.state.msg.map((msgs)=>(
                                    <tr>
                                        <td>{msgs.email}</td>
                                        <td>{msgs.message}</td>
                                        <td><Moment format="YYYY/MM/DD">{msgs.createdAt}</Moment></td>
                                        <td id="action">
                                            <button className="tableActionTrash" onClick={()=>this.onDelete(msgs._id)}>
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
                                </div>
            </div>
        );
    }
}

export default Contactustable;