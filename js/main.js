"use strict";
console.log("main.js file was loaded");

const els = {
  postList: document.getElementById("post-list"),
};

const baseUrl = "http://localhost:5005/posts";
const postsUrl = `${baseUrl}/posts`;

// async function
