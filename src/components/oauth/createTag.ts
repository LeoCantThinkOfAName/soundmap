export default (callback: any) => {
  const body = document.querySelector("body");
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("async", "");
  scriptTag.setAttribute("defer", "");
  scriptTag.src = "https://apis.google.com/js/platform.js";
  scriptTag.onload = callback;
  body.appendChild(scriptTag);
};
