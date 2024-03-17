const playlistBox = document.querySelector(".bottomBox");
const currentlyPlaying = document.querySelector(".currentlyPlaying");
const playPause = document.querySelector("#play_pause");

function secondsToMinutes(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return 'Invalid input: Please enter a number of seconds.';}
  const minutes = Math.floor(seconds / 60);
  return `${minutes}`;
}

  


const audioObj = new Audio();

//  MUSIC DATA NAMES
async function dataRecieve(){
  let jsonDataDiv= document.createElement("div") 
  
  let musicData = fetch("http://127.0.0.1:5500/musics/")
  jsondata= await musicData;
  responseData = await jsondata.text()
  
  jsonDataDiv.innerHTML=responseData;
  let musicNames =jsonDataDiv.querySelectorAll(".icon-mp3")
  
  musicNames.forEach((e)=>{
    let playlistBoxes = document.createElement("div");
    playlistBoxes.innerHTML=` <div>${e.title.split(".")[0]}</div>
    <img src="images/music.png" width="50px" height="50px">`
    playlistBoxes.className="playListBoxes"
    playlistBox.appendChild(playlistBoxes)

  })

}
dataRecieve()

// MUSIC PLAYERS
playlistBox.addEventListener('click',(f)=>{
  audioObj.src=`musics/${f.target.innerHTML}`+`.mp3`
  playPause.firstElementChild.src="images/pause.png"
  audioObj.play()
  
  playPause.addEventListener("click",()=>{
    if(audioObj.paused===false){
      playPause.firstElementChild.src="images/play-button (1).png"
      audioObj.pause()
    }
    else{
      audioObj.play()
      playPause.firstElementChild.src="images/pause.png"
    }
  })
  
  
})

audioObj.addEventListener("timeupdate",(e)=>{
  currentlyPlaying.innerHTML = `${secondsToMinutes(Math.floor(audioObj.currentTime))}:${Math.ceil(audioObj.currentTime%60)}/${secondsToMinutes(audioObj.duration)}${audioObj.currentTime.toPrecision(2)}`
})

document.querySelector(".seek_Bar")
.addEventListener("click",(data)=>{
  console.log(data.clientX)
  // document.querySelector(".seek_Thumb").style.left=`${data.clientX}px`
})

