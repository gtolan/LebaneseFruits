export const removeLoadHiddenTags = () => {
  let loadHidden = document.querySelectorAll(".load-hidden");
  if (loadHidden && loadHidden.length != 0) {
    Array.from(loadHidden).forEach(elem => {
      elem.classList.remove("load-hidden");
    });
  }
};
export const addEvents = () => {
  var ham = document.querySelector(".hamburger");
  var nav = document.getElementById("mobileNav");

  const removeMenu = () => {
    ham.classList.remove("is-active");
    nav.classList.remove("is-active");
    document.body.classList.remove("fixed");
  };

  ham.addEventListener("click", function() {
    this.classList.toggle("is-active");
    nav.classList.toggle("is-active");
    document.body.classList.toggle("fixed");
  });
};

document.addEventListener("DOMContentLoaded", function() {
  console.log("shell DOm loaded");
  try {
    var app = firebase.app();
    var features = ["auth", "database", "messaging", "storage"].filter(function(
      feature
    ) {
      return typeof app[feature] === "function";
    });
    //document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    console.log("Firebase SDK loaded with " + features.join(", "));
  } catch (e) {
    console.error(e);
    //document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }

  removeLoadHiddenTags();
});
