const myPlaybtn= document.querySelector('.play');

const durationElement = document.querySelector('.duration');



const audioElement = document.querySelector('.audio');



    

  
let totalTimeDuration = ``;

function updateTotalTimeDuration(callback) {
    audioElement.addEventListener('loadedmetadata', () => {
        let durationInSeconds = audioElement.duration;
        const mins = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        let musicDuration = `${mins}:${seconds}`;
        totalTimeDuration = totalTimeDuration + musicDuration;
        callback(totalTimeDuration); // Call the callback function with totalTimeDuration
    });
}

// Use the updated totalTimeDuration in another function
updateTotalTimeDuration((totalTime) => {
    console.log(totalTime); // Now you can use totalTime in this function
    // Add your other functions here that need to use totalTime
});


    







function formatTime(){
    let durationInSeconds =audioElement.duration ;
    const mins = Math.floor(durationInSeconds / 60);
    const seconds= Math.floor(durationInSeconds % 60);

    return `${mins}:${seconds}`;
    
}



function ShowMusicInfo(){
    
}

console.log(totalTimeDuration);

const play = true;
function playMusic(){
    durationElement.textContent =formatTime();
    if(audioElement.paused){
        audioElement.play();
    }else if(audioElement.played){
        audioElement.pause();
        
    }
}
myPlaybtn.addEventListener('click', playMusic, );





