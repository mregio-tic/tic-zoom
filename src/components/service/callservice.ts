import peerjs from "./peerjs";

const peer = peerjs.peerConnection();
var videoContainer: any = null;

export const getAudioPermissions = (successCallback: any, errorCallback: any) => {
    navigator.mediaDevices.getUserMedia(
        {
            audio: true,
            video: true,
        })
        .then(successCallback)
        .catch(errorCallback)
};

export const onReceivedStream = async (stream: any) => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices.forEach(device => {
            console.log("Device: " + device.kind + "-" + device.label);
        })
    });
    console.log("Receiving VOICE!!");
    try {
        var audioStream = new Audio();
        audioStream.volume = 1.0;
        audioStream.srcObject = stream;
        audioStream.onloadedmetadata = function (e) {
            console.log("Playing VOICE!!");
            audioStream.play();
        };
    } catch (e: any) {
        alert("Something went wrong. (code:100)");
        window.location.reload();
    }

};

export const onReceiveCall = (call: any) => {
    getAudioPermissions(
        async (mediaStream: any) => {
            console.log("answering call....");
            try {
                call.answer(mediaStream);

                call.on("stream", (stream: any) => {
                    //onReceivedStream(stream);
                    onReceiveVideoStream(call.peer, stream);
                });

            } catch (e: any) {
                console.log(e);
            }

        },
        (err: any) => {
            alert("Something went wrong. (code:200)");
            window.location.reload();
            console.log("an error occurred.");
        }
    );
};

export const onReceiveVideoStream = (caller: string, stream: any) => {
    try {
        videoContainer = document.getElementById(caller);
        if (videoContainer.srcObject === null) {
            videoContainer.srcObject = stream;
            videoContainer.onloadedmetadata = function (e: any) {
                videoContainer.play();
            };
        }

    } catch (e: any) {
        console.log("ERROR", e);
    }
}

export const connectToEveryone = (members: any) => {
    getAudioPermissions(
        async (mediaStream: any) => {
            members.map((item: any) => {
                if (item.username !== localStorage.getItem("userid")) {
                    var call = peer.call(item.username, mediaStream);
                    call.on("stream", async (stream: any) => {
                        videoContainer = document.getElementById(item.username);
                        if (videoContainer.srcObject === null) {
                            videoContainer.srcObject = stream;
                            videoContainer.onloadedmetadata = function (e: any) {
                                videoContainer.play();
                            };
                        }

                    });
                }
            });
        },
        async (err: any) => {

        }
    );

}

export default {
    onReceivedStream,
    onReceiveCall,
    connectToEveryone
}