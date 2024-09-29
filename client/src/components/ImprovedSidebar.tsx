import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { Box, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ActivityIcon from '@mui/icons-material/LocalActivity';

const drawerWidth = 240;

const adminsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/admin' },
  { text: 'Shop', icon: <ShopIcon />, path: '/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: '/admin/users' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/activities' },
];
const TGsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/admin' },
  { text: 'Shop', icon: <ShopIcon />, path: '/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: '/admin/users' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/activities' },
];
const TGosidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/admin' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
];
const touristsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/admin' },
  { text: 'Shop', icon: <ShopIcon />, path: '/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: '/admin/users' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/activities' },
];
const advertisersidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/admin' },
  { text: 'Shop', icon: <ShopIcon />, path: '/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: '/admin/users' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/activities' },
];
const sellersidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/admin' },
  { text: 'Shop', icon: <ShopIcon />, path: '/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: '/admin/users' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/activities' },
];





const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function ImprovedSidebar() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader className="h-[74px]">
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            sx={{
              transition: 'transform 0.3s ease-in-out',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {TGosidebaritems.map((item) => (
            <ListItem key={item.text} disablePadding className="block"
              sx={{
                backgroundColor: location.pathname === item.path ? 'grey.300' : 'inherit',
              }}>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}