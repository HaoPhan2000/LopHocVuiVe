export function toastMessage(type, title, message, duration) {
  const TOAST_DURATION = duration || 3000;
  const main = document.getElementById("toast");
  if (main) {
    let setTime;
    const time = (TOAST_DURATION / 1000).toFixed(2);
    const toast = document.createElement("div");
    const icons = {
      success: "fa-solid fa-circle-check",
      error: "fa-solid fa-circle-exclamation",
      warning:"fa-solid fa-circle-exclamation"
    };
    toast.classList.add("toastMessage", `toastMessage-${type}`);
    toast.style.animation = `slideInLeft ease 0.5s, fadeOut linear 1.5s ${time}s forwards`;
    toast.innerHTML = `
        <div class="toastMessage__icon">
        <i class="${icons[type]}"></i>
      </div>
      <div class="toastMessage__body">
        <div>
          <h3 class="toastMessage__title">${title}</h3>
        </div>
        <div>
          <p class="toastMessage_msg">${message}</p>
        </div>
      </div>
      <div class="toast__close"><i class="fa-solid fa-xmark"></i></div>`;
    main.appendChild(toast);

    function autoRemoveToastMessage(time) {
      setTime = setTimeout(() => {
        main.removeChild(toast);
      }, duration + time);
    }
    autoRemoveToastMessage(2000);

    toast.onmousedown = () => {
      toast.style.animation = "";
      clearTimeout(setTime);
    };
    toast.onmouseup = () => {
      toast.style.animation = `fadeOut linear 1.5s ${time}s forwards`;
      autoRemoveToastMessage(1500);
    };
    toast.onclick = (e) => {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(setTime);
      }
    };
  }
}

