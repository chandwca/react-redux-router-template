import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { appName } from '../../config/appConfig';

const Footer: React.FC = () => {
  return (
    <Paper square elevation={3} style={{ padding: '10px', marginTop: 'auto', position: 'sticky', height: '10px' }}>
      <Typography variant="body2" align="center" color="textSecondary">
        © {new Date().getFullYear()} {appName} All rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;
