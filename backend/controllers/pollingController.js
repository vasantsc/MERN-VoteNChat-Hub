const asyncHandler = require("express-async-handler");
const Polling = require('../Models/pollingModel');

const addPolling = asyncHandler(async (req, res) => {
  const {ques,options} = req.body;
  if(!ques||options.length<2){
    res.status(400);
    throw new Error("Please enter all fields");
  }
  let optionsValue = {};
  options.forEach((element) => {
    optionsValue[element] = 0;
  });
  const newPoll = await Polling.create({
    ques,
    optionsValue,
    "messagesobj":[]
  });
  if (newPoll) {
    res.status(201).json({
      _id:newPoll._id,
      ques:newPoll.ques,
      optionsValue:newPoll.optionsValue,
      messagesobj:newPoll.messagesobj
    });
  } else {
    res.status(500)
    throw new Error("Failed to create poll");
  }
})

const addPollingMessage = asyncHandler(async (req,res)=>{
  const {polling_id,messageData} = req.body;
  if(!polling_id||!messageData.text||!messageData.sender||!messageData.sender_id){
    res.send(400);
    throw new Error("Error");
  }
  const newMessage = {
    sender_id:messageData.sender_id,
    sender: messageData.sender, 
    text: messageData.text, 
    timestamp: new Date() 
  } 

// Update the document to add a new message to messagesobj
try {
  // Update the document to add a new message to messagesobj
  const updatedPoll = await Polling.findByIdAndUpdate(
    polling_id,
    { $push: { messagesobj: newMessage } },
    { new: true }
  );

  console.log(updatedPoll);
  res.status(200).json(updatedPoll);
} catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}
})

module.exports = {addPolling,addPollingMessage}