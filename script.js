const output = document.getElementById("output");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  speechSynthesis.speak(utterance);
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  const code = event.code;
  const key = event.key;

  document.getElementById("output").textContent = `Tecla: ${key}`;

  speak(key);

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
