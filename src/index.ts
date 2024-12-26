let mediaRecorder: MediaRecorder;

let chunks: BlobPart[] = [];

async function createMediaRecorder() {
    
    let stream: MediaStream

    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
        console.error('Cannot getUserMedia');
        console.error(e);
        throw e;
    }

    const mediaRecorder = new MediaRecorder(stream);

    return mediaRecorder;
}

async function handleTalkButtonMouseDown(e: Event) {
    e.preventDefault();
    mediaRecorder.start();
    console.log('start');
}

async function handleTalkButtonMouseUp(e: Event) {
    e.preventDefault();
    mediaRecorder.stop();
    console.log('stop');
}

function handleMediaRecorderDataAvailable(e: BlobEvent) {
    chunks.push(e.data);
}

function handleMediaRecorderStop() {
    const clipName = prompt('Enter name for your audio clip');

    const clipListItem = document.createElement('ul');
    const audio = document.createElement('audio');
    const clipLabel = document.createElement('p');

    clipLabel.textContent = clipName;

    audio.setAttribute('controls', '');

    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    chunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;

    clipListItem.appendChild(audio);
    clipListItem.appendChild(clipLabel);

    audioClips.appendChild(clipListItem);
}

const talkButton = document.getElementById('talkButton') as HTMLButtonElement;

const audioClips = document.getElementById('audioClips') as HTMLUListElement;

talkButton.addEventListener('mousedown', handleTalkButtonMouseDown);
talkButton.addEventListener('mouseup', handleTalkButtonMouseUp);

createMediaRecorder().then(recorder => {
    mediaRecorder = recorder;
    mediaRecorder.ondataavailable = handleMediaRecorderDataAvailable;
    mediaRecorder.onstop = handleMediaRecorderStop;
});
