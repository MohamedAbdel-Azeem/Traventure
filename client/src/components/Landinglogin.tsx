import { forwardRef } from 'react';
import { IconChevronRight, IconLogout, IconUserCircle } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};

const UserButton = forwardRef((_a, ref) => {
    var { image, guest, icon } = _a, others = __rest(_a, ["image", "guest", "icon"]);
    return (
        <UnstyledButton ref={ref} style={{
            padding: 'var(--mantine-spacing-md)',
            color: 'var(--mantine-color-text)',
            borderRadius: 'var(--mantine-radius-sm)',
        }} {...others}>
            <Group>
                <Avatar src={image} radius="xl" />
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {guest}
                    </Text>
                   
                </div>
                {icon || <IconChevronRight size="1rem" />}
            </Group>
        </UnstyledButton>
    );
});

function Landinglogin({ setContent, content, guest}) {
    return (
        <Menu withArrow>
            <Menu.Target>
                <UserButton guest={guest} />
            </Menu.Target>
            <Menu.Dropdown style={{ zIndex: 999 }}>
                <Menu.Label>Account</Menu.Label>
                <Menu.Item leftSection={<IconUserCircle />} onClick={() => { window.location.href = "http://localhost:5173"; }}>
                    Login
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label> New User </Menu.Label>
                <Menu.Item leftSection={<IconLogout />} onClick={() => { window.location.href = "http://localhost:5173/register"; }}>
                    Register
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}

export default Landinglogin;
