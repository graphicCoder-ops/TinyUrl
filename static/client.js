console.log("Script started!")
var urlElement = document.getElementById("urlText");
var displayURL = document.getElementById("displayURL");
function onbtnclick() {
    console.log("On Click!");
    fetch(`${document.location.href}api/linkgenerator`, {
        method: "POST",
        body: JSON.stringify({
            longURL: urlElement.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json()).then((json) => {
        console.log(json);
        displayURL.href = document.location.href + json.short;
        displayURL.innerHTML = document.location.href + json.short;
    });
   
}

//console.log("HELLO WORKS"+reponse);