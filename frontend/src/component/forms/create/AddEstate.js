import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import '../../../css/styles.css';
import { useRef } from 'react';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEstate = () => {

    let history = useHistory();

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
        const isValid = formValidation();
        if(isValid){
          await axios.post('http://localhost:5000/estate/add/', user).then(() => {
            alert("Estate added successfully");
          }).catch((err) => {
              alert(err);
          })        
          history.push("/estatemanagement");
        }   
    }

    const formValidation = () =>{

      if(!eid.match(/^([a-zA-Z]{1,1})([0-9]{1,2})$/)){
        toast.error("Please insert valid Estate ID");
      }
      else if(!area.match(/^([0-9]{1,5})$/)){
        toast.error("Please insert valid Area");
      }
      else if(tcategory === ""){
        toast.error("Please select Tea category");
      }
      else if(!noofemp.match(/^([0-9]{1,4})$/)){
        toast.error("Please insert from Numbers");
      }
      else if(!harvest.match(/^([0-9]{1,6})$/)){
        toast.error("Please insert from Numbers");
      }
      else if(!income.match(/^([0-9]{1,6})$/)){
        toast.error("Please insert from Numbers");
      }else{
        return true;
      }
    }//kalana

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

export default AddEstate;