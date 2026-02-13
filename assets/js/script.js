const toggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");

    // Cambia el ícono de hamburguesa a X
    if (mobileMenu.classList.contains("active")) {
        toggle.innerHTML = `<i class="ri-close-line"></i>`;
    } else {
        toggle.innerHTML = `<i class="ri-menu-line"></i>`;
    }
});

// LOADER 7K DIGITAL
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Espera a que termine la animación de la barra
  setTimeout(() => {
    // Abre la pantalla a la mitad
    loader.classList.add("loader--hide");

    // Luego oculta completamente el loader
    setTimeout(() => {
      loader.classList.add("loader--hidden");
    }, 900); // mismo tiempo que el transition de los paneles
  }, 2300); // un poco más que la animación de la barra (2.2s)
});


// ===== VIDEO AGENCIA 7K =====
const agencyVideo = document.getElementById("agency7kVideo");
const soundToggle = document.getElementById("agency7kSoundToggle");

if (agencyVideo && soundToggle) {
  soundToggle.addEventListener("click", () => {
    const willUnmute = agencyVideo.muted; // si está muteado, lo vamos a desmutear
    agencyVideo.muted = !agencyVideo.muted;

    // Si estaba pausado, intenta reproducirlo
    if (agencyVideo.paused) {
      agencyVideo.play().catch(() => {});
    }

    // Icono y estado visual
    if (willUnmute) {
      soundToggle.classList.add("is-active");
      soundToggle.innerHTML = '<i class="ri-volume-up-line"></i>';
    } else {
      soundToggle.classList.remove("is-active");
      soundToggle.innerHTML = '<i class="ri-volume-mute-line"></i>';
    }
  });
}


// ===== REVEAL ON SCROLL (para secciones como value7k) =====
const revealElements = document.querySelectorAll(".reveal-on-scroll");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Si no quieres que se oculte al hacer scroll hacia arriba:
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}


document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".whatsapp-float");
    btn.style.opacity = "0";
    btn.style.transform = "translateY(20px)";

    setTimeout(() => {
      btn.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0)";
    }, 400);
  });


  // Accordion 7K: abre/cierra con + y cambia a X, con animación de altura
document.addEventListener("DOMContentLoaded", () => {
  const acc = document.querySelector("[data-accordion]");
  if (!acc) return;

  const items = Array.from(acc.querySelectorAll(".services7k__item"));

  const setIcon = (btn, open) => {
    const icon = btn.querySelector(".services7k__icon i");
    if (!icon) return;
    icon.classList.toggle("ri-add-line", !open);
    icon.classList.toggle("ri-close-line", open);
  };

  const closeItem = (item) => {
    const btn = item.querySelector(".services7k__toggle");
    const panel = item.querySelector(".services7k__panel");
    if (!btn || !panel) return;

    item.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    setIcon(btn, false);
    panel.style.maxHeight = "0px";
  };

  const openItem = (item) => {
    const btn = item.querySelector(".services7k__toggle");
    const panel = item.querySelector(".services7k__panel");
    const inner = item.querySelector(".services7k__panel-inner");
    if (!btn || !panel || !inner) return;

    item.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    setIcon(btn, true);

    // altura exacta para animación suave
    panel.style.maxHeight = inner.scrollHeight + 30 + "px";
  };

  items.forEach((item) => {
    const btn = item.querySelector(".services7k__toggle");
    const panel = item.querySelector(".services7k__panel");
    const inner = item.querySelector(".services7k__panel-inner");
    if (!btn || !panel || !inner) return;

    // icon inicial
    setIcon(btn, false);
    panel.style.maxHeight = "0px";

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // Cierra los demás (comportamiento como FAQ elegante)
      items.forEach((it) => it !== item && closeItem(it));

      // Toggle actual
      if (isOpen) closeItem(item);
      else openItem(item);
    });
  });

  // Recalcular alturas si el usuario rota celular o cambia tamaño
  window.addEventListener("resize", () => {
    items.forEach((item) => {
      if (!item.classList.contains("is-open")) return;
      const panel = item.querySelector(".services7k__panel");
      const inner = item.querySelector(".services7k__panel-inner");
      if (panel && inner) panel.style.maxHeight = inner.scrollHeight + 30 + "px";
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".about7k");
  if (!root) return;

  const tabs = root.querySelectorAll(".about7k__tab");
  const panels = root.querySelectorAll(".about7k__panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });

      panels.forEach(p => p.classList.remove("is-active"));

      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      const panel = root.querySelector(`.about7k__panel[data-panel="${target}"]`);
      if (panel) panel.classList.add("is-active");
    });
  });
});
