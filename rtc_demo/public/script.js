const socket = io('/')
const myPeer = new Peer(undefined, {
    host: '/',
    port: 3001
});

let myId = 0;
myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
    myId = id;
})

const videoGrid = document.querySelector('#video-grid');
const myVideo = document.createElement('video')

myVideo.muted = true;
const peers = []

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);
    
    myPeer.on('call', call => {
        call.answer(stream);
        console.log(myId, ' is called and sent ', stream);
        initVideoForCall(call);
    });

    socket.on('user-connected', (userId) => {
        connectToUser(userId, stream);
    })

});
socket.on('user-disconnected', (userId) => {
    peers[userId]?.close()
})


function connectToUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    console.log(myId, " called ", userId);
    initVideoForCall(call);
    peers[userId] = call;
}

function initVideoForCall(call) {
    const video = document.createElement('video');
    console.log('Created new video for ', call, ' then assigned listeners accordingly');
    call.on('stream', theirStream => {
        addVideoStream(video, theirStream);
    })
    call.on('close', () => video.remove())
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}