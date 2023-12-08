"use strict";
console.log("edit-post.js file was loaded");
const form = document.getElementById("form");
const els = {
  id: document.getElementById("id"),
  image: document.getElementById("postImage"),
  title: document.getElementById("postTitle"),
  body: document.getElementById("postBody"),
  author: document.getElementById("postAuthor"),
  tags: document.getElementById("postTags"),
  date: document.getElementById("date"),
};

init();
async function init() {
  const userId = getPageId();
  const postObj = await getSinglePost(postsUrl, userId);
  addToHtml(postObj);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userId = getPageId();
  const newObj = eventCreateDataObj();
  putData(userId, newObj);
});

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

function addToHtml(dataObj) {
  const date = new Date();
  const isoDate = date.toISOString().slice(0, 10);
  els.image.value = dataObj.image;
  els.title.value = dataObj.title;
  els.body.value = dataObj.body;
  els.author.value = dataObj.author;
  els.tags.value = dataObj.tags;
  els.date = isoDate;
  return els;
}

function eventCreateDataObj() {
  const date = new Date();
  const isoDate = date.toISOString().slice(0, 10);
  const tags = els.tags.value;
  const tagsList = tags.split(/\s*,\s*/).filter(Boolean);
  const newObj = {
    image: els.image.value,
    title: els.title.value,
    body: els.body.value,
    author: els.author.value,
    tags: tagsList,
    date: isoDate,
  };
  return newObj;
}

function putData(userId, dataObj) {
  fetch(`${postsUrl}/${userId}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dataObj),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }
      console.log(res);
      setTimeout(() => {
        window.location.href = `/single.html?id=${userId}`;
      }, 500);
    })
    .then((data) => {
      showError(data.error);
    })
    .catch((err) => console.warn(err));
}

function showError(dataArr) {
  const ul = document.querySelector("#error-div");
  ul.innerHTML = "";
  const liArr = dataArr.map((obj) => {
    const liEl = document.createElement("li");
    liEl.textContent = obj.message;
    return liEl;
  });
  ul.append(...liArr);
}
