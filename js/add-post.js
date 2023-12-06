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
    if (!response.ok) {
      throw new Error(
        `Somethink went wrong ${response.status},${response.message}`
      );
    }
    const data = await response.json();
  } catch (err) {
    console.warn(err);
  }
}
