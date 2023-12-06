"use strict";
console.log("fetchNav.js file was loaded");

fetch("http://127.0.0.1:5500/nav.html")
  .then((res) => res.text())
  .then((data) => {
    const bodyEl = document.querySelector("body");
    // console.log("data ===", data);
    bodyEl.insertAdjacentHTML("afterbegin", data);
  });
