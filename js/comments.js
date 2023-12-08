"use strict";
console.log("comments.js file was loaded");
const commentsEl = document.getElementById("comments");
const comForm = document.getElementById("form-comments");

comForm.addEventListener("click", (e) => sentData(e));

init();

async function init() {
  const pageId = getPageId();
  const dataComments = await getCommentsData();
  toHtmlComments(pageId, dataComments);
}

function getPageId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currentPostId = urlParams.get("id");
  if (!currentPostId) {
    console.log("noe post id");
    return;
  }
  return currentPostId;
}

async function getCommentsData() {
  try {
    const res = await fetch(commentsUrl);
    const data = await res.json();
    console.log("data ===", data);
    return data;
  } catch (err) {
    console.warn(err);
  }
}

function toHtmlComments(pageId, dataArr) {
  const filteredComments = dataArr.filter((obj) => obj.postId === pageId);
  const dataEll = filteredComments.map((obj) => {
    const div = document.createElement("div");
    div.classList.add("card", "mb-3");
    div.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">${obj.authorEmail}</h5>
        <p class="card-text">
        ${obj.text}
        </p>
        <p class="card-text">
        <small class="text-body-secondary">${obj.id}</small>
        <br/>
        <button class="mt-4 btn btn-danger">Delete</button>
        </p>
    </div>`;
    createDelete(div, obj.id);
    return div;
  });
  commentsEl.append(...dataEll);
}

function createDelete(divEl, id) {
  console.log("divEl ===", divEl);
  const button = divEl.querySelector("button");
  button.addEventListener("click", () => {
    divEl.innerHTML = "";
    sentDeleteReq(id);
  });
}
async function sentDeleteReq(commentId) {
  try {
    const res = await fetch(`${commentsUrl}/${commentId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(res.status, res.message);
    }
  } catch (err) {
    console.warn(err);
  }
}

function sentData(e) {
  e.preventDefault();
  console.log("sent");
}
