import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItem, Button } from '@mui/material';
import { makeStyles,Theme } from 'mui-styles';
import { pages } from '../../config/navigationConfig';




const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '200px',
    backgroundColor: 'white',
    padding: theme.spacing(2),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '100%',
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: theme.palette.text.primary,
  },
  activeButton: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyles();

  const activePath: string = '/' 

  return (
    <List component="nav" className={classes.root}>
      {pages.map((page) => (
        <ListItem key={page.title} disableGutters>
          <Button
            component={RouterLink}
            to={page.path}
            className={`${classes.button} ${page.path === activePath ? classes.activeButton : ''}`}
            color="inherit"
          >
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
