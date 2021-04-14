const submitBtn = document.getElementById("submit");
const nameInput = document.getElementById("nameInput")

const url = "https://dion-rotation-matrix.herokuapp.com/";

submitBtn.addEventListener("click", () => {

    let name = nameInput.value;
    let score = localStorage.getItem("matrixGame");
    if (score === null) {
        score = -1;
    }
    console.log("SCORE: " + score);
    let xhttp = new XMLHttpRequest();
    xhttp.open('POST', `${url}players?name=${name}&score=${score}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location = "Leaderboard.html";
        }
    }
})