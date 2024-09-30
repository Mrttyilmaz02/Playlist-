//*Elementlere ulaşıp obje olarak kullanma-yakalama
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

//*Sira
let index;

//*Döngü
let loop = true;

//*Liste
const songsList = [
  {
    name: "Feryad-ı İsyanım",
    link: "Assets/Mazlum Çimen - Feryad-ı İsyanım.mp3",
    artist: "MAZLUM ÇİMEN",
    image: "Assets/MAZLUM ÇİMEN.jpeg",
  },

  {
    name: "AGİR KETİYE DİLEMİN",
    link: "Assets/SASA - AGİR KETîYE DİLEMİN Canlı konser performansı.mp3",
    artist: "SASA",
    image: "Assets/SASA.jpeg",
  },

  {
    name: "Sevemedim Karagözlüm",
    link: "Assets/Eda Tat - Sevemedim karagözlüm.mp3",
    artist: "EDA TAT",
    image: "Assets/EDA TAT.jpeg",
  },

  {
    name: "Yadımda Sen",
    link: "Assets/Nurettin Rençber - Yadımda Sen.mp3",
    artist: "NURETTİN RENÇBER",
    image: "Assets/NURETTİN RENÇBER.jpeg",
  },

  {
    name: "Herkes Kendi İşine",
    link: "Assets/Herkes Kendi İşine Ahmet Kaya.mp3",
    artist: "AHMET KAYA",
    image: "Assets/AHMET KAYA.jpeg",
  },
];

//* şarki atama

const setSong = (arrayIndex) => {
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  //*Sureyi ayarla
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  playAudio();
};

//*Zamani istenilen formatta düzenleme

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60); // 3,25
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60); // 25
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//*Şarkiyi Çal

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//* Şarkiyi Durdur

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//*Sonraki şarkıya git

const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1; // index = index + 1
    }
  } else {
    //*Rastgele sira olustur
    let randIndex = Math.floor(Math.random() * songsList.length);
    index = randIndex;
  }
  setSong(index);
  playAudio();
};

//*Önceki şarkıya geçme

const previousSong = () => {
  pauseAudio();
  if (index > 0) {
    index -= 1; // index = index - 1
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

//*Play butonuna tiklanildiğinda
playButton.addEventListener("click", playAudio);

//*Durdur butonuna  tiklanildiğinda
pauseButton.addEventListener("click", pauseAudio);

//*Sonraki şarkıya geç butonuna tıklanildiğinda
nextButton.addEventListener("click", nextSong);

//*Önceki şarkıya geç butonuna tıklanildiğinda
prevButton.addEventListener("click", previousSong);

//* Karistirma butonuna tiklanildiğinda
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});

//*Tekrar et butonuna tiklanildiğinda
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
  } else {
    repeatButton.classList.add("active");
    loop = true;
  }
});

//*Progres bara tiklanildiginda (gri alan)
progressBar.addEventListener("click", (event) => {
  //baslangic / sol
  let coordStart = progressBar.getBoundingClientRect().left;

  console.log("coordStart: " + coordStart);

  //*bitis
  let coordEnd = event.clientX;
  console.log("coordEnd: " + coordEnd);

  console.log("progressBar.offsetWidth: " + progressBar.offsetWidth);

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  console.log("progress: " + progress);
  currentProgress.style.width = progress * 100 + "%";

  //*zamani guncelle
  audio.currentTime = progress * audio.duration;

  //*oynat
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

//*liste acma butona tikladiginda
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//*oynatma listesi kapatildiginda
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//*ekran yükleme
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

//*zaman guncellendiginde
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//*sonraki sarki
audio.onended = () => {
  nextSong();
};

//*oynatma listesini olustur

const initializePlaylist = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `;
  }
};

//*ekran yuklendiginde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlaylist();
};