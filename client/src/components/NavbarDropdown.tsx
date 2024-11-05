import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material'; // Import type for Material UI icons

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: SvgIconComponent; // Change icon type to SvgIconComponent
}

interface NavbarDropdownProps {
  items: DropdownItem[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ items, onMouseEnter, onMouseLeave }) => {
  return (
    <Box
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        zIndex: 1,
        width: '220px',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <List disablePadding>
        {items.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={item.onClick}
            sx={{
              '&:hover': {
                backgroundColor: '#e8eaf6',
                transform: 'translateY(-2px)',
              },
              py: 1.5,
              px: 2,
              transition: 'background-color 0.2s, transform 0.2s',
            }}
          >
            {/* Render the Material UI icon if it exists */}
            {item.icon && (
              <ListItemIcon>
                <item.icon /> {/* Render the icon component directly */}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                color: item.label === 'Log Out' ? 'red' : 'black', 
                fontWeight: '500',
                textAlign: 'center',
                width: '100%',
                fontSize: '0.9rem',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavbarDropdown;
