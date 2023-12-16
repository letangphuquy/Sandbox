`use strict`
const video = document.querySelector("video")
let listElement = document.querySelector("section#info ul");
console.log(listElement)

const openMediaDevice = async (constraints) => {
    return navigator.mediaDevices.getUserMedia(constraints)
}
// HTMLMediaElement.prototype
const listDevices = async() => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log('query devices ' + devices)
    // navigator.mediaDevices.enumerateDevices().then(
    //     (devices) => {
            for (const device of devices) {
                console.log('\ta device: ' + device + " " + Object.getOwnPropertyNames(device))
                let li = document.createElement("li");
                // console.log(device)
                const text = `${device.kind} device: ${device.label}, id = ${device.deviceId}`;
                console.log(text)
                li.textContent = text;
                listElement.appendChild(li);
            }
    // })
}

const constraints = {
    'video': true,
    'audio': true
}

const driverFun = async() => {
    try {
        const stream = await openMediaDevice(constraints);
        window.stream = stream
        video.srcObject = stream
        console.log('got ' + stream) 
        listDevices()
        const tracks = stream.getTracks()
        for (const track of tracks) {
            console.log('track ', track)
        }
    } catch (error) {
        console.error("WA! " + error.name + ": " + error.message)
    }
}

// driverFun()

function gotStream(stream) {
    return navigator.mediaDevices.enumerateDevices()
} 

function gotDevices(deviceInfos) {
    for (const info of deviceInfos) {
        console.log("\tinfo: " + info.kind + " " + info.deviceId + " " + info.label)
    }
}
function handleError(error) {
    console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
  }

navigator.mediaDevices.getUserMedia(constraints).then(gotStream).then(gotDevices).catch(handleError);


navigator.mediaDevices.addEventListener("devicechange", event => {
    console.log("Detected event " + event);
    listDevices()
})
