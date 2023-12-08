import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import Users from '../../features/users/Users';
import   Users  from '../../features/users/Users'

const Setting: React.FC = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Settings
          </Typography>
          <Users/>
        </CardContent>
      </Card>
    </div>
  );
};

export default Setting;
