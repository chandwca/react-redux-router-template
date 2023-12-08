import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Users from "../../features/users/Users";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Dashboard
          </Typography>
          <Users/>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
