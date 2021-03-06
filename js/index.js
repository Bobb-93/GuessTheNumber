// dom: various dom objects
const dom = {
    playButton: document.getElementById("playButton"),
    guessButton: document.getElementById("guessButton"),
    resetButton: document.getElementById("resetButton"),
    startNewGameButton: document.getElementById("startNewGameButton"),
    selectLevelDiv: document.getElementById("selectLevelDiv"),
    guessTheNumberDiv: document.getElementById("guessTheNumberDiv"),
    guessTableDiv: document.getElementById("guessTableDiv"),
    numberOfTriesRemaining: document.getElementById("numberOfTriesRemaining"),
    numberOfTries: document.getElementById("numberOfTries"),
    guessingInput: document.getElementById("guessingInput"),
    from: document.getElementById("from"),
    to: document.getElementById("to"),
    dropDown: document.querySelector("label[for=selectLevelDropDown]"),
    selectLevelDropDown: document.getElementById("selectLevelDropDown"),
    playingLevel: document.getElementById("playingLevel"),
    endMessage: document.getElementById("endMessage"),
    level: document.getElementById("level"),
    guessTable: document.getElementById("guess-table")
};

dom.tbodyRef = dom.guessTable.tBodies[0];
// alternative way for tbodyRef:
// dom.tbodyRef = dom.guessTable.getElementsByTagName("tbody")[0];

//bonus variable for the table rows:
//dom.tableRows = dom.guessTable.rows;

// alternative way for the table rows:
//dom.tableRows = dom.guessTable.getElementsByTagName("tr");

//bonus variable for the length of tableRows:
//dom.rowCount = dom.tableRows.length;

// gameVariables: variables that are used in the entire game
let gameVariables = {
    randomNumber: undefined,
    count: 1,
    minValue: 1,
    maxValue: undefined,
    tries: undefined,
    maxTries: undefined,
    difficulty: undefined
};

function playGame(){
    gameVariables.difficulty = dom.selectLevelDropDown.value;
    // console.log(`gameVariables.difficulty = ${gameVariables.difficulty}`);
    if(gameVariables.difficulty === "easy"){
        gameVariables.maxValue = 10;
        dom.level.innerText = "Easy";
    }else if(gameVariables.difficulty === "basic"){
        gameVariables.maxValue = 50;
        dom.level.innerText = "Basic";
    }else{
        gameVariables.maxValue = 100;
        dom.level.innerText = "Advanced";
    }

    gameVariables.maxTries = Math.ceil(Math.log2(gameVariables.maxValue
                             - gameVariables.minValue + 1)) + 1;
    gameVariables.tries = gameVariables.maxTries;
    dom.numberOfTriesRemaining.innerText = gameVariables.maxTries;
    dom.numberOfTries.innerText = gameVariables.maxTries;
    dom.from.innerText=`${gameVariables.minValue}`;
    dom.to.innerText=`${gameVariables.maxValue}`;
    gameVariables.randomNumber =  Math.floor(Math.random() *
        (gameVariables.maxValue - gameVariables.minValue + 1)) +
        gameVariables.minValue;
    // console.log(randomNumber);
    dom.selectLevelDropDown.style.display = "none";
    dom.playButton.style.display = "none";
    dom.dropDown.style.display = "none";
    dom.playingLevel.style.display = "block";
    // dom.endMessage.style.display = "block";
    dom.guessTheNumberDiv.style.display = "block";
    dom.guessingInput.focus();
}

function checkNumber(){
    // tableVariables: variables, that are used only,
    //  when we add new rows in the table
    let tableVariables = {
        guessNumber: undefined,
        newRow: undefined,
        newCellText: undefined,
        newCellNumber: undefined,
        insertedText: undefined
    };
    tableVariables.guessNumber = Number(guessingInput.value);
    dom.guessTableDiv.style.display = "block";
    if(tableVariables.guessNumber < gameVariables.minValue ||
        tableVariables.guessNumber > gameVariables.maxValue){
        alert(`Please, enter a number in range: ${gameVariables.minValue},
        ${gameVariables.maxValue}`);
        //prevent displaying of table, if our first guess is a number,
        //that is out of range
        if(gameVariables.count === 1){
            dom.guessTableDiv.style.display = "none";
        }
    }else if(tableVariables.guessNumber > gameVariables.randomNumber &&
        gameVariables.count < gameVariables.maxTries){
        gameVariables.count += 1;
        gameVariables.tries -= 1;
        dom.numberOfTriesRemaining.innerText = gameVariables.tries;
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin",
        //`<tr><td>${guessNumber}</td><td>high</td></tr>`);
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText =
                document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`high`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        // console.log(`count = ${count}`);
    }else if(tableVariables.guessNumber < gameVariables.randomNumber &&
            gameVariables.count < gameVariables.maxTries){
        gameVariables.count += 1;
        gameVariables.tries -= 1;
        dom.numberOfTriesRemaining.innerText = gameVariables.tries;
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin",
        //`<tr><td>${guessNumber}</td><td>low</td></tr>`);
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText =
            document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`low`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        // console.log(`count = ${count}`);
    }else if(tableVariables.guessNumber === gameVariables.randomNumber){
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText =
            document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`win`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        dom.guessTheNumberDiv.style.display = "none";
        dom.playingLevel.style.display = "none";
        dom.endMessage.style.display = "block";
        dom.endMessage.innerText =
        `Bravo! You guessed my number (${gameVariables.randomNumber}) from ${gameVariables.count} tries`;
        dom.startNewGameButton.style.display = "block";
    }else{
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText =
            document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`loss`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        dom.guessTheNumberDiv.style.display = "none";
        dom.playingLevel.style.display = "none";
        dom.endMessage.style.display = "block";
        dom.endMessage.innerText =
            `You lose! My number was (${gameVariables.randomNumber})`;
        dom.startNewGameButton.style.display = "block";
    }
}

function startNewGame(){
    // gameVariables.randomNumber = undefined;
    gameVariables.count = 1;
    // gameVariables.maxValue = undefined;
    // gameVariables.tries = undefined;
    // gameVariables.maxTries = undefined;
    // gameVariables.difficulty = undefined;
    dom.guessTheNumberDiv.style.display = "none";
    dom.playingLevel.style.display = "none";
    dom.selectLevelDropDown.style.display = "inline-block";
    dom.dropDown.style.display = "inline";
    dom.playButton.style.display = "inline-block";
    dom.guessTableDiv.style.display = "none";
    document.querySelectorAll("table tbody tr").forEach(function(e){
        e.remove();
    });
    dom.level.innerHTML = "";
    dom.startNewGameButton.style.display="none";
    dom.guessingInput.value="";
    dom.endMessage.style.display = "none";
    dom.endMessage.innerText = "";
}

function resetGame(){
    if(window.prompt(`Start new game?`, `yes`)){
        startNewGame();
    }
}

dom.playButton.addEventListener("click", playGame);
dom.guessButton.addEventListener("click", checkNumber);
dom.resetButton.addEventListener("click", resetGame);
dom.startNewGameButton.addEventListener("click", startNewGame);

//From https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Execute a function when the user releases a key on the keyboard
guessingInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        guessButton.click();
    }
});