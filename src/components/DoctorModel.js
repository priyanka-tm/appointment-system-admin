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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:800,
    height:400,
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

   
  const Newdoctor = ({closeModal,openModal,props}) =>{

    const [email,setEmail] = useState(" ");
    const [phone , setPhone] = useState(" ");
    const [password,setPasword] = useState("");
    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [category,setCategory] = useState("");

    function saveUser(){
      console.log({name,email,password,address,phone,category});
      closeModal()
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
        <Modal
            open={openModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Grid container>  
                <Grid  item xs={9}>
                <h3> Add Doctor</h3>
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
              <FormControl sx={{  width: '100%' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleAdd('password')}
                  // onChange={(e)=>{setPasword(e.target.value)}}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Address'} onChange={(e)=>{setAddress(e.target.value)}}  id="address" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'Phone'} onChange={(e)=>{setPhone(e.target.value)}}  id="phone" style={{width:"100%" ,height:"100%"}} />
              </Grid>
              <Grid container item xs={6}>
              <TextField label={'category'} onChange={(e)=>{setCategory(e.target.value)}}  id="category" style={{width:"100%" ,height:"100%"}} />
              </Grid>   
              </Grid>
              <Button variant="contained" style={{width:"100%" ,height:"10%",marginTop:"3%"}} onClick={saveUser}  disableElevation>Add Doctor</Button>
            </Box>
        </Modal>
        </>
    )
}

export default Newdoctor;