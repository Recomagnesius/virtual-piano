//fullscreen api
function toggleScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}

let full = document.querySelector(".fullscreen");
if (full) {
  full.addEventListener("click", toggleScreen);
}

//проигрывание звука и добавление класса
window.addEventListener("keydown", function (e) {
  let repeat = e.repeat;
  const audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
  const key = document.querySelector(
    `.piano-key[data-letter='${lastKey(e.code)}']`
  );
  if (!audio) return;
  key.classList.add("piano-key-active");
  key.classList.add("piano-key-active-pseudo");
  if (!repeat) {
    audio.currentTime = 0;
    audio.play();
  }
  //убирание класса неактивной клавиши
  window.addEventListener("keyup", function (e) {
    key.classList.remove("piano-key-active");
    key.classList.remove("piano-key-active-pseudo");
  });
});

function lastKey(key) {
  key.split("");
  let result = key[key.length - 1];
  result = result.toUpperCase();
  return result;
}

//проигрывание звука мышкой
const COLLECTION = document.querySelectorAll(".piano-key");
const PIANO = document.querySelector(".piano");

const startSound = (event) => {
  event.target.classList.add("piano-key-active");
  event.target.classList.add("piano-key-active-pseudo");

  let repeat = event.repeat;
  const audio = document.querySelector(
    `audio[data-note='${event.target.dataset.note}']`
  );
  if (!audio) return;
  if (!repeat) {
    audio.currentTime = 0;
    audio.play();
  }
};

const stopSound = (event) => {
  event.target.classList.remove("piano-key-active");
  event.target.classList.remove("piano-key-active-pseudo");
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");
    event.target.classList.add("piano-key-active-pseudo");

    let repeat = event.repeat;
    const audio = document.querySelector(
      `audio[data-note='${event.target.dataset.note}']`
    );
    if (!audio) return;
    if (!repeat) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  COLLECTION.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};
const stopCorrespondOver = () => {
  COLLECTION.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.classList.remove("piano-key-active-pseudo");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

PIANO.addEventListener("mousedown", startCorrespondOver, false);
PIANO.addEventListener("mouseup", stopCorrespondOver);

//переключение notes/letter
const notes = document.querySelector(".btn-notes");
const letter = document.querySelector(".btn-letters");
const btn = document.querySelector(".btn-container");
btn.addEventListener("click", toggle);

//функция переключения

function toggle(e) {
  const keys = document.querySelectorAll(".piano-key");
  if (e.target.classList.contains("btn-active")) return;

  if (letter.classList.contains("btn-active")) {
    keys.forEach((elem) => {
      elem.classList.remove("piano-key-letter");
    });
  } else {
    keys.forEach((elem) => {
      elem.classList.add("piano-key-letter");
    });
  }
  notes.classList.toggle("btn-active");
  letter.classList.toggle("btn-active");
}
