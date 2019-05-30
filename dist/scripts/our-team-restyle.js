var editOurTeam = {
  changeHeader: function(img) {
    let header = document.querySelector(".header-image.team");
    header.style.backgroundImage =
      "linear-gradient(rgba(124,222,213,.36),#28c82526),url( " + img + ")";
  },
  changeMemberOne: function(data) {
    var image = data.image,
      title = data.title,
      position = data.position,
      bio = data.bio;
    let memberOneText = document.querySelector("member-text.one");
    let memberOneImage = document.querySelector("member.image.one");
    memberOneImage.style.backgroundImage = "url(" + image + ")";
    memberOneText.firstElementChild.innerHTML = title;
    memberOneText.firstElementChild.nextElementSibling.innerHTML = position;
    memberOneText.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = bio;
  },
  changeMemberTwo: function(data) {
    var image = data.image,
      title = data.title,
      position = data.position,
      bio = data.bio;
    let memberTwoText = document.querySelector("member-text.two");
    let memberTwoImage = document.querySelector("member.image.two");
    memberTwoImage.style.backgroundImage = "url(" + image + ")";
    memberTwoText.firstElementChild.innerHTML = title;
    memberTwoText.firstElementChild.nextElementSibling.innerHTML = position;
    memberTwoText.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = bio;
  },
  changeMemberThree: function(data) {
    var image = data.image,
      title = data.title,
      position = data.position,
      bio = data.bio;
    let memberThreeText = document.querySelector("member-text.three");
    let memberThreeImage = document.querySelector("member.image.three");
    memberThreeImage.style.backgroundImage = "url(" + image + ")";
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

function initTeamEdits() {
  var localDB = localStorage.getItem("teamPageData");
  if (localDB) {
    list = JSON.parse(localDB);
    editOurTeamPage(list);
  } else {
    var ref = firebase.database().ref("teamPageData");
    console.log(ref);
    ref.on(
      "value",
      function(snapshot) {
        console.log(snapshot.val());
        var teamPageData = snapshot.val();
        console.log(companyPage);
        localStorage.setItem("teamPageData", JSON.stringify(teamPageData));
        editOurTeamPage(teamPageData);
      },
      function(error) {
        console.log("Error: " + error.code);
      }
    );
  }
}
initTeamEdits();

function editOurTeamPage(data) {
  console.log("edit data", data);
  if (data.headerImage != "" && data.headerImage != null) {
    editOurTeam.changeHeader(data.headerImage);
  }

  if (
    data.memberOne.image != "" &&
    data.memberOne.name != "" &&
    data.memberOne.bio != ""
  ) {
    editOurTeam.changeMemberOne(data.memberOne);
  }
  if (
    data.memberTwo.image != "" &&
    data.memberTwo.name != "" &&
    data.memberTwo.bio != ""
  ) {
    editOurTeam.changeMemberTwo(data.memberTwo);
  }
  if (
    data.memberThree.image != "" &&
    data.memberThree.name != "" &&
    data.memberThree.bio != ""
  ) {
    editOurTeam.changeMemberThree(data.memberThree);
  }
  if (data.bottomImage !== "" && data.bottomImage !== null) {
    editOurTeam.changeRetailerSeciton(data.bottomImage);
  }
}
