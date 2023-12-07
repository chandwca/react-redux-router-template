import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { appName } from '../../config/appConfig';

const Topbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{appName}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
