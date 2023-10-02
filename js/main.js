// ===== Main Progress Bar
const mainProgress = document.querySelector("#main-progress-bar");

window.addEventListener("scroll", (e) => {
  let maxScrollHeight = document.body.scrollHeight - innerHeight;
  mainProgress.style.width = `${(scrollY / maxScrollHeight) * 100}%`;
});

// ======= PRELOADER
const loader = document.querySelector(".preloader"),
  loaderProgress = loader.querySelector(".preloader .progress"),
  progressValue = loaderProgress.querySelector(".progress-value");

let progressStartVal = 0,
  progressEndVal = 100,
  speed = 50;

const loading = setInterval(() => {
  progressStartVal++;
  loaderProgress.style.background = `conic-gradient(#6610f2 ${
    3.6 * progressStartVal
  }deg, #fff 0deg)`;
  progressValue.textContent = `${progressStartVal}%`;
  if (progressStartVal === progressEndVal) {
    clearInterval(loading);
    loader.classList.add("hide");
  }
}, speed);

/// ====== FUNCTIONS
const dragSlider = (slider, controlButtons, firstItem, gap) => {
  let maxScrollWidth = slider.scrollWidth - slider.clientWidth,
    isDragStart = false,
    prevPageX,
    prevScrollLeft;

  const activeInactiveButtons = () => {
    slider.scrollLeft == 0
      ? controlButtons[0].classList.add("inactive")
      : controlButtons[0].classList.remove("inactive");

    slider.scrollLeft >= maxScrollWidth - 100
      ? controlButtons[1].classList.add("inactive")
      : controlButtons[1].classList.remove("inactive");
  };

  const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = slider.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    slider.classList.add("dragging");
    let posDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    slider.scrollLeft = prevScrollLeft - posDiff;
    activeInactiveButtons();
    setTimeout(checker, 100);
  };

  const dragStop = (e) => {
    isDragStart = false;
    slider.classList.remove("dragging");
  };
  activeInactiveButtons();

  controlButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      let firstItemWidth = firstItem.scrollWidth + gap;
      slider.scrollLeft += btn.classList.contains("left")
        ? -firstItemWidth
        : firstItemWidth;
    });
  });

  controlButtons.forEach((btn) => {
    btn.addEventListener("mouseup", () => {
      // setTimeout(() => console.log(slider.scrollLeft), 100)
      setTimeout(activeInactiveButtons, 300);
    });
  });

  slider.addEventListener("mousedown", dragStart);
  slider.addEventListener("touchstart", dragStart);

  slider.addEventListener("pointermove", dragging);
  slider.addEventListener("touchmove", dragging);

  slider.addEventListener("pointerup", dragStop);
  slider.addEventListener("pointerleave", dragStop);
  slider.addEventListener("touchend", dragStop);
};

// ====== HEADER
const header = document.querySelector(".header");
// Shrink Bottom Header
window.addEventListener("scroll", () =>
  scrollY > 50
    ? header.classList.add("shrink")
    : header.classList.remove("shrink")
);
// Show Search Field
const searchIcon = header.querySelector(".search-icon");

searchIcon.addEventListener("click", () => {
  header.classList.toggle("show-search");
  if (header.classList.contains("show-search")) {
    searchIcon.classList.replace("bx-search", "bx-x");
  } else {
    searchIcon.classList.replace("bx-x", "bx-search");
  }
});

// Blog Slider
const blogProgressBar = header.querySelector("#blog-progress"),
  blogSlider = header.querySelector(".blogs"),
  firstBlog = blogSlider.querySelectorAll(".blog-box")[0],
  controlButtons = header.querySelectorAll(".blog .control-btn");

dragSlider(blogSlider, controlButtons, firstBlog, 16);

blogSlider.addEventListener("scroll", () => {
  let maxBlogScroll = blogSlider.scrollWidth - blogSlider.clientWidth;
  blogProgressBar.style.width = `${
    (blogSlider.scrollLeft / maxBlogScroll) * 100
  }%`;
});
// Open / Close Sidebar Menu

const sideMenu = document.querySelector(".navbar"),
  openMenuBtn = document.querySelector(".open-btn"),
  closeMenuBtn = document.querySelector(".close-btn");

openMenuBtn.addEventListener("click", () => {
  sideMenu.classList.add("show");
});

closeMenuBtn.addEventListener("click", () => {
  sideMenu.classList.remove("show");
});

// Show / Hide Submenus
const menuArrows = sideMenu.querySelectorAll(".menu-arrow"),
  subMenuArrows = sideMenu.querySelectorAll(".submenu-arrow");

menuArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => arrow.classList.toggle("show1"));
});

subMenuArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => arrow.classList.toggle("show2"));
});

// ====== LANDING
// Events Slider
const eventSlider = document.querySelector(".landing-events .events-slider"),
  firstEvent = eventSlider.querySelectorAll("img")[0],
  controlEventButtons = document.querySelectorAll(
    ".landing-events .control-btn"
  );
dragSlider(eventSlider, controlEventButtons, firstEvent, 16);

// ====== ABOUT
const socialIconsList = document.querySelector(".about .social-icons"),
  socialBtn = socialIconsList.querySelector(".social-btn");

socialBtn.addEventListener("click", () => {
  socialIconsList.classList.toggle("show-icons");
  socialBtn.classList.toggle("close-btn");

  socialBtn.querySelector("i").className = socialIconsList.classList.contains(
    "show-icons"
  )
    ? `bx bx-x`
    : `bx bx-group`;
});

// ======= STATS
const statSection = document.querySelector(".stats"),
  statCounters = statSection.querySelectorAll(".card .nb");

let countStart = false, // Is Count Start? No
  interValid;

const startCount = (counter) => {
  let goal = counter.dataset.goal;
  interValid = setInterval(() => {
    counter.textContent == goal
      ? clearInterval(interValid)
      : counter.textContent++;
  }, 2000 / goal);
};

window.addEventListener("scroll", () => {
  if (scrollY > statSection.offsetTop - 200 && !countStart) {
    statCounters.forEach((counter) => startCount(counter));
    countStart = true;
  }
});

// ====== GALLERY
const lightbox = document.querySelector(".gallery .lightbox"),
  galleryItems = document.querySelectorAll(".gallery .items .item"),
  closeLightboxBtn = lightbox.querySelector(".close-btn");

galleryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    lightbox.querySelector(".img-preview img").src =
      item.querySelector("img").src;
    lightbox.classList.add("show");
  });
});

closeLightboxBtn.addEventListener("click", () =>
  lightbox.classList.remove("show")
);

// ===== TOP BUTTON
const topBtn = document.querySelector(".top-btn");

window.addEventListener("scroll", () =>
  scrollY > 100 ? topBtn.classList.add("show") : topBtn.classList.remove("show")
);
topBtn.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
);
