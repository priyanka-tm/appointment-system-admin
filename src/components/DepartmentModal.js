import React, { useState } from 'react';

import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Box,
  Grid,
  TextField,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { apiInstance } from 'src/httpClient/httpClient';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 610,
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4
};

export default function DepartmentModal({ handleClose, open, isEditData, getAllData, singleData }) {
  console.log('singleData: ', singleData);
  //   console.log('singleData name: ', singleData.categoryName);
  const [name, setName] = useState(singleData?.categoryName || '');
  const [post, setPost] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => setName(e.target.value);

  const handleCreateDepartment = async () => {
    const data = {
      categoryName: name
    };
    setLoader(true);
    if (isEditData) {
      try {
        const res = await apiInstance.put(`category/${singleData?._id}`, data);
        console.log('update res: ', res);
        setLoader(false);
        handleClose();
        getAllData();
      } catch (e) {
        setLoader(false);
        console.log('e: ', e.response);
      }
    } else {
      try {
        const res = await apiInstance.post('category', data);
        console.log('res: ', res);
        setLoader(false);
        handleClose();
        getAllData();
      } catch (e) {
        setLoader(false);
        console.log('e: ', e);
      }
    }
  };

  return (
    <Box sx={style}>
      <Grid container>
        <Grid item xs={9}>
          <h3>{isEditData ? 'Edit department' : 'Add department'}</h3>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* <Button color="secondary" onClick={closeModal} style={{borderRadius:2}}>X</Button> */}
          <CloseRoundedIcon onClick={handleClose} />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        {/* <Grid container item xs={6}>
          <TextField label={'Id'} onChange={(e)=>{setId(e.target.value)}}  id="name" type="text" style={{width:"100%" ,height:"100%"}} />
          </Grid> */}
        <Grid container item xs={12}>
          <TextField
            label={'Name'}
            onChange={handleChange}
            value={name}
            id="name"
            style={{ width: '100%', height: '100%' }}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        style={{ width: '100%', height: '25%', marginTop: '3%' }}
        onClick={handleCreateDepartment}
        disableElevation
      >
        Department
        {loader && <CircularProgress color="inherit" size={15} style={{ marginLeft: '10px' }} />}
      </Button>
    </Box>
  );
}
