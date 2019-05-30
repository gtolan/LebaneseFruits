"use strict";
//
// var url = "https://lebanesefruit-36c3e.firebaseio.com/";
//
// var resquest = {
//     firebaseDB: function firebaseDB(route) {
//         console.log('start req');
//         var dest = url + route;
//         var xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function () {
//             if (this.readyState == 4 && this.status == 200) {
//                 // Typical action to be performed when the document is ready:
//                 document.getElementById("products").innerHTML = xhttp.responseText;
//             }
//         };
//         xhttp.open("GET", dest, true);
//         xhttp.send();
//     }
//
// };
//
// var path = location.pathname;
// console.log(path, "before req");
// resquest.firebaseDB(path);


var database = firebase.database();
var firebaseDB = fucntion(){
    return firebase.database().ref('/products/fruit').once('value').then(function (snapshot) {
        var fruit = snapshot.val();
        console.log(fruit, "resp")
        document.getElementById("products").innerHTML = JSON.stringify(fruit, null, 2);

    });
}
firebaseDB()

var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});



var enlargeButtons = document.querySelectorAll('button.enlarge');
for(var i = 0;i < enlargeButtons.length;i++){
    var but =
}