// script.js atualizado para sistema de estrelas e animaçõe
// Seletor das estrelas e variáveis globais
const stars = document.querySelectorAll(".star");
let selectedRating = 0;

// Função para destacar as estrelas até o rating atual
function highlightStars(rating) {
  stars.forEach((star) => {
    star.classList.toggle("selected", star.dataset.rating <= rating);
  });
}

// Evento de clique para selecionar a estrela
stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = star.dataset.rating; // Armazena o valor da avaliação
    highlightStars(selectedRating);
  });

  star.addEventListener("mouseover", () => {
    highlightStars(star.dataset.rating); // Destaca estrelas ao passar o mouse
  });

  star.addEventListener("mouseleave", () => {
    highlightStars(selectedRating); // Restaura a seleção após sair do hover
  });
});

// Navegação suave e expansão de FAQ
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle("active");
  });
});

// Envio de feedback
document
  .querySelector("#feedback form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const comment = document.getElementById("comment").value;

    if (selectedRating && comment.trim()) {
      alert("Obrigado pelo feedback!");
      document.getElementById("comment").value = "";
      highlightStars(0);
      selectedRating = 0; // Restaura a avaliação para zero após o envio
    } else {
      alert(
        "Por favor, preencha o campo de comentário e escolha uma avaliação."
      );
    }
  });

// Função para alternar o menu de navegação no mobile
function toggleMenu() {
  const nav = document.getElementById("main-nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// Animação de fade-in para seções ao rolar a página
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  const triggerBottom = (window.innerHeight / 5) * 4;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("show");
    } else {
      section.classList.remove("show");
    }
  });
});
