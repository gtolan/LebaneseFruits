import { ServiceWorker } from "./serviceWorker";
import { InterObserver } from "./intersectionObserver";
import { removeLoadHiddenTags, addEvents } from "./shell";

addEvents();
document.addEventListener("DOMContentLoaded", function() {
  removeLoadHiddenTags();
});

ServiceWorker.init();
new InterObserver();
