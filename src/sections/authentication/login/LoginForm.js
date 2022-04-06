import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { apiInstance } from 'src/httpClient/httpClient';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from 'src/utils/common';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const login = async () => {
    const data = {
      email: email,
      password: password
    };
    console.log('data: ', data);

    try {
      const res = await apiInstance.post('auth/login', data);
      console.log('res: ', res);

      if (res.status === 200) {
        setUserSession(
          res.data.data.token,
          res.data.data.name,
          res.data.data.email,
          res.data.data.phone,
          res.data.data
        );
        navigate('dashboard/patient');
      }
    } catch (error) {
      setErrorMessage('Email or Password invalid!');

      console.log('error===', error.response);
    }
  };

  return (
    <>
      <div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}></Box>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { width: '45ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="email"
            label="Email Adreess"
            type="email"
            autoComplete="current-password"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <FormControl sx={{ mt: 2, width: '45ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
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
          {errorMessage && (
            <div color="red" className="error">
              {' '}
              {errorMessage}{' '}
            </div>
          )}
        </Box>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            style={{ width: '92%', height: '10%', marginTop: '3%' }}
            onClick={login}
          >
            Login
          </Button>
        </Stack>
      </div>
    </>
  );
}
