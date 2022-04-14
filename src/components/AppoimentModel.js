import React, {useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Modal} from '@mui/material';
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
import moment from "moment"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'


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

  const   AppoimentModel = ({closeModal,getallAppoiment,isAppoimentEdit,AppoimentSingleData}) =>{
    console.log('getAllAppoiment====',AppoimentSingleData);
    console.log('getAllAppoiment0000000000000000000000====',AppoimentSingleData?.appointmentdate);
    console.log('getAllAp====================================',moment(AppoimentSingleData?.appointmentdate).format('MM/DD/YYYY'));
   
    const [alldata, setAllData] = useState([]);
    const [doctor,setDoctor] = useState(AppoimentSingleData?.name || '');
    const [patient,setPatient] = useState(AppoimentSingleData?.patient || "");
    const [appointmentdate,setAppointmentdate] = useState(moment(AppoimentSingleData?.appointmentdate).format('MM/DD/YYYY') ||  new Date());
    const [message,setMessage] = useState(AppoimentSingleData?.message || '');    
    const [loader, setLoader] = useState(false);
    // const [value, setValue] = React.useState(AppoimentSingleData?.appointmentdate || new Date('2014-08-18T21:11:54'));

    useEffect(() => {
      getDoctor();
    }, []);

    const handleChange = (newValue) => {
      console.log('e.target.value: ',newValue);
     
        setAppointmentdate(newValue);
      };

    const newAppointment = async () =>{
      const AddAppoiment = {
        "doctor":doctor,
        "patient":patient,
        "appointmentdate":appointmentdate,
        "massge":message,
      }
      // console.log('-----',AddAppoiment);
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
        console.log("---------------yourrrrrrrrrrrrrrrrrrrrrr-------------",error.response);
        closeModal();
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
        closeModal();
      
      }
    }
  }



  const getDoctor = async () => {
    // setLoader(true);
    try {
      const res = await apiInstance.get('user/?role=doctor');
      console.log('all user data',res);
      setAllData(res.data.data);
    } catch (error) {
      console.log('resss===', error.response);
    }
  };

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
              <FormControl fullWidth>
              <InputLabel>Doctor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                label="Doctor"
                onChange={(e) => {
                  setDoctor(e.target.value);
                }}
                style={{ width: '100%', height: '100%' }}
              >
                {alldata &&
                  alldata?.map((e) => {
                    return <MenuItem value={e._id}>{e.name}</MenuItem>;
                    console.log('eeeeeeeeeeeeeee',e.id);
                  })}
              </Select>
            </FormControl>
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Patient name'} value={patient?.name}  onChange={(e)=>{setPatient(e.target.value)}}  id="name" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          // inputFormat="dd/mm/yyyy"
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