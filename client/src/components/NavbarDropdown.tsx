import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: SvgIconComponent;
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
        top: 'calc(100% + 1px)',
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        zIndex: 1,
        width: '220px',
        transition: 'all 0.2s ease-in-out',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
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
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center', 
              borderBottom: '1px solid #e0e0e0', 
              '&:last-child': {
                borderBottom: 'none', 
              },
            }}
          >
            {item.icon && (
              <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                <item.icon />
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                color: item.label === 'Log out' ? 'red' : 'black',
                fontWeight: '650', 
                textAlign: 'center', 
                width: '100%',
                fontSize: '0.9rem',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NavbarDropdown;