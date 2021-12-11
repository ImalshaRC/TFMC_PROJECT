import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../css/styles.css';
import './../../css/css1.css';
import jsPDF from "jspdf";
import "jspdf-autotable";

function TodayAttds() {
    const [attds, setAttds] = useState([]);
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
            const filteredData = attds.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setAttds(filteredData);
        }
    }

    const loadUser = async() => {
        const result = await axios.get('http://localhost:5000/attendance1/');
        setAttds(result.data.reverse());
    }

    //generate pdf

    const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    const marginLeft = 10;
    const doc = new jsPDF('p', 'mm', [457, 350]);

    doc.setFontSize(15);

    const title = "Employee Attendance Report";
    const headers = [["userID", "Date", "Start Time", "Leave Time"]];

    const data = attds.map(users=> [users.userID, users.date, users.startTime, users.leaveTime]);

    let content = {
      startY: 30,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 20);
    doc.autoTable(content);
    doc.save("EmployeeReport.pdf")
  }

  //end generate pdf

    return(
        <div >
            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="searchPanel_addNew">
                    <button className="newCustomer_btn" onClick={exportPDF} style={{backgroundColor:"#0078f7"}}>
                        Generate PDF
                    </button>
                </div>
                </div>
                <form className="searchBar">
                <input type="text" onChange={ e => handlesearchArea(e.target.value)} placeholder="Search here..."/>
                </form>
            </div>
            <i></i>
            <div className="tableContent">

            <table id="table" >
  <thead>
    <tr>
        <th scope="col">ID</th>
        <th scope="col">User ID</th>
        <th scope="col">Date</th>
        <th scope="col">Start time</th>
        <th scope="col">Leave time</th>
        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
        attds.map((attd, index) => (
            <tr>
                <td scope="row"><center>{index + 1}</center></td>
                <td><center>{attd.userID}</center></td>
                <td><center>{attd.date}</center></td>
                <td><center>{attd.startTime}</center></td>
                <td><center>{attd.leaveTime}</center></td>
                <td>
                    <center><Link to={`/editattds/${attd._id}`}><button class="table_btns">Add Leave time</button></Link></center>
                </td>
            </tr>
        ))
    }
  </tbody>
</table>
</div>
    {attds.length === 0 && <span>no records found to display</span>}
    
        </div>
    )
}

export default TodayAttds;