const url = "https://dion-rotation-matrix.herokuapp.com/";

window.onload = function() {
    let xhttp = new XMLHttpRequest();
    //
    // xhttp.open("GET", "http://localhost:3000/leaderboard", true);
    xhttp.open("GET", url + "leaderboard", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            let res = JSON.parse(this.responseText);
            console.log("success:" + res)

            let html = "<table><tr><th>Name</th><th>Score</th></tr>"

            for (let i=0; i < res.length; i++) {
                html += "<tr>" +
                    "<td>"+res[i]["name"]+"</td>" +
                    "<td>"+res[i]["score"]+"</td>" +
                    "</tr>";
            }
            html += "</table><button><a href='Matrix.html'>RESTART</a></button>"
            document.getElementById("container").innerHTML = html
            console.log(html)
        }
    };
}