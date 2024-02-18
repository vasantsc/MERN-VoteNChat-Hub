import React from 'react'
import { ChatState } from '../context/chatProvider'
import { Box } from '@chakra-ui/react';
import PollCreatorSection from '../components/pollCreatorSection';
import PollFeedsSection from '../components/pollFeedsSection';
import Header from '../components/miscellaneous/header';

const chatpollPage = () => {
    const user = ChatState();
  return (
    <div style={{width:"100%"}}>
      {user && <Header />}
        <Box display="flex"
        w="100%"
        h="91.5vh"
        p="10px"
        >
           <div style={{flex:"1",height:"100%"}}> {user && <PollCreatorSection/>}</div>
           <div style={{flex:"2",height:"100%"}}>{user && <PollFeedsSection/>}</div>
        </Box>
      
    </div>
  )
}

export default chatpollPage
