import { OPEN_PROFILE_MSG } from "./constants";
import { Message } from "./types";

chrome.runtime.onMessage.addListener(async (request: any) => {
  let screen = await chrome.windows.getLastFocused();

  let msg = request as Message;

  if (msg.type === OPEN_PROFILE_MSG) {
    chrome.windows.create(
      {
        url: "index.html/profile/" + msg.account,
        type: "popup",
        focused: true,
        width: 400,
        height: 600,
        top: 0,
        left: screen.left! + screen.width! - 400,
      },
      () => {}
    );
  }
});
