const video = document.querySelector("video")
let htmlList = document.querySelector("section#info ul");

const openMediaDevice = async (constraints) => {
    return navigator.mediaDevices.getUserMedia(constraints)
}

const listDevices = async() => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log('got ' + devices)
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
        const stream = await openMediaDevice({
            'video': true,
            'audio': true
        });
        window.stream = stream
        video.srcObject = stream
        console.log('got ' + stream) 
        listDevices()
        const tracks = stream.getTracks()
        for (const track of tracks) {
            console.log('track ', track)
        }
    } catch (error) {
        console.error("WA! " + error)
    }
}

// driverFun()

navigator.mediaDevices.addEventListener("devicechange", event => {
    console.log("Detected event " + event);
    listDevices()
})
//OOP section. Researching OOJS and typescript 
class Cell {
    static category = "biology"
    name = 'an unnamed cell'
    constructor(name) {
        if (name)
        this.name = name
    }
    display() {
        console.log(`Hello, this is ${this.name}. I'm classified as ${Cell.category}`)
    }
}

class Virus extends Cell {
    display() {
        console.log("Virus greeting. Overriding")
        super.display()
    }
}

let virus = new Virus()
virus.display()