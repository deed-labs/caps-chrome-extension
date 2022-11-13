import { OpenProfileMessage } from "./types";

chrome.runtime.onMessage.addListener(async (request: any) => {
  let screen = await chrome.windows.getLastFocused();

  let msg = request as OpenProfileMessage;
  console.log(msg.address);

  chrome.windows.create(
    {
      url: "index.html",
      type: "popup",
      focused: true,
      width: 400,
      height: 600,
      top: 0,
      left: screen.left! + screen.width! - 400,
    },
    () => {}
  );
});
