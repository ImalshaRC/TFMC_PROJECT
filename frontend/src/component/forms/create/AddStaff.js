import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../../../css/styles.css';
import { useRef } from 'react';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStaff = () => {

    let history = useHistory();

    const [user, setUser] = useState({
        fname: "",
        lname: "",
        sid: "",
        dob: "",
        email: "",
        address: "",
        tp: "",
        state: ""
    });

    const { fname, lname, sid, dob, email, address, tp, state } = user;

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid != 1){
          await axios.post('http://localhost:5000/staff/add/', user).then(() => {
            alert("staff member added successfully");
          }).catch((err) => {
              alert(err);
          })        
          history.push("/estatemanagement");
        }   
    }

    const formValidation = () =>{

        if(!fname.match(/^([a-zA-Z]{2,15})$/)){
          toast.error("Please insert valid first name");
          return 1;
        }
        if(!lname.match(/^([a-zA-Z]{2,15})$/)){
          toast.error("Please insert valid last name");
          return 1;
        }
        if(!sid.match(/^([A-Z]{2,2})([0-9]{8,8})$/)){
          toast.error("Please insert valid Estate ID");
          return 1;
        }
        if(dob === ""){
          toast.error("Please insert valid date of birth");
          return 1;
        }
        if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
          toast.error("Please insert valid E-mail");
          return 1;
        }
        if(!address.match(/^[a-zA-Z].{3,25}$/)){
          toast.error("Please insert correct address");
          return 1;
        }
        if(!tp.match(/^([0-9]{9,10})$/)){
          toast.error("Please insert correct Telephone");
          return 1;
        }
        if(state === "" ){
          toast.error("Please selsct Estate");
          return 1;
        }
      }

    return(
    <div>
    <div class="include">
      <><ToastContainer 
      position={'top-left'}/></>

    <form onSubmit={e => onSubmit(e)}><br/>
        <center><h3>Staff Registration</h3></center>

      <table class="signup-table">
        <tr>
          <td>
            First Name<br/>
            <input type="text" class="insert"  placeholder="First name" name="fname" value={fname} onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Last Name<br/>
            <input type="text" name="lname" class="insert" value={lname} placeholder="Last name" onChange={ e => onInputChange(e)}  required/>            
          </td>
          
        </tr>
        <tr>
        <td>
            Date Of Birth<br/>
            <input type="Date" name="dob" class="insert" value={dob} placeholder="DOB" onChange={ e => onInputChange(e)}  required/>
          </td>
          <td>
            Staff ID<br/>
            <input type="text" name="sid" value={sid} class="insert" placeholder="SID" onChange={ e => onInputChange(e)} required/>
          </td>
          
        </tr>
        <tr>
        <td>
            Address<br/>
            <input type="text" name="address" value={address} class="insert" placeholder="Address" onChange={ e => onInputChange(e)}  required/>
          </td>
          <td>
            E-mail<br/>
            <input type="text" name="email" value={email} class="insert" placeholder="email" onChange={ e => onInputChange(e)}  required/>
          </td>
          
        </tr>
        <tr>
        <td>
            Telephone no<br/>
            <input type="text" name="tp" value={tp} class="insert" placeholder="TP NO" onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Choose Estate<br></br>
            <select name="state" value={state}  onChange={ e => onInputChange(e)} required>
            <option>Estate</option>
            <option value="State1">Estate 1</option>
            <option value="State2">Estate 2</option>
            <option value="State3">Estate 3</option>
            </select>
          </td>
        </tr>
      </table>
        <br/>

      <center>
      <button type = "submit" onclick="" class="button">Submit</button>
      <Link to={`/estatemanagement/`}><button onclick="" class="button">back</button></Link>
      </center>
    
    </form>
    </div>
    </div>
    )
    //password => Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
    //<Webcam ref={webRef} screenshotFormat="image/jpeg" /><br/><br/>
}

export default AddStaff;