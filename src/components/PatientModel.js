import React, { useState } from "react";
import Box from '@mui/material/Box';
import {Modal} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from "axios";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { apiInstance } from 'src/httpClient/httpClient';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:750,
    height:300,
    bgcolor: 'background.paper',
    borderRadius:1,
    boxShadow: 24,
    p: 4,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })); 

  const PatientModel = ({closeModal,openModal,getAllpatient,isPatientEdit}) =>{
    console.log('getAllpatient====',getAllpatient);
    const [email,setEmail] = useState("");
    const [phone , setPhone] = useState("");
    const [name,setName] = useState("");
    const [address,setAddress] = useState("")
    const [loader, setLoader] = useState(false);

    const newPatient = async () =>{
      const Addpatient = {
        "role": "patient",
        "email":email,
        "phone":phone,
        "name":name,
        "address":address
      }
      // console.log('-----',Addpatient);
      try{
        console.log('-----try---');
        const response = await apiInstance.post('user', Addpatient)
        console.log('ressssssssssssssssssssssssssssssss===',response)
        getAllpatient();
        closeModal();
      }
      catch(error){
        setLoader(false);
        console.log("---------------your-------------",error.response);
      }
    }

    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    });
  
    const handleAdd = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
      setPasword(event.target.value)
    };
  
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    

    return(
        <>  
     
            <Box sx={style}>
              <Grid container>  
                <Grid  item xs={9}>
                <h3>{isPatientEdit ? 'Edit patient' : 'Add patient'}</h3>
                </Grid>
                <Grid  item xs={3} sx={{display: 'flex',justifyContent:'flex-end'}}>
                {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
                <CloseRoundedIcon onClick={closeModal} />
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{marginTop:1}}>
              <Grid container item xs={6}>
              <TextField label={'Name'} onChange={(e)=>{setName(e.target.value)}}  id="name" type="text" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Email'} onChange={(e)=>{setEmail(e.target.value)}}  id="email" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Address'} onChange={(e)=>{setAddress(e.target.value)}}  id="address" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Phone'} onChange={(e)=>{setPhone(e.target.value)}}  id="phone  " style={{width:"100%" ,height:"100%"}} />
              </Grid>
              </Grid>
              <Button variant="contained" style={{width:"100%" ,height:"15%",marginTop:"3%"}} onClick={newPatient}  disableElevation>
              Register
              {loader && <CircularProgress color="inherit" size={15} style={{ marginLeft: '10px' }} />}
              </Button>
            </Box>
      
        </>
    )
}

export default PatientModel;