import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../../css/styles.css';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditStaff = () => {

    let history = useHistory();
    const { id } = useParams();

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
        //const isValid = formValidation();
          if(true){
          await axios.put("http://localhost:5000/staff/update/" + id, user).then(() => {
              alert("staff member updated successfully");
          }).catch((err) => {
              alert(err);
          })
          history.push("/estatemanagement");
        }
      };

    useEffect(() => {
        loadUser();
      }, []);

    const loadUser = async () => {
        const result = await axios.get("http://localhost:5000/staff/get/" + id);
        //console.log(result.data);
        setUser(result.data);
    }

    /*const formValidation = () =>{

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
    }*/

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
            <input type="text" name="dob" class="insert" value={dob} placeholder="DOB" onChange={ e => onInputChange(e)}  required/>
          </td>
          <td>
            Service ID<br/>
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
      <button type = "submit" onclick="" class="button">Update</button>
      <button type = "reset" onclick="" class="button">reset</button>
      <Link to={`/estatemanagement/`}><button onclick="" class="button">back</button></Link>
      </center>
    
    </form>
    </div>
    </div>
    )
    //password => Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters.
    //<Webcam ref={webRef} screenshotFormat="image/jpeg" /><br/><br/>
}

export default EditStaff;