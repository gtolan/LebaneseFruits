//About page style changes
//our company
var editOurCompany = {
  changeHeader: function(img) {
    let header = document.querySelector(".header-image.about");
    header.style.backgroundImage =
      "linear-gradient(rgba(124,222,213,.36),#28c82526),url( " + imageSrc + ")";
  },
  changeCircle: function(img) {
    let circle = document.querySelector("div.circle.right");
    circle.style.backgroundImage = "url( " + img + ")";
  },

  changeOurCompanyText: function(text) {
    let ourCompanySection = document.querySelector(".company.description");
    ourCompanySection.innerHTML = text;
  },
  changeOurMissionText: function(text) {
    let ourMissionSection = document.querySelector(
      ".company.mission.description"
    );
    ourMissionSection.innerHTML = text;
  },
  changeTeamSectionImage: function(img) {
    let meetOurTeamSection = document.querySelector("section#bottomLink.team");
    meetOurTeamSection.style.background =
      "linear-gradient(rgba(0,45,150,.75),#bfc8255c),url(" + img + ")";
  }
};

////our team
var editOurTeam = {
  changeHeader: function(img) {
    let header = document.querySelector(".header-image.team");
    header.style.backgroundImage =
      "linear-gradient(rgba(124,222,213,.36),#28c82526),url( " + img + ")";
  },
  changeMemberOne: function(img, title, position, bio) {
    let memberOneText = document.querySelector("member-text.one");
    let memberOneImage = document.querySelector("member.image.one");
    memberOneImage.style.backgroundImage = "url(" + img + ")";
    memberOneText.firstElementChild.innerHTML = title;
    memberOneText.firstElementChild.nextElementSibling.innerHTML = position;
    memberOneText.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = bio;
  },
  changeMemberTwo: function(img, title, position, bio) {
    let memberTwoText = document.querySelector("member-text.two");
    let memberTwoImage = document.querySelector("member.image.two");
    memberTwoImage.style.backgroundImage = "url(" + img + ")";
    memberTwoText.firstElementChild.innerHTML = title;
    memberTwoText.firstElementChild.nextElementSibling.innerHTML = position;
    memberTwoText.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = bio;
  },
  changeMemberThree: function(img, title, position, bio) {
    let memberThreeText = document.querySelector("member-text.three");
    let memberThreeImage = document.querySelector("member.image.three");
    memberThreeImage.style.backgroundImage = "url(" + img + ")";
    memberThreeText.firstElementChild.innerHTML = title;
    memberThreeText.firstElementChild.nextElementSibling.innerHTML = position;
    memberThreeText.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = bio;
  },
  changeRetailerSeciton: function(img) {
    let retailerBottomSection = document.querySelector(
      "section#bottomLink.retailers"
    );
    retailerBottomSection.style.backgroundImage =
      "linear-gradient(rgba(0,45,150,.75),#bfc8255c),url(" + img + ")";
  }
};
////retailers
//header
var editOurRetailers = {
  changeHeader: function(img) {
    let retailHeader = document.querySelector(".header-image.retailers");
    retailHeader.style.backgroundImage =
      "linear-gradient(rgba(0,45,150,.75),#bfc8255c),url(" + img + ")";
  },
  changeIcons: function(arrayOfIcons) {
    let grid = document.querySelectorAll(".retailers-grid");

    for (var i = 0; i < arrayOfIcons.length; i++) {
      let img = arrayOfIcons[i];
      let icon = document.createElement("div");
      icon.classList.add("retail", "store");
      icon.style.background = "url(" + img + ")";
    }
  },
  changeProductSeciton: function(img) {
    let productsBottomSection = document.querySelector(
      "section#bottomLink.products"
    );
    productsBottomSection.style.backgroundImage =
      "linear-gradient(rgba(0,45,150,.75),#bfc8255c),url(" + img + ")";
  }
};

////Contact
var editContactPage = {
  changeHeaderImage: function(img) {
    let img = null;
    let contactHeader = document.querySelector(".header-image.contact");
    contactHeader.style.backgroundImage =
      "linear-gradient(rgba(0,150,136,.36),#28c82582),url(" + img + ")";
  }
};

function initDB() {
  var localDB = localStorage.getItem("productList");
  var someTimeLimit = true;
  if (localDB && someTimeLimit) {
    list = JSON.parse(localDB);
    checkProductRoutes();
    hideLoader();
    console.log("using local storage");
  } else {
    var ref = firebase.database().ref("products");
    console.log(ref);
    ref.on(
      "value",
      function(snapshot) {
        console.log(snapshot.val());
        var prodList = snapshot.val();
        console.log(prodList);
        document.getElementById("products").innerHTML = JSON.stringify(
          prodList,
          null,
          2
        );
        list = prodList;
        localStorage.setItem("productList", JSON.stringify(prodList));
        checkProductRoutes();
        hideLoader();
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
  }
}

function initCompanyEdits() {
  var localDB = localStorage.getItem("companyPageData");
  if (localDB) {
    list = JSON.parse(localDB);
    editOurCompanyPage(list);
  } else {
    var ref = firebase.database().ref("companyPageData");
    console.log(ref);
    ref.on(
      "value",
      function(snapshot) {
        console.log(snapshot.val());
        var companyPage = snapshot.val();
        console.log(companyPage);

        list = prodList;
        localStorage.setItem("companyPageData", JSON.stringify(companyPage));
        editOurCompanyPage(companyPage);
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
  }
}
initCompanyEdits();

function editOurCompanyPage() {
  editOurCompany.changeHeader(img);
  editOurCompany.changeCircle(img);
  editOurCompany.changeOurCompanyText(text);
  editOurCompany.changeOurMissionText(text);
  editOurCompany.changeTeamSectionImage(img);
}
