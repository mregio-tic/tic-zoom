import Peer from "peerjs";
import callservice from "./callservice";


var connectOptions = {
    host: "mak-webrtc-server.herokuapp.com",
    secure: true,
    debug: 3,
    config: {
        iceServers: [
            { urls: "stun:stun1.l.google.com:19302" },
            {
                urls: process.env.REACT_WEBRTC_TURNSERVER || "turn:13.212.218.145:3478",
                credential: "talkinnovationscom",
                username: "ticadmin",
            }
        ],
    },
};

var peerConfig = new Peer(localStorage.getItem("userid") || "", connectOptions);
const peerConnection = () => {

    peerConfig.on("open", (id: any) => {
        console.log("peer id: " + id);
    });

    peerConfig.on("connection", (connection: any) => {
        console.log("connected");
    });
    
    peerConfig.on("disconnected", () => {
        console.log("disconnected");
        peerConnection();
    });

    peerConfig.on("call", (call: any) => {
        callservice.onReceiveCall(call);
    });


    peerConfig.on("error", (error: any) => {
        console.log("Connection error. \n" + error);
        if (error.type === "unavailable-id") {
            peerConnection();
        } else {
            //window.location.reload();
        }
    });
    return peerConfig;
};

export default {
    peerConnection
};
