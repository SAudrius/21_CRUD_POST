import fetchNav from "./modules/fetchNav.js";
import { postsUrl } from "./modules/config.js";
import getPageId from "./modules/urlId.js";
import { getSinglePost } from "./modules/singleFn.js";

const els = {
  bodyEl: document.querySelector("body"),
};

(async () => {
  fetchNav();
  const currentPostId = getPageId();
  if (!currentPostId) {
    console.log("noe post id");
  }
  const singlePost = await getSinglePost(postsUrl, currentPostId);
  addToSingleHtml(singlePost, currentPostId);
})();

function addToSingleHtml(dataObj, currentPostId) {
  console.log("dataObj ===", dataObj);
  const divEl = document.querySelector("#output");
  const liEls = createLiTags(dataObj.tags);
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
  createDeleteBtn(divEl, postsUrl, currentPostId);

  if (!dataObj.image) {
    img.classList.add("d-none");
    return;
  }
  img.src = dataObj.image;
  img.alt = dataObj.title;
}

function createLiTags(arr) {
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
