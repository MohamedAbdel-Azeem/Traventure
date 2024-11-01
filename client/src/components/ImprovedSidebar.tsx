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
import CategoryIcon from '@mui/icons-material/Category';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
const drawerWidth = 240;


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
  className?: string;
}


export default function ImprovedSidebar({ className = "" }: ImprovedSidebarProps) {
  
const location = useLocation();
const currentuser=location.pathname.split(`/`)[2];
const currentusertype=location.pathname.split(`/`)[1];

const adminsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/admin/${currentuser}` },
  { text: 'Shop', icon: <ShopIcon />, path: `/admin/${currentuser}/shop` },
  { text: 'Locations', icon: <LocationOnIcon />, path: `/admin/${currentuser}/locations` },
  { text: 'Account Management', icon: <AccountCircleIcon />, path: `/admin/${currentuser}/users` },
  { text: 'Cats & Tags', icon: <CategoryIcon />, path: `/admin/${currentuser}/categoriesandtags` },
  { text: 'Complaints', icon: <HowToVoteIcon />, path: `/admin/${currentuser}/complaints` }
];
const TGsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/tourguide/${currentuser}` },
  { text: 'Locations', icon: <LocationOnIcon />, path: `/tourguide/${currentuser}/locations` },
  { text: 'Itinerary Management', icon: <ActivityIcon />, path: `/tourguide/${currentuser}/itineraries` },
];
const TGosidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/tourismgovernor/${currentuser}` },
  { text: 'Locations', icon: <LocationOnIcon />, path: `/tourismgovernor/${currentuser}/locations` },
  { text: 'Historical Tags', icon: <ActivityIcon />, path: `/tourismgovernor/${currentuser}/historicaltags` },
];
const touristsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/tourist/${currentuser}` },
  { text: 'Shop', icon: <ShopIcon />, path: `/tourist/${currentuser}/shop` },
  { text: 'Locations', icon: <LocationOnIcon />, path: `/tourist/${currentuser}/locations` },
  { text: 'Complaints', icon: <HowToVoteIcon />, path: `/tourist/${currentuser}/complaints` }
];
const advertisersidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/advertiser/${currentuser}` },
  { text: 'Locations', icon: <LocationOnIcon />, path: `/advertiser/${currentuser}/locations` },
  { text: 'Activity Management', icon: <ActivityIcon />, path: `/advertiser/${currentuser}/activities` },
];
const sellersidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/seller/${currentuser}` },
  { text: 'Shop', icon: <ShopIcon />, path: `/seller/${currentuser}/shop` },
];

const guestsidebaritems =
[
  { text: 'Home', icon: <HomeIcon />, path: `/guest-page` },

  { text: 'Shop', icon: <ShopIcon />, path: `/guest/shop` },
];

const getSidebarItems = (currentusertype : string) => {
  switch (true) {
      case currentusertype.includes("seller"):
          return sellersidebaritems;
      case currentusertype.includes("admin"):
          return adminsidebaritems;
      case currentusertype.includes("tourist"):
          return touristsidebaritems;
      case currentusertype.includes("tourismgovernor"):
          return TGosidebaritems;
      case currentusertype.includes("tourguide"):
          return TGsidebaritems;
      case currentusertype.includes("guest"):
          return guestsidebaritems;
        
      default:
          return advertisersidebaritems;
  }
};


  const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

  const whichoptions = getSidebarItems(currentusertype);

  const handleDrawer = () => {
    setOpen(!open);
  };
  if(currentusertype==="seller"){
    return;
  }
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