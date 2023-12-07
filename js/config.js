const baseUrl = "http://localhost:5005";
const postsUrl = `${baseUrl}/posts`;

// functions

async function getSinglePost(url, userId) {
  try {
    const response = await fetch(`${url}/${userId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}
