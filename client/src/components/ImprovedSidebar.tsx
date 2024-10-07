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
  { text: 'Shop', icon: <ShopIcon />, path: '/admin/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/admin/locations' },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: '/admin/users' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/activities' },
];
const TGsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/tourguide' },
  { text: 'Shop', icon: <ShopIcon />, path: '/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/locations' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/advertiser/activities' },
];
const TGosidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/tourismgovernor' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/tourismgovernor/locations' },
];
const touristsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/tourist' },
  { text: 'Shop', icon: <ShopIcon />, path: '/tourist/shop' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/tourist/locations' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/tourist/activities' },
];
const advertisersidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/advertiser' },
  { text: 'Locations', icon: <LocationOnIcon />, path: '/advertiser/locations' },
  { text: 'Activity Management', icon: <ActivityIcon />, path: '/advertiser/activities' },
];
const sellersidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: '/seller' },
  { text: 'Shop', icon: <ShopIcon />, path: '/seller/shop' },
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

interface ImprovedSidebarProps {
  title: string;
  className?: string;
}

const getSidebarItems = (title : string) => {
  switch (true) {
      case title.includes("Seller"):
          return sellersidebaritems;
      case title.includes("Admin"):
          return adminsidebaritems;
      case title.includes("Tourist"):
          return touristsidebaritems;
      case title.includes("Tourism Governor"):
          return TGosidebaritems;
      case title.includes("Tour Guide"):
          return TGsidebaritems;
      default:
          return advertisersidebaritems;
  }
};

export default function ImprovedSidebar({ title = "", className = "" }: ImprovedSidebarProps) {
  const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

  const whichoptions = getSidebarItems(title);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }} className={className}>
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
          {whichoptions.map((item) => (
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