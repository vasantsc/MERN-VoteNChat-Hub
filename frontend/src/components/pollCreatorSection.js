import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
const PollCreatorSection = () => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState([""]); // Initial empty option

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  const handlePollSubmit = () => {
    // Handle poll submission logic here
    console.log("Poll Question:", pollQuestion);
    console.log("Options:", options);
    socket.emit("send_message", { message: "This sockets work" });
  };
  return (
    <Box p={1} height="100%">
      <Card height="100%">
        <CardHeader>
          <Heading size="md" textAlign="center">
            Poll Creator Section
          </Heading>
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
           
            <FormControl id="question" isRequired>
              <FormLabel>Your Question</FormLabel>
              <Input
                placeholder="Enter your poll question"
                value={pollQuestion}
                onChange={(e) => setPollQuestion(e.target.value)}
              />
            </FormControl>
            {options.map((option, index) => (
              <Input
                key={index}
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}

            <Button style={{ marginLeft: "auto",border:"1px solid #dbdbdb" }} colorScheme="gray" onClick={addOption}>
              + Add Option
            </Button>
            <Button
            colorScheme="blue"
            width="90%"
              style={{ position: "absolute", bottom: 0, margin: "20px auto" }}
              onClick={handlePollSubmit}
            >
              Submit Poll
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default PollCreatorSection;
