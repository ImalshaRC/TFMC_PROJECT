import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './../../css/styles.css';

const User = () => {

    let history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState({
        fname: "",
        lname: "",
        dob: "",
        nic: "",
        caddress: "",
        paddress: "",
        desig: "",
        dept: "",
        tp: "",
        email: "",
        salary: "",
        psw: "",
        userID: ""
    });

    const { fname, lname, dob, nic, caddress, paddress, desig, dept, tp, email, salary, psw, userID } = user;

    const onSubmit = async e => {  
        history.push("/test-edit/" + id);
    };

    useEffect(() => {
      loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get("http://localhost:5000/newstaff/get/" + id);
        //console.log(result.data);
        setUser(result.data);
    }

    return(
      <div>
      <div class="include">
    <form onSubmit={e => onSubmit(e)}><br/>
        <center><h3>View Employee Details</h3></center>

      <table class="signup-table">
        <tr>
          <td>
            First Name<br/>
            <input type="text"  class="insert"  placeholder="First name" name="fname" value={fname}/>
          </td>
          <td>
            Last Name<br/>
            <input type="text" id="uName" name="lname" class="insert" value={lname} placeholder="Last name"/>
          </td>
          <td>
            Date Of Birth<br/>
            <input type="text" id="uName" name="dob" class="insert" value={dob} placeholder="DOB" />
          </td>
        </tr>
        <tr>
          <td>
            NIC No<br/>
            <input type="text" name="nic" value={nic} class="insert" placeholder="NIC no"/>
          </td>
          <td>
            Current Address<br/>
            <input type="text" name="caddress" value={caddress} class="insert" placeholder="Current Address"/>
          </td>
          <td>
            Permanent Address<br/>
            <input type="text" name="paddress" value={paddress} class="insert" placeholder="Permanent Address" />
          </td>
        </tr>
      </table>


      <table class="signup-table">
        <tr>
          <td>
            Choose designation<br></br>
            <select name="desig" value={desig}>
            <option disabled="disabled" selected="select">--Select destination--</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Staff">Staff</option>
            </select>
          </td>
          <td>
          Choose Department<br/>
          <select name="dept" value={dept}>
          <option disabled="disabled" selected="select">--Select Department--</option>
          <option value="HR">HR</option>
          <option value="Account">Account</option>
          <option value="Sales">Sales</option>
          </select>
        </td>
        <td>
            Salary<br/>
            <input type="text" name="salary" value={salary} class="insert" placeholder="Salary"/>
          </td>
        </tr>
        <tr>
          <td>
            Telephone No<br/>
            <input type="text" name="tp" value={tp} class="insert" placeholder="TP No"/>
          </td>
          <td>
            Email Address<br/>
            <input type="text" name="email" value={email} class="insert" placeholder="Email Address"/>
          </td>
          <td>
            Your ID<br/>
            <input type="text" class="insert" name="userID" value={userID} placeholder="User id"/>
          </td>
        </tr>
        <tr>
          <td>
            Password<br/>
            <input type="Password" name="psw" class="insert" value={psw} placeholder="Password"/>
          </td>
          
        </tr>
        </table><br/>
        <br/>

      <center>
      <button type = "submit" onclick="" class="button">Tap to Edit details</button>
      <Link to={`/employeeManagement/`}><button onclick="" class="button">back</button></Link>
      </center>
    
    </form>
    </div>
    </div>
    )
}
//<button type = "submit" onclick="" class="button">Tap to Edit details</button>

export default User;