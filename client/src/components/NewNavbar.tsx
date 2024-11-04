import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, CssBaseline, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ActivityIcon from '@mui/icons-material/LocalActivity';
import CategoryIcon from '@mui/icons-material/Category';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import MenuIcon from '@mui/icons-material/Menu';
import ProfilePictureEdit from './ProfilePictureEdit';

const drawerHeight = 64;

interface NewNavbarProps {
  className?: string;
}

export default function NewNavbar({ className = '' }: NewNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentuser = location.pathname.split(`/`)[2];
  const currentusertype = location.pathname.split(`/`)[1];

  const adminnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/admin/${currentuser}` },
    { text: 'Shop', icon: <ShopIcon />, path: `/admin/${currentuser}/shop` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/admin/${currentuser}/locations` },
    { text: 'Account Management', icon: <AccountCircleIcon />, path: `/admin/${currentuser}/users` },
    { text: 'Cats & Tags', icon: <CategoryIcon />, path: `/admin/${currentuser}/categoriesandtags` },
    { text: 'Complaints', icon: <HowToVoteIcon />, path: `/admin/${currentuser}/complaints` },
  ];
  const TGnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/tourguide/${currentuser}` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/tourguide/${currentuser}/locations` },
    { text: 'Itinerary Management', icon: <ActivityIcon />, path: `/tourguide/${currentuser}/itineraries` },
  ];
  const TGonavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/tourismgovernor/${currentuser}` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/tourismgovernor/${currentuser}/locations` },
    { text: 'Historical Tags', icon: <ActivityIcon />, path: `/tourismgovernor/${currentuser}/historicaltags` },
  ];
  const touristnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/tourist/${currentuser}` },
    { text: 'Shop', icon: <ShopIcon />, path: `/tourist/${currentuser}/shop` },
    // { text: 'Locations', icon: <LocationOnIcon />, path: `/tourist/${currentuser}/locations` },
    { text: 'Bookings', icon: <EditCalendarIcon />, path: `/tourist/${currentuser}/bookings` },
    { text: 'Complaints', icon: <HowToVoteIcon />, path: `/tourist/${currentuser}/complaints` },
  ];
  const advertisernavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/advertiser/${currentuser}` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/advertiser/${currentuser}/locations` },
    { text: 'Activity Management', icon: <ActivityIcon />, path: `/advertiser/${currentuser}/activities` },
  ];
  const sellernavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/seller/${currentuser}` },
    { text: 'Shop', icon: <ShopIcon />, path: `/seller/${currentuser}/shop` },
  ];
  const guestnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/guest-page` },
    { text: 'Shop', icon: <ShopIcon />, path: `/guest/shop` },
  ];

  const getNavbarItems = (currentusertype: string) => {
    switch (true) {
      case currentusertype.includes('seller'):
        return sellernavbaritems;
      case currentusertype.includes('admin'):
        return adminnavbaritems;
      case currentusertype.includes('tourist'):
        return touristnavbaritems;
      case currentusertype.includes('tourismgovernor'):
        return TGonavbaritems;
      case currentusertype.includes('tourguide'):
        return TGnavbaritems;
      case currentusertype.includes('guest'):
        return guestnavbaritems;
      default:
        return advertisernavbaritems;
    }
  };

  const whichoptions = getNavbarItems(currentusertype);

  return (
    <Box sx={{ display: 'flex' }} className={className}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: '100%', height: drawerHeight, backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          <List sx={{ display: 'flex', flexDirection: 'row' }}>
            {whichoptions.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.2)' : 'inherit',
                  borderRadius: 1,
                  mx: 1,
                }}
              >
                <ListItemButton onClick={() => navigate(item.path)} sx={{ color: 'white' }}>
                  <ListItemIcon sx={{ color: 'white', minWidth: '50px' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} sx={{ marginLeft: '-15px' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <ProfilePictureEdit profilePicture={null} onChange={function (newPicture: File | null): void {
                      throw new Error('Function not implemented.');
                  } } isEditing={false}></ProfilePictureEdit>
        </Toolbar>
      </AppBar>
    </Box>
  );
}