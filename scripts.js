
// send data to another page so that the image from this page to other page can be loaded with the help of local storage

document.addEventListener("click",(e)=>{
    if(e.target.parentElement.className=="musicContainersBox"){
      window.location.assign("http://127.0.0.1:5500/template.html")
     localStorage.setItem("imgSrc",e.target.closest(".musicContainersBox").innerHTML)
     localStorage.setItem("imageMusicData",e.target.closest(".musicContainers").lastElementChild.innerHTML)
    // console.log(e.target.closest(".musicContainers").lastElementChild.innerHTML)
    }

})

document.addEventListener("click",(e)=>{
  if (e.target.matches(".musicImages")){
    let c= document.createElement("div")
    c.className="playlistBox"
    c.innerHTML=e.target.closest(".musicContainers").lastElementChild.innerHTML
    document.querySelector(".bottomBox").appendChild(c)
    localStorage.setItem("playListdata",document.querySelector(".bottomBox").innerHTML)
    
  }
  
})

document.querySelector(".bottomBox").innerHTML=localStorage.getItem("playListdata")