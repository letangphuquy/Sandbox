const video = document.querySelector("video")

const openMediaDevice = async (constraints) => {
    return navigator.mediaDevices.getUserMedia(constraints)
}


let htmlList = document.querySelector("section#info ul");

const listDevices = async() => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    
    for (const device of devices) {
        let li = document.createElement("li");
        // console.log(device)
        const text = `${device.kind} device: ${device.label}, id = ${device.deviceId}`;
        console.log(text)
        li.textContent = text;
        htmlList.appendChild(li);
    }
}

const driverFun = async() => {
    try {
        // await listDevices()
        const stream = await openMediaDevice({
            'video': true,
            'audio': false
        });
        video.srcObject = stream
        console.log('got ' + stream) 
    } catch (error) {
        console.error("WA! " + error)
    }
}

driverFun()

navigator.mediaDevices.addEventListener("devicechange", event => {
    console.log("Detected event " + event);
    listDevices()
})