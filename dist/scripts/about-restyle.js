var editOurCompany = {
  changeHeader: function(img) {
    let header = document.querySelector(".header-image.about");
    header.style.backgroundImage =
      "linear-gradient(rgba(124,222,213,.36),#28c82526),url( " + img + ")";
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

function editOurCompanyPage(data) {
  console.log("edit data", data);
  if (data.headerImage != "" && data.headerImage != null) {
    editOurCompany.changeHeader(data.headerImage);
  }
  if (data.headerCircle != "" && data.headerCircle != null) {
    editOurCompany.changeCircle(data.headerCircle);
  }
  if (data.companyText != "" && data.companyText != null) {
    editOurCompany.changeOurCompanyText(data.companyText);
  }
  if (data.missionText !== "" && data.missionText !== null) {
    editOurCompany.changeOurMissionText(data.missionText);
  }
  if (data.bottomImage !== "" && data.bottomImage !== null) {
    editOurCompany.changeTeamSectionImage(data.bottomImage);
  }
}
