"use strict";
console.log("single.js file was loaded");

const els = {
  bodyEl: document.querySelector("body"),
};
// get url id
const queryString = window.location.search;
console.log("queryString ===", queryString);
const urlParams = new URLSearchParams(queryString);
console.log("urlParams ===", urlParams);
const currentPostId = urlParams.get("id");
console.log("currentPostId ===", currentPostId);

if (!currentPostId) {
  console.log("noe post id");
}

const baseUrl = "http://localhost:5005";
const postsUrl = `${baseUrl}/posts`;

init();
async function init() {
  const singlePost = await getSinglePost(postsUrl, currentPostId);
  addToSingleHtml(singlePost);
}

async function getSinglePost(url, userId) {
  try {
    const response = await fetch(`${url}/${userId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

function addToSingleHtml(dataObj) {
  const divEl = document.querySelector("#output");
  const liEls = createLiTags(dataObj.tags);
  divEl.innerHTML = `
    <img class="img-fluid" src="${dataObj.image}" alt="">
    <h1>${dataObj.title}</h1>
    <p class="lead">Author: ${dataObj.author}</p>
    <p class="fs2">Date: ${dataObj.date}</p>
    <p class="fs2">${dataObj.body}</p>
    <ul class="unlisted">
      ${liEls}
    </ul>
    <button class="btn btn-danger">Delete</button>
    <a href="/index.html" class="btn btn-secondary">go back</a>`;
  createDelete(divEl, postsUrl, currentPostId);
}

function createLiTags(arr) {
  const arrLiEl = arr.map((arrTags) => {
    return `<li class="badge rounded-pill text-bg-primary fs-5">${arrTags}</li>`;
  });
  return arrLiEl.join("");
}

function createDelete(html, url, currentPostId) {
  const delBtn = html.querySelector("button");
  delBtn.addEventListener("click", () => {
    fetch(`${url}/${currentPostId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong with the delete request");
        }
        setTimeout(() => {
          window.location.href = "/index.html";
        }, 500);
      })
      .catch((err) => console.warn(err));
  });
}
