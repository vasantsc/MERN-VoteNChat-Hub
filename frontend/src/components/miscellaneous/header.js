import { Avatar, Box, Button, Divider, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../context/chatProvider";
import ProfileModel from "./profileModel";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const {user} = ChatState();
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
      };
    
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Text fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm" cursor="pointer" name={user?.name} src={user?.pic} />
            </MenuButton>
            <MenuList>
                <ProfileModel user={user}>
            <MenuItem>My Profile</MenuItem>{" "}
            </ProfileModel>
            <Divider></Divider>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
          </Menu>
         
        </div>
      </Box>
    </>
  );
};

export default Header;
