document.addEventListener("DOMContentLoaded", () => {
  const totalSeconds = 15;
  let remaining = totalSeconds;

  const elSeconds = document.getElementById("thanksSeconds");
  const elBar = document.getElementById("thanksProgress");

  const updateUI = () => {
    if (elSeconds) elSeconds.textContent = String(remaining);
    const progress = ((totalSeconds - remaining) / totalSeconds) * 100;
    if (elBar) elBar.style.width = `${progress}%`;
  };

  updateUI();

  const timer = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(timer);
      if (elSeconds) elSeconds.textContent = "0";
      if (elBar) elBar.style.width = "100%";
      window.location.href = "index.html";
      return;
    }
    updateUI();
  }, 1000);
});
