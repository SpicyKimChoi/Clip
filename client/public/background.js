chrome.tabs.query({}, (tabs) => {
  console.log(tabs);
  window.localStorage.setItem("tabs", JSON.stringify(tabs));
});
