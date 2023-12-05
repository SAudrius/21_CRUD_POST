"use strict";
console.log("main.js file was loaded");

const els = {
  postList: document.getElementById("post-list"),
};

const baseUrl = "http://localhost:5005";
const postsUrl = `${baseUrl}/posts`;

init();
async function init() {
  const postData = await getAllPost();
  const firstPost = postData[2];
  //   generateHtml(firstPost);
  generateHtml(postData);
}

async function getAllPost() {
  try {
    const result = await fetch(postsUrl);
    const data = await result.json();
    return data;
    // console.log(data);
  } catch (err) {
    console.warn(err);
    console.warn(err.message);
  }
}

function generateHtml(postsArr) {
  console.log("postsArr ===", postsArr);
  const postElArr = postsArr.map((postObj) => {
    const htmlPosts = makeSinglePost(postObj);
    return htmlPosts;
  });
  els.postList.append(...postElArr);
}

function makeSinglePost(singlePostObj) {
  const liEl = document.createElement("li");
  const id = singlePostObj.id;
  liEl.innerHTML = `
      <div class="card">
        <div class="card-body ">
          <h5 class="card-title">Post: ${singlePostObj.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">
            Post author: ${singlePostObj.author}
          </h6>

          <p class="card-text">
            ${singlePostObj.body.slice(0, 75)}
          </p>
          <a href="/single.html" class="btn btn-primary">
            Go somewhere
          </a>
          <button type='button' class='btn btn-outline-danger'>Delete</button>
          </div>
        </div>`;

  const delBtn = liEl.querySelector("button");
  delBtn.addEventListener("click", () => {
    sentDeleteFetch(id);
    const grandGrandParent = delBtn.parentElement.parentElement.parentElement;
    grandGrandParent.parentNode.removeChild(grandGrandParent);
  });
  return liEl;
}

async function sentDeleteFetch(idToDelete) {
  const delUrl = `${postsUrl}/${idToDelete}`;
  console.log("idToDlete ===", idToDelete);
  try {
    const result = await fetch(delUrl, {
      method: "DELETE",
    });
    if (result.status === 200) {
      console.log("pavyko");
    } else {
      console.log("nepavyko");
    }
    console.log("data ===", result);
  } catch (err) {
    console.log("err ===", err);
  }
}
