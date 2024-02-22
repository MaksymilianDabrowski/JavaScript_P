// event listener dla klawiszy 
document.addEventListener('keypress', onKeyPress)

// deklaracja talbic do zapisania ścieżek
const melodyKeysChannel1 = [];
const melodyKeysChannel2 = [];
const melodyKeysChannel3 = [];
const melodyKeysChannel4 = [];

// przypisanie dźwięków do klawiszy
const KeyToSound = {
    'q': document.querySelector('#s1'),
    'w': document.querySelector('#s2'),
    'e': document.querySelector('#s3'),
    'r': document.querySelector('#s4'),
    't': document.querySelector('#s5'),
    'y': document.querySelector('#s6'),
    'u': document.querySelector('#s7'),
    'i': document.querySelector('#s8'),
    'o': document.querySelector('#s9'),
}

// dźwięk z klawisza zapisuje się w ścieżce
function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    if (sound) {
        playSound(sound);
        saveMelody(event.key, currentChannel);
    }
}

// pobierz dźwięk
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

// zapisz konkretne dźwięki w odpowiedniej tablicy
function saveMelody(key, channel) {
    const currentMelodyKeys = getMelodyKeysArrayByChannel(channel);
    currentMelodyKeys.push(key);
}

//get the melody array by channel
function getMelodyKeysArrayByChannel(channel) {
    switch (channel) {
        case 1:
            return melodyKeysChannel1;
        case 2:
            return melodyKeysChannel2;
        case 3:
            return melodyKeysChannel3;
        case 4:
            return melodyKeysChannel4;
        default:
            return [];
    }
}

// zmiana zapisywanej ścieżki
document.getElementById('channel1Btn').addEventListener('click', () => changeChannel(1));
document.getElementById('channel2Btn').addEventListener('click', () => changeChannel(2));
document.getElementById('channel3Btn').addEventListener('click', () => changeChannel(3));
document.getElementById('channel4Btn').addEventListener('click', () => changeChannel(4));

// odtworzenie każdej melodii zapisanej na wybranej ścieżce
document.getElementById('playChannel1Btn').addEventListener('click', () => playMelody(1));
document.getElementById('playChannel2Btn').addEventListener('click', () => playMelody(2));
document.getElementById('playChannel3Btn').addEventListener('click', () => playMelody(3));
document.getElementById('playChannel4Btn').addEventListener('click', () => playMelody(4));

// odtworzenie wszystkich 4 ścieżek
document.getElementById('playAllChannelsBtn').addEventListener('click', playAllChannels);

// funkcja zmiany ścieżki 
function changeChannel(channel) {
    currentChannel = channel; //sets current cahnnel to new cahnnel

    //loop through all channels(4)
    for (let i = 1; i <= 4; i++) {
        const channelBtn = document.getElementById(`channel${i}Btn`); //get the button corresponding to the (i) channel
        channelBtn.classList.remove('active-channel'); //remove the active-channel class from all channel buttons
    }

    const currentChannelBtn = document.getElementById(`channel${channel}Btn`);
    currentChannelBtn.classList.add('active-channel');
}

// funkcja odtwarzająca dźwięki zapisane na ścieżce
function playMelody(channel) {
    const melodyKeys = getMelodyKeysArrayByChannel(channel);
    const playMelodyInterval = setInterval(() => {
        if (melodyKeys.length === 0) {
            clearInterval(playMelodyInterval);
        } else {
            const key = melodyKeys.shift();
            const sound = KeyToSound[key];
            if (sound) {
                playSound(sound);
            }
        }
    }, 300); // delay 300ms
}

// odtworzenie wszystkich 4 ścieżek
function playAllChannels() {
    playMelody(1);
    playMelody(2);
    playMelody(3);
    playMelody(4);
}