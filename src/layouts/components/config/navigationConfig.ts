import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from "@mui/icons-material/Settings";
import { SvgIconProps } from '@mui/material/SvgIcon'; // Import the SvgIconProps type

export interface Page {
    title: string;
    path: string;
    icon?: React.ElementType<SvgIconProps>;
  }
  
  export const pages: Page[] = [
    { title: 'Dashboard', path: '/' ,icon: DashboardIcon  },
    { title: 'Settings', path: '/settings',icon: SettingsIcon  },
  ];                                       