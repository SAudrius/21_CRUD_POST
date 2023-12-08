import fetchNav from "./modules/fetchNav.js";
import { postsUrl, baseUrl } from "./modules/config.js";
import { showError } from "./modules/singleFn.js";

const formEl = document.getElementById("form");
fetchNav();

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const target = e.target;
  const posts = postsUrl;
  const postObj = collectData(target);
  postData(postObj, posts);
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

async function postData(obj, postsUrl) {
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
