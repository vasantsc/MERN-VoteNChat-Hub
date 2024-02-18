import React from "react";
import {
  Box,
  Flex,
  ChakraProvider,
  extendTheme,
  CSSReset,
  VStack,
  Heading,
} from "@chakra-ui/react";
import BarChart from "../components/charts/barchart";
import ChatSection from "../components/chatsection";

const SinglePollChat = () => {
  return (
    <Flex width="100%" h="91.5vh" direction="row">
      {/* Fixed Bar Chart Section */}
      <Flex flex={1} gap={"30px"} direction="column" height={"fit-content"} m={4}>
      <Box bg="#fff" width="100%">
            <Heading size="lg">Check chart</Heading>
        </Box>
        <Box bg="#fff"  width="100%">
        <h2>Bar Chart Example</h2>
        <BarChart />
        </Box>
        
      </Flex>

      {/* Chat Section with Scrolling */}
      <Box flex={2} bg="#fff" h="100%" p={4} m={4}>
        <ChatSection />
      </Box>
    </Flex>
  );
};

export default SinglePollChat;
