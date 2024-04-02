
const playlistBox = document.querySelector(".bottomBox");
const currentlyPlaying = document.querySelector(".currentlyPlaying");
const playPause = document.querySelector("#play_pause");
const seek_thumb=document.querySelector(".seek_Thumb")
const SongName = Array.from(document.getElementsByTagName("p"))[0]


function secondsToMinutes(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return 'Invalid input: Please enter a number of seconds.';
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes}`;
}
const audioObj = new Audio();

//  MUSIC DATA NAMES


playPause.addEventListener("click", () => {
    if (audioObj.paused === false) {
      playPause.firstElementChild.src = "images/play-button (1).png"
      audioObj.pause()
    }
    else {
      let parsedData= localStorage.getItem("imageMusicData").trim()
      audioObj.src = `musics/${parsedData}.mp3`
      audioObj.play()
      playPause.firstElementChild.src = "images/pause.png"
    }
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
window.addEventListener("load",()=>{
    let imgDiv= document.createElement("div")
    imgDiv.className="imgDiv"
    imgDiv.innerHTML=localStorage.getItem("imgSrc")
    document.querySelector(".imgDiv").appendChild(imgDiv)
    SongName.innerHTML= localStorage.getItem("imageMusicData")
  })


  

  
  


  