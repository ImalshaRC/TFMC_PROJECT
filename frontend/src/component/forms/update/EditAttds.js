import React, {useState, useRef, useEffect} from "react";
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';


function EditAttds(){

    let history = useHistory();
    const { id } = useParams();
    
    const [attendance, setAttendance] = useState({   
        startTime: "",
        leaveTime: "",
        userID: "",
        date: ""
    });

    const { startTime, leaveTime, userID, date } = attendance;

    const onInputChange = e => {
        setAttendance({...attendance, [e.target.name]: e.target.value});
    }
   
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

      const onSubmit = async e => {
        if(scanResultWebCam === userID){
            e.preventDefault();
        await axios.put('http://localhost:5000/attendance1/update/' + id, attendance).then(() => {
            alert("attendance updated successfully");
        }).catch((err) => {
            alert(err);
        })
        history.push("/employeeManagement");
        }
        else if (scanResultWebCam === "") {               
            alert("Please scan Barcode...");
        } 
        else{          
            alert("You scanned Barcode is wrong...");
        } 
        
    }

    useEffect(() => {
        loadUser();
      }, []);
  
      const loadUser = async () => {
          const result = await axios.get("http://localhost:5000/attendance1/get/" + id);
          //console.log(result.data);
          setAttendance(result.data);
      }

    return(
        <form onSubmit={e => onSubmit(e)}>
        <Container  className={classes.Container}>
            <Card>
                <CardContent id="attendance_form">
                    <br/><br/>
                    <Grid container spacing={2}>
                    <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                    <center><h4>Scan your QR code Here</h4></center><br/>
                         <QrReader
                         delay={200}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>{scanResultWebCam}</h3>
                    </Grid>
                    <Grid>
                        <div class="qr_form">
                            <center><br/>
                            <h3>Add Leave Time</h3><br/>
                            User ID<br/>
                            <input type="text" id="userID" name="userID"  value={userID}/><br/><br/>
                            Date<br/>
                            <input type="date" id="date" name="date"  value={date} onChange={ e => onInputChange(e)}/><br/><br/>
                            Start time<br/>
                            <input type="time" id="startTime" name="startTime"  value={startTime} onChange={ e => onInputChange(e)}/><br/><br/>
                            Leave time<br/>
                            <input type="time" id="leaveTime" name="leaveTime" value={leaveTime} onChange={ e => onInputChange(e)} required/><br/><br/>
                            <button class="button" type="submit">Leave Now</button>
                            <Link to={`/employeeManagement/`}><button onclick="" class="button">back</button></Link>
                            </center>
                        </div>
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </form>
    )
}

const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 60
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default EditAttds;