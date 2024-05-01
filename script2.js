const image = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');

const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');

const music = document.querySelector('audio');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.backward');
const nextBtn = document.querySelector('.forward');

// Music

const songs = [
    {name: 'no1',
    displayName: 'Carnival Of Rust',
    artist: 'Poets Of The Fall'
    },

    {
    name: 'no2',
    displayName: 'Center Stage',
    artist: 'Poets Of The Fall'
    },
    {
    name: 'no3',
    displayName: 'Choice Millionaire',
    artist: 'Poets Of The Fall'
    },
    {
    name: 'no4',
    displayName: 'Heroes and Villains',
    artist: 'Poets Of The Fall'
    },
    {
    name: 'no5',
    displayName: ' In a Perfect World',
    artist: 'Poets Of The Fall'
    },
    {
    name: 'no6',
    displayName: 'Rebirth',
    artist: 'Poets Of The Fall'
    },
    {
    name: 'no7',
    displayName: 'The Labyrinth',
    artist: 'Poets Of The Fall'
    },
    {
    name: 'no8',
    displayName: 'The Child in Me',
    artist: 'Poets Of The Fall'
    },
]

//check if playhing

let isPlaying = false;

//play

function playSong(){
    isPlaying = true;
 music.play();
 playBtn.innerHTML='<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve" class="pause-btn"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44c0,33.93-27.51,61.44-61.44,61.44S0,95.37,0,61.44 C0,27.51,27.51,0,61.44,0L61.44,0z M68.16,33.88H84.1V89l-15.94,0V33.88L68.16,33.88L68.16,33.88z M38.78,33.88h15.94V89l-15.94,0 V33.88L38.78,33.88L38.78,33.88z"/></g></svg>'
 playBtn.setAttribute('title', 'pause')
}
   

function pauseSong(){
    isPlaying = false;
    music.pause();
    playBtn.innerHTML='<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 122.88" style="enable-background:new 0 0 122.88 122.88" xml:space="preserve"><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g><path class="st0" d="M61.44,0c33.93,0,61.44,27.51,61.44,61.44s-27.51,61.44-61.44,61.44S0,95.37,0,61.44S27.51,0,61.44,0L61.44,0z M84.91,65.52c3.41-2.2,3.41-4.66,0-6.61L49.63,38.63c-2.78-1.75-5.69-0.72-5.61,2.92l0.11,40.98c0.24,3.94,2.49,5.02,5.8,3.19 L84.91,65.52L84.91,65.52z"/></g></svg>'
    playBtn.setAttribute('title', 'play')
    
    
}


//updae DOM

function loadSong(songs){
    title.textContent = songs.displayName;
    artist.textContent= songs.artist;
    music.src = `music/${songs.name}.mp3`
    image.src=`images/${songs.name}.jpg`;
}

//onlead

/* current song */

let songIndex = 0;
loadSong(songs[songIndex]);

// next and prev function

function nextSong(){
    songIndex++;

    if(songIndex > songs.length - 1){
        songIndex = 0; 
    }
    
    loadSong(songs[songIndex]);
    isPlaying ? playSong() : pauseSong();
};

function prevSong(){
    songIndex--;

    if(songIndex < 0){
        songIndex = songs.length - 1 ; 
    }
    
    loadSong(songs[songIndex]);
    isPlaying ? playSong() : pauseSong();
}

//Update Progress Bar and Time

function UpdateProgressBar(event){

    const {currentTime, duration} = event.srcElement; 
    
    const progressPrecent = (currentTime / duration)* 100;

    progressBar.style.width = `${progressPrecent}%`;

    let dMins = Math.floor(duration / 60);
    let dSecs = Math.floor(duration % 60);
    if(dSecs<10){
        dSecs = `0${dSecs}`;    
    }
    // delay switiching duration element to awoid NaN

    if(dSecs){
        durationEl.textContent = `${dMins}:${dSecs}`;
    }

    

     //codes of current time

     let cMins = Math.floor(currentTime / 60);
     let cSecs = Math.floor(currentTime % 60);
     if(cSecs<10){
         cSecs = `0${cSecs}`;    
     }
     // delay switiching duration element to awoid NaN
 
     if(cSecs){
         currentTimeEl.textContent = `${cMins}:${cSecs}`;
     }

    
}


// Add 'loadedmetadata' event listener to display duration
music.addEventListener('loadedmetadata', () => {
    const { duration } = music;
    let dMins = Math.floor(duration / 60);
    let dSecs = Math.floor(duration % 60);
    if (dSecs < 10) {
        dSecs = `0${dSecs}`;
    }
    // Display duration only if it's available
    if (!isNaN(duration)) {
        durationEl.textContent = `${dMins}:${dSecs}`;
    }
});


// set progress bar

function setProgressBar(e){
    console.log(e);
    const width = this.clientWidth;
    console.log('width:', width);
    const clickX = e.offsetX;
    console.log('clickX:', clickX);
    const {duration}= music;
    console.log(clickX/width);
    console.log((clickX/width)*duration);
    music.currentTime = (clickX/width)*duration;

}

//play and pase event listener

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//add event lesitener
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
music.addEventListener('timeupdate', UpdateProgressBar );
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong );





