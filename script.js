const playlistBox = document.querySelector(".bottomBox");
 
document.addEventListener('click',(e)=>{
    console.log(e.target);
    if (e.target.className==="musicContainers" || e.target.className==="musicContainersBox"){
        console.log("ok");
        playlistDiv=document.createElement("div");
        playlistDiv.className="playlistDiv"
        playlistDiv.innerHTML= e.target.lastElementChild.innerHTML
        playlistBox.appendChild(playlistDiv)
        stateSaver();
    }

    // else{
    //     console.log("nope");
    // }
})

function stateSaver(){
    localStorage.setItem("playlistdata",playlistBox.innerHTML)
}
playlistBox.innerHTML= localStorage.getItem("playlistdata")