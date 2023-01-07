window.onload = function () {
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector("nav");
  console.log(lastScrollY);
  console.log(navbar);
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      navbar.classList.add("nav-hidden");
    } else {
      navbar.classList.remove("nav-hidden");
    }

    lastScrollY = window.scrollY;
  });
};
