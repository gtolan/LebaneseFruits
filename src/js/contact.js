AppoliciousContact.prototype.sendFBXml=  function(obj){

    function sendData(url, data, success) {
        params = data;
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open('POST', url);
        xhr.onreadystatechange = function() {
            if (xhr.readyState>3 && xhr.status==200) { success(xhr.responseText); }
        };
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        xhr.send(params);
        return xhr;
    }

    // example request//https://appoliciouspwamp.firebaseio.com/emails
    var tempURL = "https://appoliciouspwamp.firebaseio.com/emails.json";
    var URL = tempURL || "https://appolicious-pwa-amp.firebaseio.com/emails.json";
    // var obj = {"name":"TestXML", "add":"messagepage.js"};
    obj = JSON.stringify(obj);
    // obj = encodeURI(obj);
    sendData(URL, obj, function(data){ console.log(data); });

}