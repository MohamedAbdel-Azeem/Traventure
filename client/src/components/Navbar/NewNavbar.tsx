import React, { useState, useEffect ,useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from 'moment';

import {
  AppBar,
  Box,
  CssBaseline,
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShopIcon from "@mui/icons-material/Shop";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ActivityIcon from "@mui/icons-material/LocalActivity";
import CategoryIcon from "@mui/icons-material/Category";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import DescriptionIcon from "@mui/icons-material/Description";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import StadiumIcon from "@mui/icons-material/Stadium";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import NavbarDropdown from "./NavbarDropdown";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Logout } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChangePasswordModal, {
  AddContactLeadFormType,
} from "../ChangePasswordModal";
import Swal from "sweetalert2";
import { editpassword } from "../../custom_hooks/changepassowrd";
import { GetCurrentUser } from "../../custom_hooks/currentuser";
import HotelIcon from "@mui/icons-material/Hotel";
import FlightIcon from "@mui/icons-material/Flight";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { set } from "date-fns";
import { patchMarkAllAsRead } from "../../custom_hooks/notifications/markAllAsRead";
import { patchMarkAsRead } from "../../custom_hooks/notifications/markAsRead";

const drawerHeight = 64;

interface NewNavbarProps {
  className?: string;
}

export default function NewNavbar({ className = "" }: NewNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentuser = location.pathname.split(`/`)[2];
  const currentusertype = location.pathname.split(`/`)[1];

  const { cuserdata } = GetCurrentUser(currentuser);
  const [dropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);
  console.log(cuserdata?.notifications);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [notificationPopUpVisible, setNotificationPopUpVisible] = useState(false);
  const [showAllPopup, setShowAllPopup] = useState(false);  

  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    if (cuserdata) {
      const unreadNotifications = cuserdata.notifications.filter(notification => !notification.read);
      setUnreadNotifications(unreadNotifications)
      setUnreadCount(unreadNotifications.length);
      setNotifications(cuserdata.notifications);
      console.log("userrrrrrrIddddd",cuserdata._id);
      console.log("userrrrrrrType",currentusertype);
    }
  }, [cuserdata]);
  

  const OpenShowAllPopUp = () => {
    setShowAllPopup(true);
  }

  const markAllAsRead = async () => {
    try {
      // Update local state to reflect the changes
      if (cuserdata) {
        cuserdata.notifications.forEach((notification) => {
          notification.read = true;
        });
        setUnreadCount(0);
      }

      await patchMarkAllAsRead({
        username: currentuser,
        userType: currentusertype,
      });
      
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handlePasswordChangeSubmit = (data: AddContactLeadFormType) => {
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
    { text: "Home", icon: <HomeIcon />, path: `/admin/${currentuser}` },
    { text: "Shop", icon: <ShopIcon />, path: `/admin/${currentuser}/shop` },
    {
      text: "Sales",
      icon: <ShowChartIcon />,
      path: `/admin/${currentuser}/sales`,
    },
    // { text: 'Locations', icon: <LocationOnIcon />, path: `/admin/${currentuser}/locations` },
    {
      text: "Account Management",
      icon: <AccountCircleIcon />,
      path: `/admin/${currentuser}/users`,
    },
    {
      text: "Cats & Tags",
      icon: <CategoryIcon />,
      path: `/admin/${currentuser}/categoriesandtags`,
    },
    {
      text: "Applications",
      icon: <DescriptionIcon />,
      path: `/admin/${currentuser}/applications`,
    },
  ];

  const TGnavbaritems = [
    { text: "Home", icon: <HomeIcon />, path: `/tourguide/${currentuser}` },
    {
      text: "Locations",
      icon: <LocationOnIcon />,
      path: `/tourguide/${currentuser}/locations`,
    },
    {
      text: "Itinerary Management",
      icon: <ActivityIcon />,
      path: `/tourguide/${currentuser}/itineraries`,
    },
    {
      text: "Sales",
      icon: <ShowChartIcon />,
      path: `/tourguide/${currentuser}/statistics`,
    },
  ];

  const TGonavbaritems = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: `/tourismgovernor/${currentuser}`,
    },
    {
      text: "Locations",
      icon: <LocationOnIcon />,
      path: `/tourismgovernor/${currentuser}/locations`,
    },
    {
      text: "Historical Tags",
      icon: <ActivityIcon />,
      path: `/tourismgovernor/${currentuser}/historicaltags`,
    },
  ];
 

  const touristnavbaritems = [
    { text: "Home", icon: <HomeIcon />, path: `/tourist/${currentuser}` },
    { text: "Shop", icon: <ShopIcon />, path: `/tourist/${currentuser}/shop` },
    {
      text: "Bookings",
      icon: <EditCalendarIcon />,
      path: `/tourist/${currentuser}/bookings`,
    },
    {
      text: "Itineraries",
      icon: <FlightTakeoffIcon />,
      path: `/tourist/${currentuser}/itineraries`,
    },
    {
      text: "Locations",
      icon: <LocationOnIcon />,
      path: `/tourist/${currentuser}/locations`,
    },
    {
      text: "Activities",
      icon: <StadiumIcon />,
      path: `/tourist/${currentuser}/activities`,
    },
    {
      text: "Hotels",
      icon: <HotelIcon />,
      path: `/tourist/${currentuser}/hotels`,
    },
    {
      text: "Flights",
      icon: <FlightIcon />,
      path: `/tourist/${currentuser}/flights`,
    },
  ];

  const advertisernavbaritems = [
    { text: "Home", icon: <HomeIcon />, path: `/advertiser/${currentuser}` },
    {
      text: "Locations",
      icon: <LocationOnIcon />,
      path: `/advertiser/${currentuser}/locations`,
    },
    {
      text: "Activity Management",
      icon: <ActivityIcon />,
      path: `/advertiser/${currentuser}/activities`,
    },
    {
      text: "Itineraries",
      icon: <FlightTakeoffIcon />,
      path: `/advertiser/${currentuser}/itineraries`,
    },
    {
      text: "Locations",
      icon: <LocationOnIcon />,
      path: `/advertiser/${currentuser}/locations`,
    },
    {
      text: "Sales",
      icon: <ShowChartIcon />,
      path: `/advertiser/${currentuser}/stats`,
    },
  ];

  const sellernavbaritems = [
    { text: "Home", icon: <HomeIcon />, path: `/seller/${currentuser}` },
    {
      text: "Sales",
      icon: <ShowChartIcon />,
      path: `/seller/${currentuser}/sales`,
    },
  ];

  const guestnavbaritems = [
    { text: "Home", icon: <HomeIcon />, path: `/guest/guest-page` },
    { text: "Shop", icon: <ShopIcon />, path: `/guest/shop` },
    {
      text: "Itineraries",
      icon: <FlightTakeoffIcon />,
      path: `/guest/more-itineraries`,
    },
    { text: "Locations", icon: <LocationOnIcon />, path: `/guest/more-places` },
    {
      text: "Activities",
      icon: <StadiumIcon />,
      path: `/guest/more-activities`,
    },
  ];

  const getNavbarItems = (currentusertype: string) => {
    switch (true) {
      case currentusertype.includes("seller"):
        return sellernavbaritems;
      case currentusertype.includes("admin"):
        return adminnavbaritems;
      case currentusertype.includes("tourist"):
        return touristnavbaritems;
      case currentusertype.includes("tourismgovernor"):
        return TGonavbaritems;
      case currentusertype.includes("tourguide"):
        return TGnavbaritems;
      case currentusertype.includes("guest"):
        return guestnavbaritems;
      default:
        return advertisernavbaritems;
    }
  };

  const whichoptions = getNavbarItems(currentusertype);

  const handleMouseEnterProfilePic = () => {
    setProfileDropdownVisible(true);
  };

  const handleMouseLeaveProfilePic = () => {
    setProfileDropdownVisible(false);
  };
  const handleMouseEnterNotifications = () => {
    setNotificationPopUpVisible(true);
  }
  const handleMouseLeaveNotifications = () => {
    setNotificationPopUpVisible(false);
    setShowAllPopup(false);
  }
  const handleNotificationClick = async (notification:any) => {
    notification.read = true;
    unreadNotifications.splice(unreadNotifications.indexOf(notification), 1);
    setUnreadCount(unreadCount - 1);
    try{
      await patchMarkAsRead({
        username: currentuser,
        userType: currentusertype,
        notificationId: notification._id,
      });
    }catch(error){
      console.error('Error marking notification as read:', error);
    }
    // markAsRead(notification);
    // navigate(`/notifications/${notification.id}`);
  };

  const NotificationItem = ({ notification}) => (

    <li className={`${
      notification.read
        ? 'text-gray-500' 
        : 'text-white' 
    } bg-white text-[#6d28d9] rounded   hover:bg-gray-100`}
    onClick={() => {
      handleNotificationClick(notification)
    }}
  >
      <p className="px-2 ">{notification.message}</p>
      <p className="text-right text-xs text-gray-400 ">
        {moment(notification.createdAt).fromNow()} 
      </p>
    </li>
  );

  const profileDropdownItems = [
    ...(!currentusertype.includes("tourismgovernor") &&
    !currentusertype.includes("admin") &&
    !currentusertype.includes("guest")
      ? [
          {
            label: "My Profile",
            onClick: () =>
              navigate(`/${currentusertype}/${currentuser}/profile`),
            icon: AccountCircleIcon,
          },
        ]
      : []),
    ...(currentusertype === "admin" || currentusertype === "tourismgovernor"
      ? [
          {
            label: "Change Password",
            onClick: () => setPasswordModalOpen(true),
            icon: EditCalendarIcon,
          },
        ]
      : []),
    ...(currentusertype.includes("tourist")
      ? [
          {
            label: "Wishlist",
            onClick: () =>
              navigate(`/${currentusertype}/${currentuser}/wishlist`),
            icon: FavoriteIcon,
          },
          {
            label: "Purchases",
            onClick: () =>
              navigate(`/${currentusertype}/${currentuser}/purchases`),
            icon: ShoppingBasketIcon,
          },
          {
            label: "Bookmarks",
            onClick: () =>
              navigate(`/${currentusertype}/${currentuser}/bookmarks`),
            icon: BookmarksIcon,
          },
        ]
      : []),

    ...(currentusertype.includes("tourist") || currentusertype.includes("admin")
      ? [
          {
            label: "Complaints",
            onClick: () =>
              navigate(`/${currentusertype}/${currentuser}/complaints`),
            icon: HowToVoteIcon,
          },
        ]
      : []),
    ...(currentusertype.includes("guest")
      ? [
          {
            label: "Sign Up",
            onClick: () => navigate("/register"),
            icon: AccountCircleIcon,
          },
          {
            label: "Login",
            onClick: () => navigate("/"),
            icon: LoginIcon,
          },
        ]
      : []),
    ...(!currentusertype.includes("guest")
      ? [
          {
            label: "Log out",
            onClick: () => navigate("/"),
            icon: Logout,
          },
        ]
      : []),
  ];

  interface Currentuserdata {
    profilepic: string;
  }

  const [userdata, setUserdata] = useState<Currentuserdata | null>(null);

  useEffect(() => {
    setUserdata(cuserdata);
  }, [cuserdata]);

  const currentPath = location.pathname;

  return (
    <Box sx={{ display: "flex" }} className={className}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          height: drawerHeight,
          background: "linear-gradient(90deg, #a855f7, #6d28d9)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="/src/assets/logowhite.png"
            alt="Navbar Logo"
            style={{
              height: "100%",
              width: "auto",
              maxHeight: "35%",
              maxWidth: "30%",
            }}
          />
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <List
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {whichoptions.map((item) => (
                <ListItem
                  key={item.text}
                  disablePadding
                  sx={{
                    borderRadius: 1,
                    mx: 0.5,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateX(-5px)",
                      "& .MuiListItemText-root": {
                        opacity: 1,
                        transform: "translateX(0)",
                      },
                    },
                  }}
                >
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: currentPath === item.path ? "#FFD700" : "white",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: currentPath === item.path ? "#FFD700" : "white",
                        minWidth: "40px",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        marginLeft: "-10px",
                        opacity: 0,
                        transform: "translateX(-10px)",
                        transition: "opacity 0.3s, transform 0.3s",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            sx={{ position: "relative", marginRight: "20px" }}
            className="relative flex justify-center items-center cursor-pointer text-[30px] text-gray-400"
            onMouseEnter={handleMouseEnterNotifications}
            onMouseLeave={handleMouseLeaveNotifications}
            onClick={togglePopup}
          >

        <NotificationsNoneIcon className="text-white" fontSize="large" />

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center translate-y-[-1px]">
            {unreadCount}
          </span>
        )}

<style jsx>{`
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }

    .custom-scrollbar::-webkit-scrollbar-track {
      background: #a855f7;
    }

    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #00FFA3;

      border-radius: 10px;
      border: 2px solid #ff00000;
    }

    .custom-scrollbar::-webkit-scrollbar-button {
      display: none;
    }

    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: white #6d28d9;
    }
  `}</style>
      <Fade in={notificationPopUpVisible} timeout={200}>
              
              

        <div  className="absolute top-16 right-0 w-64 bg-gradient-to-r from-[#a855f7] to-[#6d28d9] shadow-lg rounded-lg p-4 z-10 text-white">
{!showAllPopup ? (
  <div>          
          <h3 className="text-sm font-semibold mb-2 text-center text-white">Notifications</h3>

          

{unreadCount > 0 ? (
               <ul className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
               {unreadNotifications.map((notification) => (
                 <NotificationItem  notification={notification}/>
                ))}
             </ul>
            ) : (
              <p className="text-sm text-gray-500">No new notifications</p>
            )}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={markAllAsRead}
              className="text-white text-sm font-semibold hover:underline"
            >
              Mark all as read
            </button>
            {/* text-[#a855f7]*/}
            <button className="text-white text-sm font-semibold hover:underline"
              onClick={() => {
                OpenShowAllPopUp();
              }}
            >
              Show all
            </button>
          </div>
        </div>
          ):(
            // Show all notifications
            <div>
              <h3 className="text-sm font-semibold mb-2 text-center text-white">All Notifications</h3>
              <ul className="space-y-2 max-h-[50vh] overflow-y-auto custom-scrollbar">
                {notifications.map((notification) => (
                  <NotificationItem notification={notification} />
                ))}
              </ul>

              </div>
          )}

      
              </div>
            </Fade>
          </Box>
          <Box
            onMouseEnter={handleMouseEnterProfilePic}
            onMouseLeave={handleMouseLeaveProfilePic}
            sx={{ position: "relative" }}
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
                  onMouseEnter={handleMouseEnterProfilePic}
                  onMouseLeave={handleMouseLeaveProfilePic}
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
