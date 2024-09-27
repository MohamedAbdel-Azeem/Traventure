import React, { useState } from "react";
import styled from "styled-components";

// Define types for the submenu item
type SubMenuItem = {
  title: string;
  icon: React.ReactNode;
  iconOpened: React.ReactNode;
  iconClosed: React.ReactNode;
  subNav?: SubMenuItem[];
};

type SubMenuProps = {
  item: SubMenuItem;
  sideBarFunction: (item: SubMenuItem) => void;
};

const SidebarLink = styled.div`
  display: flex;
  margin: 10px;
  color: #000000;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    border-left: 4px solid blue;
    cursor: pointer;
    border-radius: 0 10px 10px 0;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled.div`
  background: #fffffc;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #323232;
  font-size: 16px;
  transition: 150ms;

  &:hover {
    color: grey;
    font-size: 20px;
    cursor: pointer;
  }
`;

const SubMenu: React.FC<SubMenuProps> = ({ item, sideBarFunction }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        onClick={() => {
          if (item.subNav) showSubnav();
          else sideBarFunction(item);
        }}
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav?.map((subItem, index) => {
          return (
            <DropdownLink
              key={index}
              onClick={() => {
                sideBarFunction(subItem);
              }}
            >
              {subItem.icon}
              <SidebarLabel>{subItem.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
