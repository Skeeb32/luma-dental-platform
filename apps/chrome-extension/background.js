chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    pulseApiBaseUrl: "https://api.example.com/api/v1",
    injectButtons: true
  });
});
