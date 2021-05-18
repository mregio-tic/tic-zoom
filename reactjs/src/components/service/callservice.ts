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
        async (MediaStream: any) => {
            console.log("answering call....");
            try {
                call.answer(MediaStream);

                call.on("stream", (stream: any) => {
                    onReceivedStream(stream);
                    ///*onReceiveVideoStream(stream);
                });

            } catch (e: any) {
                window.alert("Your permission is needed to proceed Talk.");
                window.location.reload();
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

export const onReceiveVideoCall = (stream: any) => {
    try {
        
    } catch (e: any) {
        alert("Something went wrong. (code:100)");
        window.location.reload();
    }
}

export const connectToEveryone = (members: any) => {
    members.map((item: any) => {
        if (item.username !== localStorage.getItem("userid")) {
            console.log("Member", item);
        }
    });
}

export default {
    getAudioPermissions,
    onReceivedStream,
    onReceiveCall,
    connectToEveryone
}