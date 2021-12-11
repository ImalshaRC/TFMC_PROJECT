import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../../css/styles.css';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditEstate = () => {

    let history = useHistory();
    const { id } = useParams();

    const [user, setUser] = useState({
        eid: "",
        area: "",
        tcategory: "",
        noofemp: "",
        harvest: "",
        income: ""
    });

    const { eid, area, tcategory, noofemp, harvest, income } = user;

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();
        //const isValid = formValidation();
          if(true){
          await axios.put("http://localhost:5000/estate/update/" + id, user).then(() => {
              alert("Estate updated successfully");
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
        const result = await axios.get("http://localhost:5000/estate/get/" + id);
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
        <center><h3>Estate Registration</h3></center>

      <table class="signup-table">
        <tr>
          <td>
          Estate ID<br/>
            <input type="text" class="insert"  placeholder="Estate ID" name="eid" value={eid} onChange={ e => onInputChange(e)} required/>
          </td>
          <td>
            Area(ha)<br/>
            <input type="text" name="area" class="insert" value={area} placeholder="Area" onChange={ e => onInputChange(e)}  required/>            
          </td>
          
        </tr>
        <tr>
        <td>
            Tea Category<br></br>
            <select name="tcategory" value={tcategory}  onChange={ e => onInputChange(e)} required>
            <option>Tea category</option>
            <option value="Black tea">Black tea</option>
            <option value="Black tea">Black tea</option>
            <option value="White tea">White tea</option>
            <option value="Oolong tea">Oolong tea</option>
            <option value="Pu-erh tea">Pu-erh tea</option>
            <option value="Purple tea">Purple tea</option>
            </select>
          </td>
          <td>
            Number of Employees<br/>
            <input type="text" name="noofemp" value={noofemp} class="insert" placeholder="Number of Employees" onChange={ e => onInputChange(e)} required/>
          </td>  
        </tr>
        <tr>
        <td>
            Expected harvest(Ton)<br/>
            <input type="text" name="harvest" value={harvest} class="insert" placeholder="Expected harvest" onChange={ e => onInputChange(e)}  required/>
          </td>
          <td>
          Expected income(Rs)<br/>
            <input type="text" name="income" value={income} class="insert" placeholder="Expected income" onChange={ e => onInputChange(e)}  required/>
          </td>
          
        </tr>
      </table>
        <br/>

      <center>
      <button type = "submit" onclick="" class="button">Submit</button>
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

export default EditEstate;