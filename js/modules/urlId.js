export default function getPageId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currentPostId = urlParams.get("id");
  if (!currentPostId) {
    console.log("noe post id");
    return;
  }
  return currentPostId;
}
