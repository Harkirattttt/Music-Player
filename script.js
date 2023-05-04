var selector = document.querySelector('.libraryBtn');
var library = document.querySelector('.library');
let audioEle = new Audio('songs/superman.mp3');
let navbar = document.querySelector('.navbar');
let container = document.querySelector('.container');
let currentSong=0;
var songPlay = false;
let nCurrentTime;
let newClick=false;
let coverImg = document.querySelector('.coverImg');
var libraryItem=document.getElementsByClassName('libraryItem');
let playBtn = document.getElementById("playBtn");
var myProgressBar=document.getElementById("myProgressBar");
var songInfo=document.querySelector('.songInfo');
var previous = document.getElementById('previous');
var next = document.getElementById('next');
var bgcontainer=document.querySelector('.bg-container');

let songs = [
    {songName: 'Superman', filePath: 'songs/superman.mp3', coverPath: 'images/superman.jpg', artist:'Eminem', color:'white', navcol:'white',duration:350.354286},
    {songName: 'August', filePath: 'songs/August.mp3', coverPath: 'images/august.jpg', artist:'Taylor Swift', color:'black', navcol:'black',duration:263.936688},
    {songName: 'Without Me', filePath: 'songs/withoutme.mp3', coverPath: 'images/superman.jpg', artist: 'Eminem', color:'white', navcol:'white',duration:290.487},   
    {songName: 'We Rollin', filePath: 'songs/werollin.mp3', coverPath: 'images/werollin.jpg', artist:'SHUBH', color:'white', navcol:'white',duration:199.284738},
    {songName: 'Uska Hi Banana', filePath: 'songs/uskahi.mp3', coverPath: 'images/uskahi.jpg', artist:"Arijit Singh", color:'white', navcol:'white',duration:327.099684},
    {songName: 'The Box', filePath: 'songs/thebox.mp3', coverPath: 'images/thebox.jpeg', artist:"Roddy Ricch",color:'white', navcol:'black',duration:197.299466},
    {songName: 'Lalala', filePath: 'songs/lalala.mp3', coverPath: 'images/lalala.png', artist:"Y2K, bbno$",color:'white', navcol:'black',duration:162.24}
]

for (i in songs)
{
    library.innerHTML+=`
    <li>
    <div class="libraryItem">
    <img class="libImgs" src="${songs[i].coverPath}" alt="">
    <div class="libraryText">
    <p><b>${songs[i].songName}</b></p>
    <p>${songs[i].artist}</p>
    </div>
    </div>
    </li>
    `
    audioEle.src=`${songs[6].filePath}`
    $(audioEle).on("loadedmetadata",()=>{
        console.log(audioEle.duration)
    })
}

libraryItem[0].classList.toggle('itemClicked')

Array.from(libraryItem).forEach((element,i)=>{
    element.addEventListener('click',()=>{
        songInfo.innerHTML=
        `
        <img class="coverImg" src="${songs[i].coverPath}">
        <br><br>
        <p style="font-size: 20px;"><b>${songs[i].songName}</b></p><br>
        <p>${songs[i].artist}</p><br>
        `
        for(j=0;j<libraryItem.length;j++)
        {
            libraryItem[j].classList.remove('itemClicked')
        }
        element.classList.toggle('itemClicked')
        navbar.style.color = songs[i].navcol;
        container.style.color = songs[i].color
        currentSong=i;
        bgcontainer.style.backgroundImage= `url(${songs[i].coverPath})`
        newClick=true;
        audioEle.pause();
        audioEle.src=`${songs[currentSong].filePath}`;
        audioEle.currentTime='0';
        myProgressBar.value=0;
        if(songPlay==true)
        {
            playBtn.classList.remove('fa-circle-pause');
            playBtn.classList.add('fa-circle-play');
            songPlay=false;
        }  
    })
})

next.addEventListener('click',()=>{
    if(currentSong!=libraryItem.length-1)
    {
        currentSong++;
    }
    else{
        currentSong=0;
    }
    songInfo.innerHTML=
    `
    <img class="coverImg" src="${songs[currentSong].coverPath}">
    <br><br>
    <p style="font-size: 20px;"><b>${songs[currentSong].songName}</b></p><br>
    <p>${songs[currentSong].artist}</p><br>
    `
    newClick=true;
    audioEle.pause();
    audioEle.src=`${songs[currentSong].filePath}`;
    audioEle.currentTime='0';
    myProgressBar.value=0;
    if(songPlay==true)
    {
        playBtn.classList.remove('fa-circle-pause');
        playBtn.classList.add('fa-circle-play');
        songPlay=false;
    }  
    for(j=0;j<libraryItem.length;j++)
        {
            libraryItem[j].classList.remove('itemClicked')
        }
    libraryItem[currentSong].classList.toggle('itemClicked')
    bgcontainer.style.backgroundImage= `url(${songs[currentSong].coverPath})`
    navbar.style.color = songs[currentSong].navcol;
    container.style.color = songs[currentSong].color
})

previous.addEventListener('click',()=>{
    if(currentSong!=0)
    {
        currentSong--;
    }
    else{
        currentSong=libraryItem.length-1;
    }
    songInfo.innerHTML=
    `
    <img class="coverImg" src="${songs[currentSong].coverPath}">
    <br><br>
    <p style="font-size: 20px;"><b>${songs[currentSong].songName}</b></p><br>
    <p>${songs[currentSong].artist}</p><br>
    `
    newClick=true;
    audioEle.pause();
    audioEle.src=`${songs[currentSong].filePath}`;
    audioEle.currentTime=0;
    myProgressBar.value=0;
    if(songPlay==true)
    {
        playBtn.classList.remove('fa-circle-pause');
        playBtn.classList.add('fa-circle-play');
        songPlay=false;
    }  
    for(j=0;j<libraryItem.length;j++)
        {
            libraryItem[j].classList.remove('itemClicked')
        }
    libraryItem[currentSong].classList.toggle('itemClicked')
    bgcontainer.style.backgroundImage= `url(${songs[currentSong].coverPath})`
    navbar.style.color = songs[currentSong].navcol;
    container.style.color = songs[currentSong].color
})

selector.addEventListener('click',()=>{
    library.classList.toggle('showmenu')
    navbar.classList.toggle('navbarHalf')
    selector.classList.toggle('libraryBtnClicked')
    container.classList.toggle('containerHalf')
})

playBtn.addEventListener('click',()=>{
    audioEle.src=`${songs[currentSong].filePath}`;
    nCurrentTime=myProgressBar.value;
    if(songPlay==false)
    {
        $(audioEle).on("loadedmetadata",()=>{
            audioEle.currentTime = parseInt((nCurrentTime*audioEle.duration))/100;
        })
        audioEle.play();
        songPlay=true;
    }
    else{
        audioEle.pause();
        songPlay=false;
    }
})


audioEle.addEventListener('timeupdate',()=>{
    setTimeout(() => {
        progress = parseInt((audioEle.currentTime/audioEle.duration)*100);
        myProgressBar.value = progress;
    }, 110);
    if(songPlay==false)
    {
        playBtn.classList.remove('fa-circle-pause')
        playBtn.classList.add('fa-circle-play')
        myProgressBar.value=nCurrentTime;
    }
    else{
        playBtn.classList.remove('fa-circle-play')
        playBtn.classList.add('fa-circle-pause')
    }

})

myProgressBar.addEventListener('change',()=>{
        audioEle.currentTime = parseInt((myProgressBar.value*audioEle.duration))/100;
})

// document.addEventListener('keydown',(e)=>{
//     if(e.key == " " || e.code == "Space")
//     {
//         playBtn.click()
//     }
// })