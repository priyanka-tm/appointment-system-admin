import React, { useState } from "react";
import Box from '@mui/material/Box';
import {Modal} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { apiInstance } from 'src/httpClient/httpClient';
// import {CircularProgress} from '@mui/icons-material'
import {CircularProgress} from '@mui/material';

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

  const PatientModel = ({handleClose,closeModal,getAllpatient,isPatientEdit,oneData,patient}) =>{
  
    console.log('getAllpatient====',getAllpatient);
    const [email,setEmail] = useState(patient?.email || '');
    const [phone , setPhone] = useState(patient?.phone || '');
    const [name,setName] = useState(patient?.name || '');
    const [loader, setLoader] = useState(false);

    const newPatient = async () =>{
      const Addpatient = {
        "role": "patient",
        "email":email,
        "phone":phone,
        "name":name,
      }
      // console.log('-----',Addpatient);
      setLoader(true);
    if (isPatientEdit){
      try{
        console.log('-----try---');
        const response = await apiInstance.put(`user/${patient?._id}`,Addpatient)
        console.log('ressssssssssssssssssssssssssssssss===',response)
        setLoader(false);
        handleClose();
        getAllpatient();
      }catch(error){
        setLoader(false);
        console.log("---------------your-------------",error.response);

      }  
    }else{
      try{
        const response = await apiInstance.post('user', Addpatient)
        console.log('ressssssssssssssssssssssssssssssss===',response)
        setLoader(false);
        handleClose();
        getAllpatient();
      }catch(error){
        setLoader(false);
        console.log("---------------your-------------",error.response);
      
      }
      
    }
  }
  

    return(
        <>  
     
            <Box sx={style}>
              <Grid container>  
                <Grid  item xs={9}>
                <h3>{isPatientEdit ? 'Edit patient' : 'Add patient'}</h3>
                </Grid>
                <Grid  item xs={3} sx={{display: 'flex',justifyContent:'flex-end'}}>
                {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
                <CloseRoundedIcon onClick={handleClose} />
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{marginTop:1}}>
              <Grid container item xs={6}>
              <TextField label={'Name'} value={name} onChange={(e)=>{setName(e.target.value)}}  id="name" type="text" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Email'} value={email}  onChange={(e)=>{setEmail(e.target.value)}}  id="email" style={{width:"100%" ,height:"100%"}} />
              </Grid>
             
              <Grid container item xs={6}>
              <TextField label={'Phone'} value={phone} onChange={(e)=>{setPhone(e.target.value)}}  id="phone  " style={{width:"100%" ,height:"100%"}} />
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