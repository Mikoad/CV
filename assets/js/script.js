// const projects = document.querySelectorAll(".project");

// projects.forEach((project) => {
//   const image = project.querySelector("img");
//   const projectDescription = project.querySelector(".project-description");

//   image.addEventListener("mouseenter", () => {
//     image.style.filter = "brightness(30%)";
//     projectDescription.style.display = "block";
//   });

//   project.addEventListener("mouseleave", () => {
//     image.style.filter = "brightness(90%)";
//     projectDescription.style.display = "none";
//   });
// });

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

// seeMore.forEach((seeM) => {
//   seeM.addEventListener("mouseenter", () => {
//     seeM.classList.add("hover-button");
//   });
//   seeM.addEventListener("mouseleave", () => {
//     seeM.classList.remove("hover-button");
//   });
// });
// faire en sorte qu'au scroll Y, mon nom + les contact disparaissent et la nav devienne bg blanc

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 125) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }
});

//nav smooth scroll
// const navLinks = document.querySelectorAll(".nav-link");

// navLinks.forEach((link) => {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const targetId = this.getAttribute("href").substring(1);
//     const targetElement = document.getElementById(targetId);
//     window.scrollTo({
//       top: targetElement.offsetTop,
//       behavior: "smooth",
//     });
//   });
// });

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
      errorDisplay(
        "message",
        "Le message ne doit pas être vide ou contenir uniquement des balises HTML.",
        false
      );
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
