const NEAR_PATTERN: RegExp = /^(([a-z\d]+[-_])*[a-z\d]+\.)(near|testnet)$/;

const searchAddresses = () => {
  let treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ALL,
    null
  );

  while (treeWalker.nextNode()) {
    let node = treeWalker.currentNode;

    if (node.nodeValue && NEAR_PATTERN.test(node.nodeValue)) {
      let iconNode = document.createElement("imag");
      iconNode.setAttribute("src", "/soul.png");

      let spanNode = document.createElement("span");
      spanNode.appendChild(iconNode);

      let parentNode = document.createElement("div");
      parentNode.appendChild(spanNode);
      parentNode.appendChild(node.cloneNode(true));

      node.parentNode?.replaceChild(parentNode, node);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  searchAddresses();
});

export {};
