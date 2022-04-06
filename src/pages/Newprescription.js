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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import UploadImg from "./UploadMedia";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';


const baseURL = "https://jsonplaceholder.typicode.com/users";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:800,
    height:350,
    bgcolor: 'background.paper',
    borderRadius:1,
    boxShadow: 24,
    p: 4,
    overflow: 'scroll'

  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })); 



   
  const Newprescription = ({closeModal,openModal,props}) =>{

    const [doctor,setDoctor] = useState(" ");
    const [patient , setPatient] = useState(" ");
    const [date,setDate] = useState("");
    const [note,setNote] = useState("");
    const [media,setMedia] = useState("");
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
        setDate(e.target.value);
      };

    function saveUser(){
      console.log({doctor,patient,date,note,media});
      closeModal()
    }    

    

    return(
        <>  
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Grid container>  
                <Grid  item xs={9}>
                <h3>Add Prescription</h3>
                </Grid>
                <Grid  item xs={3} sx={{display: 'flex',justifyContent:'flex-end'}}>
                {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
                <CloseRoundedIcon onClick={closeModal} />
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{marginTop:1}}>
              <Grid container item xs={6}>
              <TextField label={'Doctor'} onChange={(e)=>{setDoctor(e.target.value)}}  id="name" type="text" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Patient'} onChange={(e)=>{setPatient(e.target.value)}}  id="email" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3} sx={{width:"100%"}}>
                    <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    </Stack>
                </LocalizationProvider>
              </Grid>
              <Grid container item xs={6}>
              <UploadImg onChange={(e)=>{setMedia(e.target.value)}} />
              </Grid>
              <Grid container item xs={12}>
              <TextareaAutosize
                onChange={(e)=>{setNote(e.target.value)}}
                maxRows={4}
                aria-label="maximum width"
                placeholder="Enter prescription"
                style={{ width: 1200 }}
               />
              </Grid>
              </Grid>
              <Button variant="contained" style={{width:"100%" ,height:"13%",marginTop:"3%"}} onClick={saveUser}  disableElevation> Add Prescription</Button>
            </Box>
        </Modal>
        </>
    )
}

export default Newprescription;