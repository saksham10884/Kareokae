console.log('kareokae running');
let audio=new Audio()
let songsUl=[]
function sectomin(duration,current){
    let dur=Math.floor(duration/60)
    let cur=Math.floor(current/60)
    let rcur=current%60
    let rdur=duration%60
    let ele=document.querySelector("#time")
    if(dur<10 && rdur<10){
        if(cur<10 && rcur<10){
            ele.innerText=`0${cur}:0${rcur}/0${dur}:0${rdur}`
        }
        else if(cur<10 && rcur>=10){
            ele.innerText=`0${cur}:${rcur}/0${dur}:0${rdur}`
        }
        else if(cur>=10 && rcur<10){
            ele.innerText=`${cur}:0${rcur}/0${dur}:0${rdur}`
        }
        else if(cur>=10 && rcur>=10){
            ele.innerText=`${cur}:${rcur}/0${dur}:0${rdur}`
        }
    }
    else if(dur<10 && rdur>=10){
        if(cur<10 && rcur<10){
            ele.innerText=`0${cur}:0${rcur}/0${dur}:${rdur}`
        }
        else if(cur<10 && rcur>=10){
            ele.innerText=`0${cur}:${rcur}/0${dur}:${rdur}`
        }
        else if(cur>=10 && rcur<10){
            ele.innerText=`${cur}:0${rcur}/0${dur}:${rdur}`
        }
        else if(cur>=10 && rcur>=10){
            ele.innerText=`${cur}:${rcur}/0${dur}:${rdur}`
        }
    }
    else if(dur>10 && rdur<10){
        if(cur<10 && rcur<10){
            ele.innerHtml=`0${cur}:0${rcur}/${dur}:0${rdur}`
        }
        else if(cur<10 && rcur>10){
            ele.innerText=`0${cur}:${rcur}/${dur}:0${rdur}`
        }
        else if(cur>10 && rcur<10){
            ele.innerText=`${cur}:0${rcur}/${dur}:0${rdur}`
        }
        else if(cur>10 && rcur>10){
            ele.innerText=`${cur}:${rcur}/${dur}:0${rdur}`
        }
    }
    else if(dur>10 && rdur>10){
        if(cur<10 && rcur<10){
            ele.innerHtml=`0${cur}:0${rcur}/${dur}:${rdur}`
        }
        else if(cur<10 && rcur>10){
            ele.innerText=`0${cur}:${rcur}/${dur}:${rdur}`
        }
        else if(cur>10 && rcur<10){
            ele.innerText=`${cur}:0${rcur}/${dur}:${rdur}`
        }
        else if(cur>10 && rcur>10){
            ele.innerText=`${cur}:${rcur}/${dur}:${rdur}`
        }
    }
}
play.addEventListener("click",()=>{
    if(audio.paused){
        play.src="logo/pause.svg"
        audio.play()
            // isplay=false
        }
    else{
        play.src="logo/play.svg"
        audio.pause()
        // isplay=true
    }
})
function playsong(src,name,artist){
    audio.src=src
    audio.play()
    play.src="logo/pause.svg"
    info.innerHTML=`<div class="name">Song:${name}</div>
    Artist:${artist}`
}
async function getsongsname(link){
    let a=await fetch(link)
    let response=await a.text();
    console.log(response)
    let div=document.createElement("div")
    div.innerHTML=response
    let as=div.getElementsByTagName("a")
    for( i of as){
        if(i.href.includes("punjabihits/")){
            songsUl.push(i.href)
        }
    }
    return songsUl
}
async function writesongs(link){
    let songs=await getsongsname(link)
    console.log(songs)
    let w=document.querySelector(".songslist")
    for(i of songs){
        console.log(i)
        let l=(i.split("/songs/punjabihits/"))[1]
        let a=(l.replaceAll("%20"," "))
        let name=a.split(".")[0]
        let html=`<div><img src="logo/music.svg" alt=""><li>${name}</li></div>
        `
        w.innerHTML=w.innerHTML+html
    }
    Array.from(document.querySelector(".songslist").getElementsByTagName("div")).forEach(e=>{
        e.addEventListener("click",()=>{
            let song=e.getElementsByTagName("li")[0].innerText
            let src="songs/punjabihits/"+song+".mp3"
            let name=song.split("-")[0]
            let artist=song.split("-")[1]
            playsong(src,name,artist)
        })
    })
    audio.addEventListener("timeupdate",()=>{
        let duration=Math.floor(audio.duration)
        let cur=Math.floor(audio.currentTime)
        sectomin(duration,cur)
        let cir=document.getElementById("circle")
        cir.style.left=(audio.currentTime/audio.duration)*100+"%"
        document.getElementById("bar").style.width=(audio.currentTime/audio.duration)*100+"%"
    })
    document.getElementById("seekbar").addEventListener("click",(e)=>{
        let point=(e.offsetX/e.currentTarget.getBoundingClientRect().width)*100
        audio.currentTime=(point/100)*audio.duration
        document.getElementById("circle").style.left=point+"%"
        document.getElementById("bar").style.width=point+"%"
    })
    previous.addEventListener("click",()=>{
        let index=0
        console.log(audio.src)
        console.log(songsUl)
        index=songsUl.indexOf(audio.src)
        console.log(index)
        let src=audio.src
        if(index>0){
            src=songsUl[index-1]
        }
        let l=(src.split("/songs/punjabihits/"))[1]
        let a=(l.replaceAll("%20"," "))
        let name=a.split(".")[0]
        let song=name.split("-")[0]
        let artist=name.split("-")[1]
        playsong(src,song,artist)
    })
    next.addEventListener("click",()=>{
        let index=0
        console.log(audio.src)
        console.log(songsUl)
        index=songsUl.indexOf(audio.src)
        console.log(index)
        let src=audio.src
        if(index< songsUl.length-1){
            src=songsUl[index+1]
        }
        let l=(src.split("/songs/punjabihits/"))[1]
        let a=(l.replaceAll("%20"," "))
        let name=a.split(".")[0]
        let song=name.split("-")[0]
        let artist=name.split("-")[1]
        playsong(src,song,artist)
    })
}
let link="https://saksham10884.github.io/songs/punjabihits.html"
writesongs(link)
