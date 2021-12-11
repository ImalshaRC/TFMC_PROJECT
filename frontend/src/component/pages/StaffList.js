import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../css/styles.css';
import './../../css/css1.css';
import jsPDF from "jspdf";
import "jspdf-autotable";

function StaffList() {

    const [users, setUser] = useState([]);
    useEffect(() => {
        loadUser();
    }, []);

    const [searchText, setSearchText] = useState('');

    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadUser();
        }
        else{      
            const filteredData = users.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setUser(filteredData);
        }
    }

    const loadUser = async() => {
        const result = await axios.get('http://localhost:5000/staff/');
        console.log(result.data);
        setUser(result.data.reverse());
    }

    const deleteUser = async id => {
        await axios.delete("http://localhost:5000/staff/delete/" + id);
        loadUser();
    }

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "landscape";
    
        const marginLeft = 10;
        const doc = new jsPDF('p', 'mm', [457, 350]);
    
        doc.setFontSize(15);
    
        const title = "All Staff's Report";
        const headers = [["ServiceID", "FirstName", "LastName", "DOB", "E-mail", "Address", "Telephone", "Estate"]];
    
        const data = users.map(user=> [user.fname, user.lname, user.sid, user.dob, user.email, user.address, user.tp, user.state]);
    
        let content = {
          startY: 30,
          head: headers,
          body: data
        };
    
        doc.text(title, marginLeft, 20);
        doc.autoTable(content);
        doc.save("Staff.pdf");
      }

    return(
        <div>
            <div className="searchPanel">
                <div>
                    <button className="newCustomer_btn" style={{backgroundColor:"#0078f7"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                        
                        <Link to={`/adduser`}><span>New Staff</span></Link>
                    </button>
                </div>&nbsp;&nbsp;

                <div className="searchPanel_addNew">
                    <button className="newCustomer_btn" onClick={exportPDF}  style={{backgroundColor:"#0078f7"}}>
                        Generate PDF
                    </button>
                </div>

                <form className="searchBar">
                <input type="text" onChange={ e => handlesearchArea(e.target.value)} placeholder="Search here..."/>
                </form>
            </div>
            <i></i>
            <div className="tableContent">

            <table id="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Service ID</th>
                <th scope="col">fname</th>
                <th scope="col">lname</th>
                <th scope="col">dob</th>
                <th scope="col">E-mail</th>
                <th scope="col">Address</th>
                <th scope="col">TP</th>
                <th scope="col">Estate</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
    {
        users.map((user, index) => (
            <tr>
                <td scope="row">{index + 1}</td>
                <td>{user.sid}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.dob}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.tp}</td>
                <td>{user.state}</td>
                <td>
                    <Link to={`/editstaff/${user._id}`}><button class="table_btns"><b>Edit</b></button></Link>&nbsp;
                    <button class="table_btns" onClick={() => {deleteUser(user._id)}}><b>Delete</b></button>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
</div>
    {users.length === 0 && <span>no records found to display</span>}
        </div>
    )
}

export default StaffList;