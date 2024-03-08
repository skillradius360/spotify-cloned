const playlistBox = document.querySelector(".bottomBox");
const musicData = document.querySelector(".playMusicData")
 
document.addEventListener('click',(e)=>{
    console.log(e.target);
    if (e.target.className==="musicContainers" || e.target.className==="musicContainersBox"){
        console.log("ok");
        console.log(e.target.lastElementChild.innerHTML);
        playlistDiv=document.createElement("div");
        playlistDiv.className="playlistDiv"
        playlistDiv.innerHTML= e.target.lastElementChild.innerHTML
        playlistBox.appendChild(playlistDiv)
        stateSaver();

        if(e.target.lastElementChild.innerHTML==="maroon 5"){
            
            let music_source =document.createElement("source")
            music_source.src="musics/Sugar - Maroon 5 320(PagalWorld).mp3"
            musicData.appendChild(music_source)
        }
    }

    // else{
    //     console.log("nope");
    // }
})

function stateSaver(){
    localStorage.setItem("playlistdata",playlistBox.innerHTML)
}
playlistBox.innerHTML= localStorage.getItem("playlistdata")