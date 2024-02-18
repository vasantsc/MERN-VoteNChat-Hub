// Chat.js
import React from 'react';
import { Box, Flex, Avatar, Text, Input, IconButton, Heading } from '@chakra-ui/react';
import { FaRegPaperPlane } from 'react-icons/fa';

const ChatSection = () => {
  const messages = [
    { id: 1, sender: 'John', text: 'Hey, how are you?' },
    { id: 2, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 3, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 4, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 5, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 6, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 7, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 8, sender: 'Jane', text: 'I am good, thanks! How about you?' },
    { id: 9, sender: 'John', text: "I'm doing well too. Any plans for the weekend?" },
    // Add more messages as needed
  ];

  return (
    <Box p={4} height="100%" display="flex" flexDir="column" bgColor={"#fff"}>
      <Box flex="1" overflowY="auto">
        {messages.map((message) => (
          <Flex key={message.id} justify={message.sender === 'John' ? 'flex-end' : 'flex-start'} mb={4}>
            {message.sender !== 'John' && (
              <Avatar size="sm" name={message.sender} mr={2} />
            )}
            <Box
              maxW="70%"
              p={3}
              bg={message.sender === 'John' ? 'gray.200' : 'teal.400'}
              borderRadius="md"
              color={message.sender === 'John' ? 'black' : 'white'}
            >
                <Heading size="xs" >{message.sender}</Heading>
              <Text>{message.text}</Text>
            </Box>
            {message.sender === 'John' && (
              <Avatar size="sm" name={message.sender} ml={2} />
            )}
          </Flex>
        ))}
      </Box>
      <Flex>
        <Input placeholder="Type a message..." borderRadius="md" flex="1" mr={2} />
        <IconButton
          icon={<FaRegPaperPlane />}
          colorScheme="teal"
          aria-label="Send"
          borderRadius="md"
        />
      </Flex>
    </Box>
  );
};

export default ChatSection;
