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

init();
async function init() {
  const singlePost = await getSinglePost(postsUrl, currentPostId);
  addToSingleHtml(singlePost);
}

function addToSingleHtml(dataObj) {
  console.log("dataObj ===", dataObj);
  const divEl = document.querySelector("#output");
  const liEls = createLiTags(dataObj.tags);
  console.log("liEls ===", liEls);
  const img = divEl.querySelector("#img");
  const title = divEl.querySelector("#title");
  const author = divEl.querySelector("#author");
  const date = divEl.querySelector("#date");
  const body = divEl.querySelector("#body");
  const tagsUl = divEl.querySelector("#tags");
  const editLink = divEl.querySelector("#editPostLink");
  title.textContent = dataObj.title;
  author.textContent = dataObj.author;
  date.textContent = dataObj.date;
  body.textContent = dataObj.body;
  tagsUl.innerHTML = liEls;
  editLink.href = `edit-post.html?id=${dataObj.id}`;
  console.log("dataObj.image  ===", dataObj.image);
  createDeleteBtn(divEl, postsUrl, currentPostId);

  if (!dataObj.image) {
    console.log("no image");
    img.classList.add("d-none");
    return;
  }
  img.src = dataObj.image;
  img.alt = dataObj.title;
}

function createLiTags(arr) {
  console.log("arr ===", arr);
  const arrLiEl = arr.map((arrTags) => {
    return `<li class="badge rounded-pill text-bg-primary fs-5">${arrTags}</li>`;
  });
  return arrLiEl.join("");
}

function createDeleteBtn(html, url, currentPostId) {
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
