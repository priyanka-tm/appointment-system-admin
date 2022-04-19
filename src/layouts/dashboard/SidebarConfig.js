// component
// import Iconify from '../../components/Iconify';
import { Icon } from '@iconify/react';
import patient24Filled from '@iconify/icons-fluent/patient-24-filled';
import userDoctor from '@iconify/icons-fa6-solid/user-doctor';
import appointmentIcon from '@iconify/icons-icon-park-outline/appointment';
import logoutIcon from '@iconify/icons-carbon/logout';
import categoryIcon from '@iconify/icons-bxs/category';
import filePrescription from '@iconify/icons-fa-solid/file-prescription';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'patient',
    path: '/dashboard/patient',
    icon: getIcon(patient24Filled)
  },
  {
    title: 'doctor',
    path: '/dashboard/doctor',
    icon: getIcon(userDoctor)
  },
  {
    title: 'department',
    path: '/dashboard/department',
    icon: getIcon(categoryIcon)
  },

  {
    title: 'appointment',
    path: '/dashboard/appointment',
    icon: getIcon(appointmentIcon)
  },
  {
    title: 'prescription',
    path: '/dashboard/prescription',
    icon: getIcon(filePrescription)
  }
];

export default sidebarConfig;
