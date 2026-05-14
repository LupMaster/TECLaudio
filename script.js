const output = document.getElementById("output");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  speechSynthesis.speak(utterance);
}

document.addEventListener("keydown", (event) => {
  event.preventDefault();

  let key = event.key.toLowerCase();

  output.textContent = `Tecla: ${event.key}`;

  // Fala
  speak(event.key);

  // Destacar tecla
  const keys = document.querySelectorAll(".key");

  keys.forEach(k => {
    k.classList.remove("active");

    if (k.dataset.key.toLowerCase() === key) {
      k.classList.add("active");

      setTimeout(() => {
        k.classList.remove("active");
      }, 200);
    }
  });
});
