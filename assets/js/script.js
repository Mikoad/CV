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

seeMore.forEach((seeM) => {
  seeM.addEventListener("mouseenter", () => {
    seeM.classList.add("hover-button");
  });
  seeM.addEventListener("mouseleave", () => {
    seeM.classList.remove("hover-button");
  });
});
