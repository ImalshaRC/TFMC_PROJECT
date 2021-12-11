import React, {useState, useRef} from "react";
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './../../css/styles.css';


function GenQR(){

    let history = useHistory();
    const { id } = useParams();
    
    const [attendance, setAttendance] = useState({   
        startTime: "",
        leaveTime: "",
        date: "",
        userID: id
        
    });
   
    const [text, setText] = useState('');   
    const [imageUrl, setImageUrl] = useState('');
    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    const classes = useStyles();
    const qrRef = useRef(null);

    const generateQrCode = async () => {
        try {
              const response = await QRCode.toDataURL(text);
              setImageUrl(response);
              //console.log(response);
        }catch (error) {
          console.log(error);
        }
      }

      const handleErrorFile = (error) => {
        console.log(error);
      }

      const handleScanFile = (result) => {
          if (result) {
              setScanResultFile(result);
          }
      }

      const onScanFile = () => {
        qrRef.current.openImageDialog();
      }

      const handleErrorWebCam = (error) => {
        console.log(error);
      }
      const handleScanWebCam = (result) => {
        if (result){
            setScanResultWebCam(result);
        }
       }

    return(
        <form>
        <Container  className={classes.Container}>
            <Card>
                <CardContent id="attendance_form">
                    <br/>
                    <Grid >
                        
                    <center><Grid >
                    <h2>Generate Qr Code</h2><br/>
                    Enter User ID :<br/><br/>
                    <TextField label="Enter UserID Here" onChange={(e) => setText(e.target.value)}/><br/><br/>
                    <Button className={classes.btn} color="primary" variant="contained" onClick={() => generateQrCode()}>Generate</Button>&nbsp;&nbsp; 
                    <Link to={`/employeeManagement`}><Button className={classes.btn} color="primary" variant="contained" >Back</Button></Link>
                    <br/>
                    {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img style={{height: "300px", width: "300px"}} src={imageUrl} alt="img"/>
                              </a>) : null}
                    </Grid></center>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 60,
        marginRight: 140
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
     
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default GenQR;