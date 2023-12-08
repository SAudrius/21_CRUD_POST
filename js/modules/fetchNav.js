export default async function () {
  const response = await fetch("http://127.0.0.1:5500/nav.html");

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const data = await response.text();
    const bodyEl = document.querySelector("body");
    bodyEl.insertAdjacentHTML("afterbegin", data);
  }
}
