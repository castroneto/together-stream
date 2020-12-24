var dropArea = document.getElementById('overlayBtn');
var video = document.getElementById('video');
var info_streaming = document.getElementById('info');

var websocket = new WebSocket("ws://localhost:8080/","echo-protocol");


websocket.onopen = function (e) {
    alert("[open] Connection established");
    alert("Sending to server");
    socket.send("My name is John");
};

websocket.onmessage = function (event) {
    alert(`[message] Data received from server: ${event.data}`);
};

websocket.onclose = function (event) {
    if (event.wasClean) {
        alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        alert('[close] Connection died');
    }
};

setInterval(() => {
    websocket.send("ssss")
}, 3000);


websocket.onerror = function (error) {
    alert(`[error] ${error.message}`);
};

// deixa invisivel as informacoes de compartilhamento
var timeout = null;
video.addEventListener('mousemove', hideShareButton, false)
function hideShareButton() {
    clearTimeout(timeout);
    info_streaming.style.visibility = 'visible';
    setTimeout(function(){
        info_streaming.style.visibility = 'hidden';
    }, 3000)
}


if (dropArea) {
    dropArea.addEventListener('dragleave', dragleaveFunction, false)
    dropArea.addEventListener('dragover', dragoverFunction, false)
    dropArea.addEventListener('drop', dropFunction, false)
}


function dragleaveFunction(evt) {
    let input = document.getElementById("input");
    input.className = "fileOut";
    evt.preventDefault();
}

function dragoverFunction(evt) {
    let input = document.getElementById("input");
    input.className = "fileOn";
    evt.preventDefault();

}

function dropFunction(evt) {
    var video = document.getElementById('video');
    var source = document.createElement('source');
    video.pause();
    video.controls = true;
    source.setAttribute('src', "file://" + evt.dataTransfer.files[0].path);
    video.load();
    video.appendChild(source);
    video.play();
}


let stream = video.captureStream();
//call.answer(stream); // Answer the call with an A/V stream.


console.log(stream)
const peer = new Peer({
    host: 'localhost',
    port: 9000,
    path: '/myapp'
});

