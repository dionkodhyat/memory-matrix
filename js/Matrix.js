class Matrix {
    constructor(rows, col) {
        this.rows = rows;
        this.col = col;
    }

    generateButtons() {
        let btnList = []
        for (let i = 0; i < this.rows * this.col; i++) {
            let btn = document.createElement("BUTTON")
            btn.setAttribute("class", "btn");
            btn.innerHTML = '&nbsp;&nbsp;'
            btn.style.backgroundColor = "#00a4ef"
            btn.style.border = "1px solid white";
            btn.setAttribute('id', String(i))
            btn.addEventListener("click", function () {
                if (this.style.backgroundColor !== "red") {
                    this.style.backgroundColor = "red"
                } else {
                    this.style.backgroundColor = "#00a4ef"
                }
            })
            btnList.push(btn)
        }
        return btnList
    }

    generateMatrix() {
        let btnGroupWrapperList = []
        for (let i = 0; i < this.rows; i++) {
            let btnGroupWrapper = document.createElement("div")
            btnGroupWrapper.setAttribute("class", "row d-flex justify-content-center")
            btnGroupWrapperList.push(btnGroupWrapper)
        }
        let btnList = this.generateButtons()
        let i = 0;
        let j = 0;
        do {
            btnGroupWrapperList[j].appendChild(btnList[i])
            i++;
            if (i % this.col === 0) {
                    j++
            }
        } while (i < btnList.length )

        let box = document.createElement('div')
        box.setAttribute('id', 'box')
        for (let i = 0; i < this.rows; i++) {
            box.appendChild(btnGroupWrapperList[i])
        }
        box.style.transition = "all 0.5s ease-in-out"
        // box.style.paddingTop = '250px';
        // box.style.paddingBottom = '250px';
        return box;
    }

    increaseOne() {
        if (this.col < this.rows) {
            this.col += 1;
        } else {
            this.rows += 1;
        }

    }

    decreaseOne() {
        if (this.col < this.rows) {
            // this.col -= 1;
            this.rows -= 1;
        } else {
            this.col -= 1;
        }

    }
}

class Level {
    constructor() {
        this.levelNumber = 1;
        this.tileSelected = 1;
        this.answers = [];
    }


    displayLevel() {
        let headline = document.createElement("div");
        headline.setAttribute("id", "headline");
        headline.innerHTML = `<h2><b>Level ${this.levelNumber}</b></h2>`;
        headline.style.textAlign = "center"
        document.getElementsByTagName('body')[0].append(headline);
    }

    generateRandomIndexes(buttonList) {
        let randomIndexArr = []
        while (randomIndexArr.length < this.tileSelected) {
            let randomIndex = Math.floor(Math.random() * buttonList.length);
            if (randomIndexArr.indexOf(randomIndex) === -1) {
                randomIndexArr.push(randomIndex)
            }
        }

        return randomIndexArr;
    }

    selectRandomTiles(btnList){
        let randomIndexes = this.generateRandomIndexes(btnList)
        let buttonList = document.getElementsByClassName('btn')
        for (let i = 0; i < randomIndexes.length; i++) {
            buttonList[randomIndexes[i]].click();
        }
        setTimeout(() => {
            for (let i = 0; i < randomIndexes.length; i++) {
                buttonList[randomIndexes[i]].click();
            }
        }, 1000);
        this.answers = randomIndexes;
    }

}

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}

class Game {
    constructor(playerName) {
        this.player = new Player(playerName);
        this.level = new Level(3,3)
        this.matrix = new Matrix(2, 2);
        this.gameScore = 0;

    }

    displayScore() {
        let scoreDiv = document.createElement("div");
        scoreDiv.setAttribute(`id`, `score`)
        scoreDiv.innerHTML = `Score: ${this.gameScore}`;
        scoreDiv.style.textAlign = "center";
        document.getElementsByTagName('body')[0].append(scoreDiv);
    }

    displayButton() {
        let terminateBtn = document.createElement("button");
        terminateBtn.addEventListener("click", () => {
            this.player.score = this.gameScore;
            localStorage.setItem("matrixGame", this.player.score)
            window.location = "Summary.html";
        });
        terminateBtn.textContent = "TERMINATE";
        let container = document.createElement("div");
        let smallerContainer = document.createElement("div");
        terminateBtn.setAttribute("id", "terminate");
        // container.setAttribute("class", "d-flex justify-content-center mt-5 mb-5");
        smallerContainer.append(terminateBtn)
        container.append(smallerContainer);
        document.getElementsByTagName('body')[0].append(container);

    }

    prePlayState() {
        this.level.displayLevel();
        this.displayScore();
        this.displayButton();
        document.getElementsByTagName('body')[0].append(this.matrix.generateMatrix())
        this.level.selectRandomTiles(this.matrix.generateButtons());
    }

    playState() {
        let box = document.getElementById("box");
        box.style.transform = "rotate(90deg)";
        let buttonList = document.getElementsByClassName('btn')
        let playerClickCount = 0;
        let correctCount = 0;
        let playerSelect = function(element) {
            element.setAttribute('disabled', 'true')
            new Audio("../audio/buttonSound.mp3").play()
            if (playerClickCount < this.level.tileSelected) {
                console.log(this.level.answers)
                playerClickCount++;
                if (this.level.answers.includes(parseInt(element.getAttribute('id')))) {
                    correctCount += 1;
                    this.gameScore += 1;
                    document.getElementById('score').innerHTML = `Score ${this.gameScore}`
                    element.style.backgroundColor = "#7fba00"

                } else {
                    this.gameScore -= 1;
                    document.getElementById('score').innerHTML = `Score ${this.gameScore}`
                }
            }
            if (playerClickCount === this.level.tileSelected) {
                this.next(correctCount)
            }
        }.bind(this);

        for (let button of buttonList) {
            button.onclick = function () {
                playerSelect(this)
            }
        }
    }

    next(correctCount) {
        if (correctCount !== parseInt(this.level.tileSelected)) {
            if (this.gameScore < 0 ) {
                document.getElementById("terminate").click();
            }
            alert("TRY AGAIN")
            let box = document.getElementById("box");
            box.remove();
            this.level.tileSelected -= 1;
            this.matrix.decreaseOne();
            document.getElementsByTagName('body')[0].append(this.matrix.generateMatrix());
            this.level.selectRandomTiles(this.matrix.generateButtons());
            setTimeout(function(){this.playState()}.bind(this), 1000)
        } else {
            let box = document.getElementById("box");
            box.remove();
            if (this.matrix.rows !== parseInt("7") && this.matrix.col !== parseInt(7)) {
                this.matrix.increaseOne();
                this.level.levelNumber += 1;
                this.level.tileSelected += 1;
            }
            let headline = document.getElementById("headline");
            headline.style.textAlign = "center"
            headline.innerHTML = `<h2><b>Level ${this.level.levelNumber}</b></h2>`;
            document.getElementsByTagName('body')[0].append(this.matrix.generateMatrix());
            this.level.selectRandomTiles(this.matrix.generateButtons());
            setTimeout(function(){this.playState()}.bind(this), 1000)
        }
    }



}






function driver() {
    let game = new Game("Dion");
    game.prePlayState();
    setTimeout(function(){game.playState()}, 1200);

}
window.onload = driver;
// driver()
