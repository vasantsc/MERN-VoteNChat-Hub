const mongoose = require('mongoose');

const pollingSchema = new mongoose.Schema({
    ques: { type: "String", required: true },
    optionsValue: {
        type: Map,
        of: Number,
      },
    messagesobj: [
      {
        sender: String,
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true });

const Polling = mongoose.model("Polling",pollingSchema);

module.exports = Polling;