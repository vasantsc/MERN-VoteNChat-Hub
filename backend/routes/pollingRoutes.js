const express = require('express');
const router = express.Router();
const {addPolling, addPollingMessage} = require('../controllers/pollingController') 

router.post("/addpoll",addPolling);
router.post("/addpollmessage",addPollingMessage);
// router.get("/pollinglist",authUser);

module.exports = router;