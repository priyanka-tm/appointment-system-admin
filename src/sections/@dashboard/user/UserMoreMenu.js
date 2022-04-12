import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
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
// component
import Iconify from '../../../components/Iconify';
import DepartmentModal from 'src/components/DepartmentModal';
import { apiInstance } from './../../../httpClient/httpClient/index';
import PatientModel from 'src/components/PatientModel';
import { DashboardCustomizeRounded } from '@mui/icons-material';
import DoctorModal from 'src/components/DoctorModal';
import AppoimentModel from 'src/components/AppoimentModel'

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {
  console.log('props: ', props);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [newData, setNewData] = useState({});
  const [data,setData] = useState({})

  const handleOpen = (data) => {
    setNewData(data);
    setData(data);
    setTimeout(() => {}, 2000);
    setOpen(true);
    setIsOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (props.type == 'Department') {
      try {
        const res = await apiInstance.delete(`category/${props.data?._id}`);
        console.log('res: ', res);
        props.getAllData();
      } catch (e) {
        console.log('e: ', e.response);
      }

    } else if(props.type=="patient"){
      try {
        const res = await apiInstance.delete(`user/${props.data?._id}`);
        console.log('res: ', res);
        props.getAllpatient();
      } catch (e) {
        console.log('e: ', e.response);
      }
    }  else if (props.type == 'doctor') {
      try {
        const res = await apiInstance.delete(`user/${props.data?._id}`);
        console.log('res: ', res);
        props.getAllDoctor();
        setIsOpen(false);
      } catch (e) {
        console.log('e: ', e.response);
      }
    }else if (props.type == 'appoiment'){
      try{
        const res = await apiInstance.delete(`appointment/${props.data?._id}`);
        console.log('response:::::',res);
        props.getallAppoiment();
      }catch(error){
        console.log('error::::',error.response);
      }
    }
    }
    

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleDelete}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={() => handleOpen(props.data)}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        { props.type == 'patient' ? <PatientModel
        isPatientEdit
        handleClose={handleClose}
        getAllpatient={props.getAllpatient}
        patient={props.data}
        /> : props.type == 'Department' ?  <DepartmentModal
          isEditData
          handleClose={handleClose}
          singleData={newData}
          getAllData={props.getAllData}
        /> : props.type == 'Department' ? (
          <DepartmentModal
            isEditData
            handleClose={handleClose}
            singleData={newData}
            getAllData={props.getAllData}
          />
        ) : props.type == 'doctor' ? (
          <DoctorModal
            isDoctorEdit
            closeModal={handleClose}
            doctorSingleData={props.data}
            getAllDoctor={props.getAllDoctor}
          />
        ) : props.type == 'appoiment' ? (
          <AppoimentModel
          isAppoimentEdit
          closeModal={handleClose}
          AppoimentSingleData={props.data}
          getallAppoiment={props.getallAppoiment}
          />
        ) :null }
    
        {/* {props.type == 'patient' ? (
          <PatientModel />
        ) : props.type == 'Department' ? (
          <DepartmentModal
            isEditData
            handleClose={handleClose}
            singleData={newData}
            getAllData={props.getAllData}
          />
        ) : props.type == 'doctor' ? (
          <DoctorModal
            isDoctorEdit
            closeModal={handleClose}
            doctorSingleData={props.data}
            getAllDoctor={props.getAllDoctor}
          />
        ) : null} */}
      </Modal>
    </>
  );
}
