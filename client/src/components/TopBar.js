import React from 'react'
import { Center, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

export default function TopBar({handleSignOut}) {
  return (
    <div>
        <div style={{margin: '10px', display: 'flex', justifyContent: 'center'}}>
        <img src='/capstone.png' alt='logo' width='100' height='100'/> 
        </div>
        <div style={{ position: 'absolute', top: 25, right: 10}}>
            <Menu>
                <MenuButton
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                />
                <MenuList>
                <MenuItem >
                    <Link to="/features"> Featured Friends </Link>
                </MenuItem>
                <MenuItem >
                    <Link to="/myprofile"> My Profile </Link>
                </MenuItem>
                <MenuItem >
                    <Link to="/messages"> My Messages </Link>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                    Logout
                </MenuItem>
                </MenuList>
            </Menu>
        </div>
    </div>
  )
}
