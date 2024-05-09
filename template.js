
const playlistBox = document.querySelector(".bottomBox");
const currentlyPlaying = document.querySelector(".currentlyPlaying");
const playPause = document.querySelector("#play_pause");
const seek_thumb=document.querySelector(".seek_Thumb")
const musicBox=document.querySelector(".musicBox")


function secondsToMinutes(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return 'Invalid input: Please enter a number of seconds.';
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes}`;
}
const audioObj = new Audio();


// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// playing mechanisms
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
// MidScreen Player
main_screen_player.addEventListener("click", () => {
  if (audioObj.paused === false) {
    main_screen_player.firstElementChild.src = "images/play-button (1).png"
    audioObj.pause()
  }
  else {
    let parsedData= localStorage.getItem("imageMusicData").trim()
    audioObj.src = `musics/${parsedData}.mp3`
    audioObj.play()
    main_screen_player.firstElementChild.src = "images/pause.png"
  }
})
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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
    imgDiv.className="img_Div"
    imgDiv.innerHTML=localStorage.getItem("imgSrc")
    document.querySelector(".imgDiv").appendChild(imgDiv)
    
  })

// PRevious and next page
const previousPage = document.querySelector("#previousPage")

previousPage.addEventListener("click",()=>{
  window.location.assign("http://127.0.0.1:5500/index.html")
})
  

// playlist Renderer
async function musicDataFetch(){
  const musicData = fetch("http://127.0.0.1:5500/musics")
  let res = await musicData
  
  return await res.text()
}

let musicData= musicDataFetch().then((e)=>{
// dummy parsing div
  let musicTitles = document.createElement("div")
  musicTitles.className = "musicTitles"
  musicTitles.innerHTML =e
  console.log(e)
   let titles = musicTitles.querySelectorAll(".name")
  titles.forEach((e)=>{

    let music_Title_text = document.createElement("div")
    music_Title_text.className="music_Title_text";
    let music_Titles_span = document.createElement("span")
    music_Titles_span.className="music_Titles_span"
    music_Titles_span.innerHTML= e.innerText
    music_Title_text.appendChild(music_Titles_span)
    musicBox.appendChild(music_Title_text)
  })
   console.log(titles)
  // musicBox.appendChild(musicTitles)
})



  