// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ['GET', 'POST'],
//     },
// });

// const userSocketMap = {};

// io.on('connection', (socket) => {
//     console.log("User connected:", socket.id);

//     const userId = socket.handshake.query.userId
//     if(userId!==undefined){
//         userSocketMap[userId] = socket.id;
//     }

//     io.emit('getOnlineUsers',Object.keys(userSocketMap))
//     socket.on('disconnect',()=>{
//         console.log('user disconnected',socket.id);
//         delete userSocketMap[userId];
        
//     })
// });

// export { app, io, server };




import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",  // This should match your frontend's port
        // origin: ["http://192.168.43.217:5173", "http://localhost:5173"],
        methods: ['GET', 'POST'],
    },
});

export const getRecieverSocketId = (receiverId) =>{
    return userSocketMap[receiverId]
}
const userSocketMap = {};

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    // Emit the list of online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

// Start the server and listen on the correct port
// const PORT = 8081;
server.listen(8081, () => {
    console.log("Server is running on http://localhost:8081");
    // console.log(`Socket.IO server is running on http://192.168.43.217:${PORT}`);
});

export { app, io, server };
