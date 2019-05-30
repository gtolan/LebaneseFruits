let url = "https://lebanesefruit-36c3e.firebaseio.com";

export const resquest = {
    firebaseDB(route):function {
        console.log('start req')
        let dest = url + route;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                document.getElementById("products").innerHTML = xhttp.responseText;
            }
        };
        xhttp.open("GET", dest, true);
        xhttp.send();
    }

}


let path = location.pathname;
console.log(path, "before req")
resquest.firebaseDB(path)

