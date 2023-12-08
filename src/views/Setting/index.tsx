import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Counter } from '../../features/counter/Counter';

const Setting: React.FC = () => {
  return (
    <div>
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
         Settings 
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Counter: 
        </Typography>
        <Counter/>
      </CardContent>
    </Card>
  </div>
  );
};

export default Setting;





