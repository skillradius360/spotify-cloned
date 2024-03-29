const playlistBox = document.querySelector(".bottomBox");
const currentlyPlaying = document.querySelector(".currentlyPlaying");
const playPause = document.querySelector("#play_pause");

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
  // currentlyPlaying.innerHTML = f.target.textContent+audioObj.currentTime
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
  currentlyPlaying.innerHTML=Math.floor(audioObj.currentTime)
})

document.querySelector(".seek_Bar")
.addEventListener("click",(data)=>{
  console.log(data.clientX)
  document.querySelector(".seek_Thumb").style.left=`${data.clientX}px`
})

