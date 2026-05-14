const output = document.getElementById("output");

let speaking = false;

function speak(text) {
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";

  utterance.onstart = () => speaking = true;
  utterance.onend = () => speaking = false;

  // Pequeno delay evita bugs do Chrome
  setTimeout(() => {
    speechSynthesis.speak(utterance);
  }, 10);
}

function formatKey(key) {
  const map = {
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
