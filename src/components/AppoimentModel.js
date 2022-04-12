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
import Stack from '@mui/material/Stack';

import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";


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

  const AppoimentModel = ({closeModal,getallAppoiment,isAppoimentEdit,AppoimentSingleData}) =>{
    console.log('getAllAppoiment====',AppoimentSingleData);
   

    const [doctor,setDoctor] = useState(AppoimentSingleData?.doctor || '');
    const [patient,setPatient] = useState(AppoimentSingleData?.patient || "");
    const [appointmentdate,setAppointmentdate] = useState(AppoimentSingleData?.appointmentdate || new Date('2014-08-18T21:11:54'));
    const [message,setMessage] = useState(AppoimentSingleData?.message || '');
    const [loader, setLoader] = useState(false);
    // const [value, setValue] = React.useState(AppoimentSingleData?.appointmentdate || new Date('2014-08-18T21:11:54'));

    const handleChange = (e) => {
        setAppointmentdate(e.target.value);
      };

    const newAppointment = async () =>{
      const AddAppoiment = {
        "doctor":doctor,
        "patient":patient,
        "date":appointmentdate,
        "massge":message,
      }
      // console.log('-----',Addpatient);
      setLoader(true);
    if (isAppoimentEdit){
      try{
        console.log('-----try---');
        const response = await apiInstance.put(`appointment${AppoimentSingleData?._id}`,AddAppoiment)
        console.log('resss==============================',response)
        setLoader(false);
        closeModal();
        getallAppoiment();
      }catch(error){
        setLoader(false);
        console.log("---------------your-------------",error.response);
      }  
    }else{
      try{
        const response = await apiInstance.post('appointment/publicRegistra', AddAppoiment)
        console.log('ressssssss===',response)
        setLoader(false);
        closeModal();
        getallAppoiment();
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
                <h3>{isAppoimentEdit ? 'Edit Appoiment' : 'Add Appoiment'}</h3>
                </Grid>
                <Grid  item xs={3} sx={{display: 'flex',justifyContent:'flex-end'}}>
                {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
                <CloseRoundedIcon onClick={closeModal} />
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{marginTop:1}}>
              <Grid container item xs={6}>
              <TextField label={'Doctor name'} value={doctor?.name} onChange={(e)=>{setDoctor(e.target.value)}}  id="name" type="text" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Patient name'} value={patient?.name}  onChange={(e)=>{setPatient(e.target.value)}}  id="name" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="dd/mm/yyyy"
          value={appointmentdate}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
              </Stack>
    </LocalizationProvider>
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'massge'} value={message} onChange={(e)=>{setMessage(e.target.value)}}  id="massge" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              </Grid>
              <Button variant="contained" style={{width:"100%" ,height:"15%",marginTop:"3%"}} onClick={newAppointment}  disableElevation>
              Register
              {loader && <CircularProgress color="inherit" size={15} style={{ marginLeft: '10px' }} />}
              </Button>
            </Box>
      
        </>
    )
}
export default AppoimentModel;