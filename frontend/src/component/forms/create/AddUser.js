import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../../../css/styles.css';
import { useRef } from 'react';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUser = () => {

//////////////////////
  const webRef = useRef(null);

    const [imageUrl, setImageUrl] = useState('');

    const showImage = () => {
        setImageUrl(webRef.current.getScreenshot());
    }
////////////////////

    let history = useHistory();

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

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
          await axios.post('http://localhost:5000/newstaff/abc/', user).then(() => {
            alert("staff member added successfully");
          }).catch((err) => {
              alert(err);
          })        
          history.push("/employeeManagement");
        }   
    }

    const formValidation = () =>{

      if(!fname.match(/^([a-zA-Z]{2,15})$/)){
        toast.error("Please insert valid first name");
      }
      else if(!lname.match(/^([a-zA-Z]{2,15})$/)){
        toast.error("Please insert valid last name");
      }
      else if(dob === ""){
        toast.error("Please insert valid date of birth");
      }
      else if(!nic.match(/^([0-9]{9,9})([A-Za-z]{1,1})$/) && !nic.match(/^([0-9]{10,10})$/)){
        toast.error("Please insert valid NIC number");
      }
      else if(!caddress.match(/^[a-zA-Z].{3,25}$/)){
        toast.error("Please insert correct current address");
      }
      else if(!paddress.match(/^[a-zA-Z].{3,25}$/)){
        toast.error("Please insert correct permanent address");
      }
      else if(desig ===  "" ){
        toast.error("Please select designation");
      }
      else if(dept === "" ){
        toast.error("Please selsct department");
      }
      else if(!salary.match(/^([0-9]{3,6})$/)){
        toast.error("Please insert correct salary amount");
      }
      else if(!tp.match(/^([0-9]{9,10})$/)){
        toast.error("Please insert valid mobile number");
      }
      else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        toast.error("Please insert correct email");
      }
      else if(!userID.match(/^([A-Z]{2,2})([0-9]{8,8})$/)){
        toast.error("Please insert valid userID");
      }
      else if(!psw.match(/(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)){
        toast.error("Please insert valid Password");
      }
      else{
        return true;
      }
    }

    return(
    <div>
    <div class="include">
      <><ToastContainer 
      position={'top-left'}/></>

    <form onSubmit={e => onSubmit(e)}><br/>
        <center><h3>Employee Registration</h3></center>

      <table class="signup-table">
        <tr>
          <td>
            First Name<br/>
            <input type="text"  class="insert"  placeholder="First name" name="fname" value={fname} onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Last Name<br/>
            <input type="text" name="lname" class="insert" value={lname} placeholder="Last name" onChange={ e => onInputChange(e)}  required/>              
          </td>
          <td>
            Date Of Birth<br/>
            <input type="Date" name="dob" class="insert" value={dob} placeholder="DOB" onChange={ e => onInputChange(e)}  required/>
          </td>
        </tr>
        <tr>
          <td>
            NIC No<br/>
            <input type="text" name="nic" value={nic} class="insert" placeholder="NIC no" onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Current Address<br/>
            <input type="text" name="caddress" value={caddress} class="insert" placeholder="Current Address" onChange={ e => onInputChange(e)}  required/>
          </td>
          <td>
            Permanent Address<br/>
            <input type="text" name="paddress" value={paddress} class="insert" placeholder="Permanent Address" onChange={ e => onInputChange(e)}  required/>
          </td>
        </tr>
      </table>


      <table class="signup-table">
        <tr>
          <td>
            Choose designation<br></br>
            <select name="desig" value={desig} onChange={ e => onInputChange(e)} required>
            <option>Designation</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Staff">Staff</option>
            </select>
          </td>
          <td>
          Choose Department<br/>
          <select name="dept" value={dept} onChange={ e => onInputChange(e)} required>
          <option>Department</option>
          <option value="HR">HR</option>
          <option value="Account">Account</option>
          <option value="Sales">Sales</option>
          </select>
        </td>
        <td>
            Salary<br/>
            <input type="text" name="salary" value={salary} class="insert" placeholder="Salary" onChange={ e => onInputChange(e)} required/>
          </td>
        </tr>
        <tr>
          <td>
            Telephone No<br/>
            <input type="text" name="tp" value={tp} class="insert" placeholder="TP No" onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Email Address<br/>
            <input type="text" name="email" value={email} class="insert" placeholder="Email Address" onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Your ID<br/>
            <input type="text" class="insert" name="userID" value={userID} placeholder="User id" onChange={ e => onInputChange(e)} required/>
          </td>
        </tr>
        <tr>
          <td>
            Password<br/>
            <input type="Password" name="psw" class="insert" value={psw} placeholder="Password" onChange={ e => onInputChange(e)} required/>
          </td>
        </tr>
        </table><br/>
        <br/>

      <center>
      <button type = "submit" onclick="" class="button">Submit</button>
      <button type = "reset" onclick="" class="button">reset</button>
      <Link to={`/employeeManagement/`}><button onclick="" class="button">back</button></Link>
      </center>
    
    </form>
    </div>
    </div>
    )
    //password => Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
    //<Webcam ref={webRef} screenshotFormat="image/jpeg" /><br/><br/>
}

export default AddUser;