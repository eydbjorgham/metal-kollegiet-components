"use strict";

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const targetValue = parseFloat(element.getAttribute("data-value").replace(",", "."));
      const isDecimal = element.classList.contains("decimal-number-animation");

      // Sæt target-værdien én gang og lad CSS transition køre
      if (isDecimal) {
        element.style.setProperty("--decimal-num", targetValue);
      } else {
        element.style.setProperty("--integer-num", targetValue);
      }

      observer.unobserve(element);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const integers = document.querySelectorAll(".integer-number-animation");
  const decimals = document.querySelectorAll(".decimal-number-animation");

  integers.forEach((element) => observer.observe(element));
  decimals.forEach((element) => observer.observe(element));
});
