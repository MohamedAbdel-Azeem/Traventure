import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Box, CssBaseline, Fade, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShopIcon from '@mui/icons-material/Shop';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ActivityIcon from '@mui/icons-material/LocalActivity';
import CategoryIcon from '@mui/icons-material/Category';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import DescriptionIcon from '@mui/icons-material/Description';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import StadiumIcon from '@mui/icons-material/Stadium';
import ProfilePictureEdit from './ProfilePictureEdit';
import NavbarDropdown from './NavbarDropdown';
import { Logout } from '@mui/icons-material';
import ChangePasswordModal, { AddContactLeadFormType } from './ChangePasswordModal';
import Swal from "sweetalert2";
import { editpassword } from "../custom_hooks/changepassowrd";
import { GetCurrentUser } from "../custom_hooks/currentuser";




const drawerHeight = 64;

interface NewNavbarProps {
  className?: string;
}

export default function NewNavbar({ className = '' }: NewNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentuser = location.pathname.split(`/`)[2];
  const currentusertype = location.pathname.split(`/`)[1];

  const { cuserdata, userloading, usererror } = GetCurrentUser(currentuser);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const hideTimeoutRef = useRef<number | null>(null);

  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
    console.log("Password change data:", data);
    const { oldPassword, newPassword } = data;
    editpassword(currentuser, oldPassword, newPassword)
        .then(() => {
            setPasswordModalOpen(false);

          
              Swal.fire({
                title: "Password Changed Successfully",
                text: "Password has been changed",
                icon: "success",
              });
            
        })
        .catch((error) => {
          const errorMessage = error.message || "Failed to change password.";
          Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
          });
            
        });
};


  const adminnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/admin/${currentuser}` },
    { text: 'Shop', icon: <ShopIcon />, path: `/admin/${currentuser}/shop` },
    // { text: 'Locations', icon: <LocationOnIcon />, path: `/admin/${currentuser}/locations` },
    { text: 'Account Management', icon: <AccountCircleIcon />, path: `/admin/${currentuser}/users` },
    { text: 'Cats & Tags', icon: <CategoryIcon />, path: `/admin/${currentuser}/categoriesandtags` },
    { text: 'Applications', icon: <DescriptionIcon />, path: `/admin/${currentuser}/applications` },

  ];

  const TGnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/tourguide/${currentuser}` },
    // { text: 'Locations', icon: <LocationOnIcon />, path: `/tourguide/${currentuser}/locations` },
    { text: 'Itinerary Management', icon: <ActivityIcon />, path: `/tourguide/${currentuser}/itineraries` },
  ];

  const TGonavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/tourismgovernor/${currentuser}` },
    // { text: 'Locations', icon: <LocationOnIcon />, path: `/tourismgovernor/${currentuser}/locations` },
    { text: 'Historical Tags', icon: <ActivityIcon />, path: `/tourismgovernor/${currentuser}/historicaltags` },
  ];

  const touristnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/tourist/${currentuser}` },
    { text: 'Shop', icon: <ShopIcon />, path: `/tourist/${currentuser}/shop` },
    { text: 'Bookings', icon: <EditCalendarIcon />, path: `/tourist/${currentuser}/bookings` },
    { text: 'Itineraries', icon: <FlightTakeoffIcon />, path: `/tourist/${currentuser}/itineraries` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/tourist/${currentuser}/locations` },
    { text: 'Activities', icon: <StadiumIcon />, path: `/tourist/${currentuser}/activities` },



  ];

  const advertisernavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/advertiser/${currentuser}` },
    // { text: 'Locations', icon: <LocationOnIcon />, path: `/advertiser/${currentuser}/locations` },
    { text: 'Activity Management', icon: <ActivityIcon />, path: `/advertiser/${currentuser}/activities` },
    { text: 'Itineraries', icon: <FlightTakeoffIcon />, path: `/advertiser/${currentuser}/itineraries` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/advertiser/${currentuser}/locations` },
  ];

  const sellernavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/seller/${currentuser}` },
    { text: 'Shop', icon: <ShopIcon />, path: `/seller/${currentuser}/shop` },
  ];

  const guestnavbaritems = [
    { text: 'Home', icon: <HomeIcon />, path: `/guest-page` },
    { text: 'Shop', icon: <ShopIcon />, path: `/guest/shop` },

    { text: 'Itineraries', icon: <FlightTakeoffIcon />, path: `/guest/more-itineraries` },
    { text: 'Locations', icon: <LocationOnIcon />, path: `/guest/more-places` },
    { text: 'Activities', icon: <StadiumIcon />, path: `/guest/more-activities` },
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

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const profileDropdownItems = [
    ...(!currentusertype.includes('tourismgovernor') && !currentusertype.includes('admin') && !currentusertype.includes('guest')
      ? [{ 
          label: 'My Profile', 
          onClick: () => navigate(`/${currentusertype}/${currentuser}/profile`), 
          icon: AccountCircleIcon 
        }]
      : []),
      ...(currentusertype === 'admin' || currentusertype === 'tourismgovernor'
        ? [{ 
            label: 'Change Password', 
            onClick: () => setPasswordModalOpen(true),
            icon: EditCalendarIcon 
          }]
        : []),
    ...(currentusertype.includes('tourist') || currentusertype.includes('admin')
      ? [{ 
          label: 'Complaints', 
          onClick: () => navigate(`/${currentusertype}/${currentuser}/complaints`),
          icon: HowToVoteIcon 
        }]
      : []),
    { 
      label: 'Log out', 
      onClick: () => navigate('/'), 
      icon: Logout 
    },
  ];

  interface Currentuserdata {
    profilepic: string;
  }
  
  const [userdata, setUserdata] = useState<Currentuserdata|null>(null);

  useEffect(() => {
    console.log("SECOND TIME"+cuserdata);
    setUserdata(cuserdata);
  }, [cuserdata]);
  
  const currentPath = location.pathname;

  return (
    <Box sx={{ display: 'flex' }} className={className}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          height: drawerHeight,
          background: 'linear-gradient(90deg, #a855f7, #6d28d9)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img
            src="/src/assets/logowhite.png"
            alt="Navbar Logo"
            style={{ height: '100%', width: 'auto', maxHeight: '35%', maxWidth: '30%' }}
          />
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <List sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {whichoptions.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{
                    borderRadius: 1,
                    mx: 0.5,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateX(-5px)',
                      '& .MuiListItemText-root': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    },
                  }}
                >
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{ color: currentPath === item.path ? '#FFD700' : 'white', display: 'flex', alignItems: 'center',
                       
                     }} 
                  >
                    <ListItemIcon sx={{ color: currentPath === item.path ? '#FFD700' : 'white', minWidth: '40px' }}>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        marginLeft: '-10px',
                        opacity: 0,
                        transform: 'translateX(-10px)',
                        transition: 'opacity 0.3s, transform 0.3s',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{ position: 'relative' }}
          >
            {userdata?.profilepic ? (
            <img
              src={userdata.profilepic}
              alt="Profile Picture"
              className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-purple-500 cursor-pointer"
            />
          ) : (
            <img
              src="/src/assets/defaultavatar.png"
              alt="Default Avatar"
              className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-purple-500 cursor-pointer"
            />
          )}
            <Fade in={dropdownVisible} timeout={200}>
              <div>
                <NavbarDropdown
                  items={profileDropdownItems}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </Fade>
          </Box>
        </Toolbar>
      </AppBar>
      {isPasswordModalOpen && (
        <ChangePasswordModal
          username={currentuser}
          onClose={() => setPasswordModalOpen(false)}
          onFormSubmit={handlePasswordChangeSubmit}
        />
      )}
       <Box sx={{ marginTop: `${drawerHeight}px` }}></Box>
    </Box>
  );
}
