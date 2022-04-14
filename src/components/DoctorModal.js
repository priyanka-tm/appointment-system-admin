import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FormControl from '@mui/material/FormControl';
import { InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { apiInstance } from 'src/httpClient/httpClient';

// const baseURL = 'https://jsonplaceholder.typicode.com/users';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 400,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const DoctorModal = ({
  getAllDoctor,
  closeModal,
  getDoctor,
  isDoctorEdit,
  docData,
  doctorSingleData
}) => {
  const [alldata, setAllData] = useState([]);
  const [email, setEmail] = useState(doctorSingleData?.email || '');
  const [phone, setPhone] = useState(doctorSingleData?.phone || '');
  // const [password, setPasword] = useState('');
  const [name, setName] = useState(doctorSingleData?.name || '');
  const [address, setAddress] = useState(doctorSingleData?.address || '');
  const [category, setCategory] = useState(doctorSingleData?.category || '');
  const [loader, setLoader] = useState(false);

  // const [values, setValues] = React.useState({
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false
  // });

  // const handleAdd = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  //   setPasword(event.target.value);
  // };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword
  //   });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  useEffect(() => {
    getAllDoctorData();
  }, []);
  // console.log(doctorData);
  const saveUser = async (e) => {
    const newDoctor = {
      role: 'doctor',
      name: name,
      email: email,
      address: address,
      phone: phone,
      category: category
    };
    console.log('newDoctor: ', newDoctor);
    // console.log('newDoctor----', newDoctor);
    setLoader(true);
    if (isDoctorEdit) {
      try {
        const respo = await apiInstance.put(`user/${doctorSingleData?._id}`, newDoctor);
        console.log('===========adddata====================', respo);
        setLoader(false);
        closeModal();
        getAllDoctor();
      } catch (error) {
        setLoader(false);
        console.log('------------error-------------', error.response);
      }
      // closeModal();
    } else {
      try {
        const respo = await apiInstance.post('user', newDoctor);
        console.log('===========adddata====================', respo);
        setLoader(false);
        closeModal();
        getAllDoctor();
      } catch (error) {
        setLoader(false);
        console.log('------------error-------------', error.response);
      }
      // closeModal();
      // getDoctor();
    }
  };

  const getAllDoctorData = async () => {
    try {
      const res = await apiInstance.get(`category`);
      console.log('all doctor data', res);
      setAllData(res.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <>
      <Box sx={style}>
        <Grid container>
          <Grid item xs={9}>
            <h3>{isDoctorEdit ? 'Edit Doctor' : 'Add Doctor'}</h3>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
            <CloseRoundedIcon onClick={closeModal} />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: 1 }}>
          <Grid container item xs={6}>
            <TextField
              label={'Name'}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              id="name"
              type="text"
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          <Grid container item xs={6}>
            <TextField
              label={'Email'}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              value={email}
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          {/* <Grid container item xs={6}>
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
              </Grid> */}
          <Grid container item xs={6}>
            <TextField
              label={'Address'}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              id="address"
              value={address}
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          <Grid container item xs={6}>
            <TextField
              label={'Phone'}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              id="phone"
              value={phone}
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
          <Grid container item xs={6}>
            {/* <TextField label={'Department'} onChange={(e)=>{setCategory(e.target.value)}}  id="category" style={{width:"100%" ,height:"100%"}} >
               </TextField> */}

            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="category"
                label="Department"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                style={{ width: '100%', height: '100%' }}
              >
                {alldata &&
                  alldata?.map((e) => {
                    return <MenuItem value={e._id}>{e.categoryName}</MenuItem>;
                  })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          style={{ width: '100%', height: '10%', marginTop: '3%' }}
          onClick={saveUser}
          disableElevation
        >
          Add Doctor
          {loader && <CircularProgress color="inherit" size={15} style={{ marginLeft: '10px' }} />}
        </Button>
      </Box>
    </>
  );
};

export default DoctorModal;
