import {
  Box,
  Card,
  CardHeader,
  Heading,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Progress,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PollFeedsSection = () => {
  const [selectedOptions, setSelectedOptions] = useState({});

  // Sample array of poll questions with options (replace this with your actual data)
  const pollQuestions = [
    {
      id: 1,
      question: "What is your favorite color?",
      options: ["Red", "Blue", "Green", "Yellow"],
    },
    {
      id: 2,
      question: "Which programming language do you prefer?",
      options: ["JavaScript", "Python", "Java", "C#"],
    },
    // Add more poll questions as needed
  ];

  const handleOptionSelection = (pollId, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [pollId]: option,
    }));
  };

  const handleVoteButtonClick = () => {
    // Handle navigation to another page or any other action based on the selected options
    console.log("User voted for:", selectedOptions);
    // You can use React Router or any other navigation method here
  };
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return (
    <Box p={1} height="100%">
      <Card height="100%">
        <CardHeader>
          <Heading size="md">Poll Feeds</Heading>
        </CardHeader>
        <Stack spacing={4} p={4} height="100%" overflowY="auto">
          {pollQuestions.map((poll) => (
            <Box key={poll.id} borderWidth="1px" borderRadius="lg" p={4} mb={4}>
              <Heading size="sm">{poll.question}</Heading>
              <RadioGroup
                onChange={(value) => handleOptionSelection(poll.id, value)}
                value={selectedOptions[poll.id] || ""}
              >
                <Stack spacing={2} mt={2}>
                  {poll.options.map((option) => (
                    <Box key={option} borderWidth="1px" borderRadius="md" p={2}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Radio value={option} borderColor="black">
                          {option}
                        </Radio>
                        <Box>
                          {/* Percentage value indicator */}
                          {option && (
                            <span>{(Math.random() * 100).toFixed(2)}%</span>
                          )}
                        </Box>
                      </div>

                      {/* Progress bar with random color */}
                      {option && (
                        <Progress
                          value={(Math.random() * 100).toFixed(2)}
                          size="sm"
                          colorScheme={
                            selectedOptions[poll.id] === option
                              ? "blue"
                              : "gray"
                          }
                          borderRadius="md"
                          mt={1}
                        />
                      )}
                    </Box>
                  ))}
                </Stack>
              </RadioGroup>
              <Link to="/singlechats">
                <Button
                  colorScheme="teal"
                  mt="2"
                  float="right"
                  size="sm"
                  onClick={handleVoteButtonClick}
                >
                  Go to chat
                </Button>
              </Link>
            </Box>
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default PollFeedsSection;
