import { ACCOUNTS_LIST, GET_ACCOUNTS_MSG, OPEN_PROFILE_MSG } from "./constants";
import { Message } from "./types";

const NEAR_PATTERN: RegExp = /^(([a-z\d]+[-_])*[a-z\d]+\.)(near|testnet)$/;

const getOffset = (element: Element): { top: number; left: number } => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};

const createOpenButton = (
  height: number,
  top: number,
  left: number
): Element => {
  let iconNode = document.createElement("img");
  iconNode.setAttribute("src", chrome.runtime.getURL("icon.png"));
  iconNode.setAttribute("height", (height * 0.8).toString());

  let textNode = document.createElement("span");
  textNode.textContent = "Find";
  textNode.style.color = "#ffffff";

  let buttonNode = document.createElement("div");
  buttonNode.style.background =
    "linear-gradient(276.21deg, #9381FF 4.18%, rgba(147, 129, 255, 1) 97.48%)";
  buttonNode.style.padding = "2px 5px";
  buttonNode.style.borderRadius = (height / 4).toString() + "px";

  // Set position
  buttonNode.style.position = "absolute";
  buttonNode.style.top = top.toString() + "px";
  buttonNode.style.left = left.toString() + "px";

  // Set children layout
  buttonNode.style.display = "flex";
  buttonNode.style.flexDirection = "row";
  buttonNode.style.alignItems = "center";

  buttonNode.appendChild(iconNode);
  buttonNode.appendChild(textNode);

  return buttonNode;
};

const searchAddresses = () => {
  let treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ALL,
    null
  );

  while (treeWalker.nextNode()) {
    let node = treeWalker.currentNode;

    if (node.nodeValue && NEAR_PATTERN.test(node.nodeValue)) {
      const nodeOffset = getOffset(node.parentElement!);

      let openButton = createOpenButton(
        node.parentElement!.offsetHeight,
        nodeOffset.top,
        nodeOffset.left
      );

      openButton.addEventListener("click", () => {
        const msg: Message = {
          type: OPEN_PROFILE_MSG,
          account: node.nodeValue!,
        };
        chrome.runtime.sendMessage(msg);
      });

      node.parentNode?.addEventListener("mouseout", () => {
        setTimeout(() => {
          try {
            document.body.removeChild(openButton);
          } catch {}
        }, 1000);
      });

      node.parentNode?.addEventListener("mouseover", () => {
        document.body.appendChild(openButton);
      });
    }
  }
};

const dumpAddresses = (): string[] => {
  let treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  let addresses = new Set<string>();

  while (treeWalker.nextNode()) {
    let node = treeWalker.currentNode;

    if (node.nodeValue && NEAR_PATTERN.test(node.nodeValue)) {
      addresses.add(node.nodeValue);
    }
  }

  return Array.from(addresses.values());
};

const messageHandler = (
  msg: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: Message) => void
) => {
  if (msg.type === GET_ACCOUNTS_MSG) {
    let response: Message = {
      type: ACCOUNTS_LIST,
      accounts: dumpAddresses(),
    };

    sendResponse(response);
  }
};

chrome.runtime.onMessage.addListener(messageHandler);

document.addEventListener("DOMContentLoaded", () => {
  searchAddresses();
});
