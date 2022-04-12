// import React, { useState } from "react";
// import Box from '@mui/material/Box';
// import {Modal} from '@mui/material';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import TextField from '@mui/material/TextField';
// import axios from "axios";
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';



// const baseURL = "https://jsonplaceholder.typicode.com/users";


// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width:750,
//     height:300,
//     bgcolor: 'background.paper',
//     borderRadius:1,
//     boxShadow: 24,
//     p: 4,
//   };

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   })); 

   
//   const Newappointment = ({closeModal,openModal,props}) =>{

//     const [doctor,setDoctor] = useState(" ");
//     const [patient , setPatient] = useState(" ");
//     const [date,setDate] = useState("");
//     const [address,setAddress] = useState("");

//     function saveUser(){
//       console.log({doctor,patient,date,address});
//       closeModal()
//     }

//     const [values, setValues] = React.useState({
//       amount: '',
//       password: '',
//       weight: '',
//       weightRange: '',
//       showPassword: false,
//     });

    

//     return(
//         <>  
//         <Modal
//             open={openModal}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description">
//             <Box sx={style}>
//               <Grid container>  
//                 <Grid  item xs={9}>
//                 <h3>Add Appointment</h3>
//                 </Grid>
//                 <Grid  item xs={3} sx={{display: 'flex',justifyContent:'flex-end'}}>
//                 {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
//                 <CloseRoundedIcon onClick={closeModal} />
//                 </Grid>
//               </Grid>
//               <Grid container spacing={3} sx={{marginTop:1}}>
//               <Grid container item xs={6}>
//               <TextField label={'Doctor id'} onChange={(e)=>{setDoctor(e.target.value)}}  id="name" type="text" style={{width:"100%" ,height:"100%"}} />
//               </Grid>
//               <Grid container item xs={6}>
//               <TextField label={'Patient id'} onChange={(e)=>{setPatient(e.target.value)}}  id="email" style={{width:"100%" ,height:"100%"}} />
//               </Grid>
//               <Grid container item xs={6}>
//               <TextField label={'Date'} onChange={(e)=>{setDate(e.target.value)}}  id="address" style={{width:"100%" ,height:"100%"}} />
//               </Grid>
//               <Grid container item xs={6}>
//               <TextField label={'Address'} onChange={(e)=>{setAddress(e.target.value)}}  id="phone  " style={{width:"100%" ,height:"100%"}} />
//               </Grid>
//               </Grid>
//               <Button variant="contained" style={{width:"100%" ,height:"15%",marginTop:"3%"}} onClick={saveUser}  disableElevation>Register</Button>
//             </Box>
//         </Modal>
//         </>
//     )
// }

// export default Newappointment;