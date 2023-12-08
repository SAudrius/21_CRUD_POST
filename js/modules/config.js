export const baseUrl = "http://localhost:5005";
export const postsUrl = `${baseUrl}/posts`;
export const commentsUrl = `${baseUrl}/comments`;

export async function getSinglePost(url, userId) {
  try {
    const response = await fetch(`${url}/${userId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}
