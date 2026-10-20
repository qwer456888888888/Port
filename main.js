(() => {
  "use strict";

  // Мобильная навигация
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 800px)").matches) closeMenu();
    });
  }

  // Фильтрация учебных проектов
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");
  const emptyState = document.querySelector("#empty-state");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.hidden = !show;
        if (show) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });

  // Копирование адреса-заглушки (замени на свой в index.html)
  const copyButton = document.querySelector(".copy-email");
  const copyFeedback = document.querySelector("#copy-feedback");

  if (copyButton && copyFeedback) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.copy;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const temporaryInput = document.createElement("textarea");
          temporaryInput.value = email;
          temporaryInput.setAttribute("readonly", "");
          temporaryInput.style.position = "absolute";
          temporaryInput.style.left = "-9999px";
          document.body.appendChild(temporaryInput);
          temporaryInput.select();
          const copied = document.execCommand("copy");
          temporaryInput.remove();
          if (!copied) throw new Error("Копирование недоступно");
        }
        copyFeedback.textContent = `Скопировано: ${email}`;
      } catch (error) {
        copyFeedback.textContent = `Добавь свой адрес вручную: ${email}`;
      }
    });
  }
})();
