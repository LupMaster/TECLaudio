const output = document.getElementById("output");
let voices = [];
let selectedVoice = null;

function loadVoices() {
  voices = speechSynthesis.getVoices();

  selectedVoice = voices.find(v =>
    v.name.includes("Microsoft Maria") && v.lang === "pt-BR"
  );

  // fallback (caso não encontre)
  if (!selectedVoice) {
    selectedVoice = voices.find(v => v.lang === "pt-BR");
  }

  console.log("Voz selecionada:", selectedVoice);
}

speechSynthesis.onvoiceschanged = loadVoices;
// chama uma vez também
loadVoices();

let speaking = false;

function speak(text) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.voice = selectedVoice;

  utterance.rate = 1.3;   // mais rápido
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => speaking = true;
  utterance.onend = () => speaking = false;

  // Pequeno delay evita bugs do Chrome
  setTimeout(() => {
    speechSynthesis.speak(utterance);
  }, 10);
}

function formatKey(key) {
  const map = {
    "ContextMenu": "menu",
    "Meta": "windows",
    " ": "espaço",
    "ArrowUp": "seta para cima",
    "ArrowDown": "seta para baixo",
    "ArrowLeft": "seta para esquerda",
    "ArrowRight": "seta para direita",
    "Shift": "shift",
    "Control": "control",
    "Alt": "alt",
    "Enter": "enter",
    "Backspace": "backspace"
  };

  return map[key] || key;
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  const code = event.code;
  const key = event.key;

  document.getElementById("output").textContent = `Tecla: ${key}`;

  speak(formatKey(event.key));

  document.querySelectorAll(".key").forEach(k => {
    k.classList.remove("active");

    if (k.dataset.code === code) {
      k.classList.add("active");

      setTimeout(() => {
        k.classList.remove("active");
      }, 200);
    }
  });
});
