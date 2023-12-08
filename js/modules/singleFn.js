export async function getSinglePost(url, userId) {
  try {
    const response = await fetch(`${url}/${userId}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.warn(err);
  }
}

export function showError(dataArr) {
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
