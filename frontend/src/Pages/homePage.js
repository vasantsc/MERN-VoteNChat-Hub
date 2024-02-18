import { Container, Box, Text, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
import React ,{useEffect} from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo) navigate("/chats")
    },[navigate])
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text textAlign="center" fontSize="4xl" fontFamily="Work sans">
          VoteNChat-Hub
        </Text>
      </Box>
      <Box bg="white" width="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded" mb="1em">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
