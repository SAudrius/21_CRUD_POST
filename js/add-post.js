"use strict";
console.log("form.js file was loaded");

const formEl = document.getElementById("form");
const baseUrl = "http://localhost:5005";
const postsUrl = `${baseUrl}/posts`;

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = e.target;
  const postObj = collectData(target);
  postData(postObj);
});

function collectData(tar) {
  const title = tar.title.value;
  const body = tar.body.value;
  const author = tar.author.value;
  const imageUrl = tar.image.value;
  const tags = tar.tags.value;
  const tagsList = tags.split(/\s*,\s*/).filter(Boolean);
  const date = new Date();
  const isoDate = date.toISOString().slice(0, 10);
  const postObj = {
    image: imageUrl,
    title: title,
    body: body,
    author: author,
    tags: tagsList,
    date: isoDate,
  };
  return postObj;
}

async function postData(obj) {
  try {
    const response = await fetch(postsUrl, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    console.log("response ===", response);
    if (response.ok) {
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 500);
      return;
    }
    const data = await response.json();
    console.log("data ===", data);
    showError(data.error);
  } catch (err) {
    console.warn(err);
  }
}

function showError(dataArr) {
  const ul = document.querySelector("#error-div");
  ul.innerHTML = "";
  const liArr = dataArr.map((obj) => {
    const liEl = document.createElement("li");
    console.log("obj.error ===", obj.message);
    liEl.textContent = obj.message;
    return liEl;
  });
  ul.append(...liArr);
}
