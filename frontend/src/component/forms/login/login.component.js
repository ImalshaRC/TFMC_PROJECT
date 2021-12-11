import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Logo from './../../../images/logo/logo.png';
import axios from 'axios';
import LoginError from '../errors/loginError.component';
import Loader from './loginLoader.component';

const useStyles = makeStyles({
    field: {
        display: 'block',
        marginTop: '10px',
        marginBottom: '10px',
    }
});

function Login() {

    const classes = useStyles();
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [load, setLoad] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {

          setLoad(true);

          const config = {
              header: {"Content-type": "application.json"}
          }

          const {data} = await axios.post('http://localhost:5000/user/login', {username, password}, config)

          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));

          const userInfo = localStorage.getItem("userInfo");

          setLoad(false);
      
          if (userInfo) {
              history.push('/Dashboard');
          }

        } catch(error) {
            setError(true);
            setLoad(false);
        }

    }

    return (
        <div className="loginLayoutBody">
            {load && <Loader />}
            <div className="loginWrapper">
                <div className="login_LogoPanel">
                    <img src={Logo} alt="FineLeaves Logo" />
                </div>
                <div className="login_Content">
                    <div className="loginHeading">
                        <h2>User Login Panel</h2>
                    </div>
                    <div className="loginBody">
                        <form  noValidate autoComplete="off" onSubmit={onSubmit}>
                            {error && <LoginError />}
                            <TextField id="standard-basic" className={classes.field} label="Username" variant="standard" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                            <TextField type="password" id="standard-basic" className={classes.field} label="Password" variant="standard" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button id="admin_loginBtn" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
        );

}


export default Login;