import React, {useState, useRef} from "react";
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../../../css/styles.css';
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Attendance(){
    let history = useHistory();
    const { id } = useParams();
    
    const [attendance, setAttendance] = useState({   
        startTime: "",
        leaveTime: "",
        date: "",
        userID: id
        
    });

    const { startTime, leaveTime, date, userID = id  } = attendance;

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

        if(scanResultWebCam === id){
            e.preventDefault();
        await axios.post('http://localhost:5000/attendance1/add/', attendance).then(() => {
            alert("attendance added successfully");
        }).catch((err) => {
            alert(err);
        })
        history.push("/employeeManagement");
        }
        else if (scanResultWebCam === "") {
            alert("Please scan Barcode...");           
        } 
        else{
            alert("Scanned Barcode is wrong...");
        } 
        
    }

    return(
        <div>
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
                        <div class="qr_form2">
                            <center><br/>
                            <h3>Add daily attendance</h3><br/>
                            User ID<br/>
                            <input type="text" id="userID" name="userID"  value={userID}/><br/><br/>
                            Date<br/>
                            <input type="date" id="date" name="date"  value={date} onChange={ e => onInputChange(e)} /><br/><br/>
                            Start time<br/>
                            <input type="time" id="startTime" name="startTime"  value={startTime} onChange={ e => onInputChange(e)} /><br/><br/>
                            <button class="button" type="submit">Start Now</button>
                            <Link to={`/employeeManagement/`}><button class="button">back</button></Link>
                            </center>
                        </div>
                    </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        </form>
        </div>
        
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
})

);
export default Attendance;