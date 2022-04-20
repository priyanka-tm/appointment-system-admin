import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box } from '@mui/material';
import { ReactComponent as YourSvg } from "../components/attech/image/logo.svg";

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return (
    <RouterLink to="/">
      {/* <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} /> */}
      <Box sx={{ width: 50, height: 50, ...sx }}>
        <YourSvg />
        {/* <Image source={{ uri: ‘../Attech/logo.gif’ }} /> */}
        {/* <img src={logo} alt=“” /> */}
      </Box>
    </RouterLink>
  );
}
