const projects = document.querySelectorAll(".project");

projects.forEach((project) => {
  const image = project.querySelector("img");
  const projectDescription = project.querySelector(".project-description");

  image.addEventListener("mouseenter", () => {
    image.style.filter = "brightness(20%)";
    projectDescription.style.display = "block";
  });
  project.addEventListener("mouseleave", () => {
    image.style.filter = "brightness(90%)";
    projectDescription.style.display = "none";
  });
});

const seeMore = document.querySelectorAll(".seemore");

//navbar scrolled
//animation display from left

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const devSkills = document.querySelector(".devSkills");
  const toolSkills = document.querySelector(".toolSkills");
  const scrollY = window.scrollY;
  if (scrollY > 270) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

//form

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-contact");
  const inputs = document.querySelectorAll("input[type='text'], textarea");

  let email, textarea;

  const errorDisplay = (tag, message, valid) => {
    const container = document.querySelector("." + tag + "-container");
    const span = container.querySelector("span");

    if (!valid) {
      container.classList.add("error");
      span.textContent = message;
    } else {
      container.classList.remove("error");
      span.textContent = "";
    }
  };

  const emailChecker = (value) => {
    if (value.length <= 6) {
      errorDisplay("email", "Veuillez entrer votre adresse email.", false);
    } else if (!value.match(/^[\w._-]+@[\w-]+\.[a-z]{2,5}$/i)) {
      errorDisplay("email", "Le format du mail n'est pas correct.", false);
      email = null;
    } else {
      errorDisplay("email", "", true);
      email = value;
    }
  };

  const messageChecker = (value) => {
    const sanitizedValue = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (sanitizedValue.trim() === "") {
      errorDisplay("message", "Veuillez remplir ce champ.", false);
      textarea = null;
    } else {
      errorDisplay("message", "", true);
      textarea = sanitizedValue;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "email":
          emailChecker(e.target.value);
          break;
        case "message":
          messageChecker(e.target.value);
          break;
        default:
          break;
      }
    });
  });

  form.addEventListener("submit", (e) => {
    const submitButton = document.querySelector("input[type='submit']");
    e.preventDefault();
    if (email && textarea) {
      const data = {
        email,
        textarea,
      };
      fetch("https://hook.eu2.make.com/fzhbzfcscem4ksj6n2anj6htmm4owffd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      submitButton.value = "Message envoyé";
      submitButton.style.background = "green";
      submitButton.style.scale = "1";
      setTimeout(() => {
        submitButton.value = "Envoyer";
        submitButton.style.background = "var(--blue)";
        submitButton.style.scale = "";
      }, 1300);
      inputs.forEach((input) => {
        input.value = "";
      });
      email = null;
      textarea = null;
    }
  });
});

//test popup
document.addEventListener("DOMContentLoaded", () => {
  // Sélecteurs
  const icons = document.querySelectorAll(".icons-skills .icon");
  const popup = document.getElementById("popup");
  const popupTitle = document.getElementById("popup-title");
  const popupDescription = document.getElementById("popup-description");
  const popupClose = document.getElementById("popup-close");

  if (!popup || !popupTitle || !popupDescription) {
    console.error(
      "Le popup ou ses éléments (#popup, #popup-title, #popup-description) sont introuvables."
    );
    return;
  }

  // Données tech
  const techInfo = {
    reactjs: {
      title: "React.js",
      description:
        "Bibliothèque JavaScript pour créer des interfaces utilisateur dynamiques et réactives.",
    },
    nodejs: {
      title: "Node.js",
      description: "Environnement d’exécution JavaScript côté serveur.",
    },
    express: {
      title: "Express.js",
      description: "Framework minimaliste pour Node.js.",
    },
    elasticsearch: {
      title: "Elasticsearch",
      description: "Moteur de recherche et d'analyse distribué.",
    },
    mongodb: {
      title: "MongoDB",
      description: "Base de données NoSQL orientée documents.",
    },
    mysql: {
      title: "MySQL",
      description: "Système de gestion de base de données relationnelle.",
    },
    sequelize: {
      title: "Sequelize",
      description: "ORM pour Node.js qui facilite la gestion des bases SQL.",
    },
    n8n: {
      title: "n8n",
      description: "Outil d'automatisation de flux de travail, open source.",
    },
    vite: {
      title: "Vite",
      description: "Outil de build ultra-rapide pour projets JS.",
    },
    vscode: {
      title: "VS Code",
      description:
        "Visual Studio Code est un éditeur de code extensible développé par Microsoft pour Windows, Linux et macOS.",
    },
    chatgpt: {
      title: "ChatGPT",
      description:
        "IA développée par OpenAI pour générer du texte et assister.",
    },
    kibana: {
      title: "Kibana",
      description: "Outil de visualisation pour Elasticsearch.",
    },
    docker: { title: "Docker", description: "Plateforme de conteneurisation." },
    github: {
      title: "GitHub",
      description: "Plateforme de gestion de versions et collaboration.",
    },
    figma: {
      title: "Figma",
      description: "Outil de conception d'interfaces et prototypage.",
    },
    notion: {
      title: "Notion",
      description: "Application tout-en-un pour notes et gestion de projets.",
    },
  };

  // Normalisation simple (minuscules + trim + nettoyage léger)
  function normalizeTech(raw) {
    if (!raw) return "";
    let s = raw.toLowerCase().trim();
    s = s.replace(/^logo(?:\s+de)?\s+/i, "").trim(); // enlever "logo de"
    s = s.replace(/\s+/g, " ").replace(/\./g, "").replace(/-/g, "");
    return s;
  }

  // Événements click sur icônes
  icons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const img = icon.querySelector("img");
      if (!img || !img.alt) {
        console.warn("Pas d'attribut alt trouvé dans l'icône", icon);
        return;
      }
      const raw = img.alt;
      const tech = normalizeTech(raw);

      if (!tech) {
        console.warn("Valeur alt vide ou non reconnue", raw);
        return;
      }

      const info = techInfo[tech];
      if (!info) {
        console.warn(
          `Aucune info trouvée pour la techno normalisée "${tech}". Valeur brute: "${raw}"`
        );
        return;
      }

      popupTitle.textContent = info.title;
      popupDescription.textContent = info.description;
      popup.classList.add("show");
    });
  });

  popupClose.addEventListener("click", () => popup.classList.remove("show"));
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("show");
  });
});
