const phonePattern = /\+?\d[\d\s().-]{7,}\d/g;

function createButton(phoneNumber) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Send Text";
  button.style.marginLeft = "8px";
  button.style.padding = "4px 8px";
  button.style.borderRadius = "999px";
  button.style.border = "1px solid #1f6feb";
  button.style.background = "#0d1117";
  button.style.color = "#f0f6fc";
  button.style.cursor = "pointer";
  button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "open-pulse-thread", phoneNumber });
  });
  return button;
}

function injectButtons() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const seen = new Set();

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const match = node.textContent?.match(phonePattern)?.[0];
    if (!match || seen.has(node.parentElement)) {
      continue;
    }

    seen.add(node.parentElement);
    node.parentElement?.appendChild(createButton(match));
  }
}

injectButtons();
