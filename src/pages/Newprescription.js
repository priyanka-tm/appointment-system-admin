import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import UploadImg from './UploadMedia';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { apiInstance } from 'src/httpClient/httpClient';

const baseURL = 'https://jsonplaceholder.typicode.com/users';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 350,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  overflow: 'scroll'
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const Newprescription = ({ closeModal, openModal, getPresciption, singleData, isEdit }) => {
  console.log('singleData: ', singleData);

  const [note, setNote] = useState(singleData?.note || '');
  const [value, setValue] = React.useState(singleData?.date || new Date());
  const [docVal, setDocVal] = useState(singleData?.doctor?._id || '');
  const [patientVal, setPatientVal] = useState(singleData?.patient?._id || '');
  const [doctor, setDoctor] = useState([]);
  const [patient, setPatient] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllDoctor();
    getAllPatient();
  }, []);

  const getAllPatient = async () => {
    try {
      const res = await apiInstance.get('user/?role=patient');
      setPatient(res.data.data);
    } catch (error) {
      console.log('resss===', error.response);
    }
  };

  const getAllDoctor = async () => {
    try {
      const res = await apiInstance.get('user/?role=doctor');
      setDoctor(res.data.data);
    } catch (error) {
      console.log('resss===', error.response);
    }
  };

  const HandlePrescription = async () => {
    const presData = {
      doctor: docVal,
      patient: patientVal,
      note: note,

      date: value
    };
    console.log('presData: ', presData);
    if (isEdit) {
      try {
        const res = await apiInstance.put(`presciption/${singleData?._id}`, presData);
        console.log('update -----res: ', res);
        closeModal();

        getPresciption();
      } catch (error) {
        console.log('error: ', error);
      }
      // console.log({ doctor, patient, date, note, media });
    } else {
      try {
        const res = await apiInstance.post(`presciption`, presData);
        console.log('press -----res: ', res);
        closeModal();

        getPresciption();
      } catch (error) {
        console.log('error: ', error);
      }
      // console.log({ doctor, patient, date, note, media });
    }
  };

  const handleChangeDoc = (e) => {
    setDocVal(e.target.value);
  };
  const handleChangePatient = (e) => {
    setPatientVal(e.target.value);
  };
  return (
    <>
      <Box sx={style}>
        <Grid container>
          <Grid item xs={9}>
            <h3>{isEdit ? 'Edit' : 'Add Prescription'}</h3>
          </Grid>
          <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
            <CloseRoundedIcon onClick={closeModal} />
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ marginTop: 1 }}>
          <Grid item xs={6}>
            <Box
              sx={{
                maxWidth: '100'
              }}
            >
              <FormControl sx={{ minWidth: 340 }}>
                <InputLabel id="doctor">Select Doctor</InputLabel>
                <Select
                  labelId="doctor"
                  id="doctor"
                  value={docVal}
                  onChange={handleChangeDoc}
                  autoWidth
                  label="Doctor"
                >
                  <MenuItem>
                    <em>None</em>
                  </MenuItem>

                  {doctor?.map((e) => {
                    return (
                      <MenuItem value={e._id}>
                        {singleData?.doctor?._id === e._id ? e.name : e.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box
              sx={{
                maxWidth: '100'
              }}
            >
              <FormControl sx={{ minWidth: 340 }}>
                <InputLabel id="patient">Select Patient</InputLabel>
                <Select
                  labelId="patient"
                  id="demo-simple-select-autowidth"
                  value={patientVal}
                  onChange={handleChangePatient}
                  autoWidth
                  label="Patient"
                >
                  <MenuItem>
                    <em>None</em>
                  </MenuItem>

                  {patient.map((e) => {
                    return (
                      <MenuItem value={e._id}>
                        {singleData?.patient?._id === e._id ? e.name : e.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>

          <Grid container item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3} sx={{ width: '100%' }}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid container item xs={6}>
            <TextField
              label={'Enter prescription'}
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              id="prescription"
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          style={{ width: '100%', height: '13%', marginTop: '3%' }}
          onClick={HandlePrescription}
          disableElevation
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Box>
    </>
  );
};

export default Newprescription;
