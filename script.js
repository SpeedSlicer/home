const tracks = [
    'music/beat.mp3',
    'music/lostinparadise.mp3',
    'music/wildside.mp3',
    'music/crazysong.mp3',
    'music/Dramaturgy.mp3'
];

const audioElement = document.getElementById('background-music');
const startButton = document.getElementById('start-button');
const overlay = document.getElementById('overlay');
const visualizerContainer = document.getElementById('visualizer-container');
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const professionElement = document.getElementById('profession');
const professions = ['Web Developer', 'Graphic Designer', 'Project Manager', 'Artist', 'Musician'];

function playRandomTrack() {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    audioElement.src = randomTrack;
    audioElement.play();
}

function initializeVisualizer() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);

        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            ctx.fillStyle = `rgb(${barHeight / 5}, ${barHeight / 5}, ${barHeight + 150})`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    drawVisualizer();
}

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    playRandomTrack();
    initializeVisualizer();
    visualizerContainer.style.display = 'block';
});

function changeProfession() {
    const randomProfession = professions[Math.floor(Math.random() * professions.length)];
    professionElement.textContent = randomProfession;
}

setInterval(changeProfession, 3000);
window.addEventListener('resize', () => {
    canvas.width = visualizerContainer.offsetWidth;
    canvas.height = visualizerContainer.offsetHeight;
});

canvas.width = visualizerContainer.offsetWidth;
canvas.height = visualizerContainer.offsetHeight;
