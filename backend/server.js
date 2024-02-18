const express = require('express');
const chats = require('./data/data');
const userRoutes = require('./routes/userRoutes');
const pollingRoutes = require('./routes/pollingRoutes');
const {notFound,errorHandler} = require("./middlewares/errorMiddleware");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const cors = require('cors');
dotenv.config();
connectDB();
const app = express();

app.use(express.json()); // to accept json data
app.use(cors())
app.use("/api/user",userRoutes);
app.use("/api/polling",pollingRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ;
const server = app.listen(PORT,console.log(`Server running at port ${PORT}`))

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST","PUT"]
    },
});

io.on("connection",(socket)=>{
    console.log(socket.id);
    socket.on("send_message",(data)=>{
        console.log(data);
        socket.broadcast.emit("recieve_message",data);
    });
    
})