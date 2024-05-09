const playlistBox = document.querySelector(".bottomBox");
const currentlyPlaying = document.querySelector(".currentlyPlaying");
const playPause = document.querySelector("#play_pause");
const seek_thumb=document.querySelector(".seek_Thumb")


function secondsToMinutes(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return 'Invalid input: Please enter a number of seconds.';
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes}`;
}
const audioObj = new Audio();


let musicStack = []
document.addEventListener("click",(e)=>{
  if(e.target.parentElement.className=="musicContainersBox"){
    musicStack.push(e.target.closest(".musicContainers").lastElementChild.innerHTML)
  }
  musicStack.forEach((e)=>{
    let playlistBoxes = document.createElement("div");
        playlistBoxes.innerHTML = ` <div>${e.title.split(".")[0]}</div>
        <img src="images/music.png" width="40px" height="40px">`
        playlistBoxes.className = "playListBoxes"
        playlistBox.appendChild(playlistBoxes)
  })
 
})
// MUSIC PLAYERS
playlistBox.addEventListener('click', (f) => {
  audioObj.src = `musics/${f.target.innerHTML}` + `.mp3`
  playPause.firstElementChild.src = "images/pause.png"
  document.querySelector(".currentlyPlayingSong").innerHTML = f.target.innerHTML
  audioObj.play()

  playPause.addEventListener("click", () => {
    if (audioObj.paused === false) {
      playPause.firstElementChild.src = "images/play-button (1).png"
      audioObj.pause()
    }
    else {
      audioObj.play()
      playPause.firstElementChild.src = "images/pause.png"
    }
  })
})
// Seek bar logic
audioObj.addEventListener("timeupdate",(e)=>{
  currentlyPlaying.innerHTML = `${secondsToMinutes(Math.floor(audioObj.currentTime))}:${Math.ceil(audioObj.currentTime%60)}/${(audioObj.duration/60).toPrecision(3)}`
  document.querySelector(".seek_Thumb").style.left=(audioObj.currentTime/audioObj.duration)*100+"%"
})

document.querySelector(".seek_Bar").addEventListener("click",(e)=>{
seek_thumb.style.left=(e.offsetX/e.target.getBoundingClientRect().width)*100+"%"
audioObj.currentTime= (audioObj.duration*(e.offsetX/e.target.getBoundingClientRect().width)*100)/100
}) 

// send data to another page so that the image from this page to other page can be loaded with the help of local storage

document.addEventListener("click",(e)=>{
    if(e.target.parentElement.className=="musicContainersBox"){
      window.location.assign("http://127.0.0.1:5500/template.html")
     localStorage.setItem("imgSrc",e.target.closest(".musicContainersBox").innerHTML)
     localStorage.setItem("imageMusicData",e.target.closest(".musicContainers").lastElementChild.innerHTML)
    }

})


