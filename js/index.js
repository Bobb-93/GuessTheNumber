// dom: various dom objects
const dom = {
    playButton: $("#playButton"),
    guessButton: $("#guessButton"),
    resetButton: $("#resetButton"),
    startNewGameButton: $("#startNewGameButton"),
    selectLevelDiv: $("#selectLevelDiv"),
    guessTheNumberDiv: $("#guessTheNumberDiv"),
    guessTableDiv: $("#guessTableDiv"),
    numberOfTriesRemaining: $("#numberOfTriesRemaining"),
    numberOfTries: $("#numberOfTries"),
    guessingInput: $("#guessingInput"),
    from: $("#from"),
    to: $("#to"),
    dropDown: $("label[for='selectLevelDropDown']"),
    selectLevelDropDown: $("#selectLevelDropDown"),
    playingLevel: $("#playingLevel"),
    endMessage: $("#endMessage"),
    level: $("#level"),
    guessTable: $("#guess-table"),
    tbody: $("#guess-table > tbody")
};
console.log(dom.guessTable);
dom.tbodyRef = dom.tbody[0];

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
    gameVariables.difficulty = dom.selectLevelDropDown.val();
    // console.log(`gameVariables.difficulty = ${gameVariables.difficulty}`);
    if(gameVariables.difficulty === "easy"){
        gameVariables.maxValue = 10;
        dom.level.text("Easy");
    }else if(gameVariables.difficulty === "basic"){
        gameVariables.maxValue = 50;
        dom.level.text("Basic");
    }else{
        gameVariables.maxValue = 100;
        dom.level.text("Advanced");
    }

    gameVariables.maxTries = Math.ceil(Math.log2(gameVariables.maxValue
                             - gameVariables.minValue + 1)) + 1;
    gameVariables.tries = gameVariables.maxTries;
    dom.numberOfTriesRemaining.text(gameVariables.maxTries);
    dom.numberOfTries.text(gameVariables.maxTries);
    dom.from.text(`${gameVariables.minValue}`);
    dom.to.text(`${gameVariables.maxValue}`);
    gameVariables.randomNumber =  Math.floor(Math.random()
        * (gameVariables.maxValue - gameVariables.minValue + 1))
        + gameVariables.minValue;
    // console.log(randomNumber);
    dom.selectLevelDropDown.css("display", "none");
    dom.playButton.css("display", "none");
    dom.dropDown.css("display", "none");
    dom.playingLevel.css("display", "block");
    // dom.endMessage.css("display", "block");
    dom.guessTheNumberDiv.css("display", "block");
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
    tableVariables.guessNumber = Number(dom.guessingInput.val());
    dom.guessTableDiv.css("display", "block");
    if(tableVariables.guessNumber < gameVariables.minValue
        || tableVariables.guessNumber > gameVariables.maxValue){
        alert(
            `Please, enter a number in range: ${gameVariables.minValue},${gameVariables.maxValue}`
        );
        //prevent displaying of table, if our first guess is a number,
        //that is out of range
        if(gameVariables.count === 1){
            dom.guessTableDiv.css("display", "none");
        }
        dom.guessingInput.val("");
        dom.guessingInput.focus();
    }else if(tableVariables.guessNumber > gameVariables.randomNumber
            && gameVariables.count < gameVariables.maxTries){
        gameVariables.count += 1;
        gameVariables.tries -= 1;
        dom.numberOfTriesRemaining.text(gameVariables.tries);
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin",
        //`<tr><td>${guessNumber}</td><td>high</td></tr>`);
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText
            = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`high`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        // console.log(`count = ${count}`);
        // guessingInput.value = "";
        dom.guessingInput.focus();
    }else if(tableVariables.guessNumber < gameVariables.randomNumber
            && gameVariables.count < gameVariables.maxTries){
        gameVariables.count += 1;
        gameVariables.tries -= 1;
        dom.numberOfTriesRemaining.text(gameVariables.tries);
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin",
        //`<tr><td>${guessNumber}</td><td>low</td></tr>`);
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText
            = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`low`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        // console.log(`count = ${count}`);
        // guessingInput.value = "";
        dom.guessingInput.focus();
    }else if(tableVariables.guessNumber === gameVariables.randomNumber){
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText 
            = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`win`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        dom.guessTheNumberDiv.css("display", "none");
        dom.playingLevel.css("display", "none");
        dom.endMessage.css("display", "block");
        dom.endMessage.text(
            `Bravo! You guessed my number (${gameVariables.randomNumber}) from ${gameVariables.count} tries`);
        dom.startNewGameButton.css("display", "block");
    }else{
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText
            = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        tableVariables.insertedText = document.createTextNode(`loss`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        dom.guessTheNumberDiv.css("display", "none");
        dom.playingLevel.css("display", "none");
        dom.endMessage.css("display", "block");
        dom.endMessage.text(
            `You lose! My number was (${gameVariables.randomNumber})`);
        dom.startNewGameButton.css("display", "block");
    }
}

function startNewGame(){
    // gameVariables.randomNumber = undefined;
    gameVariables.count = 1;
    // gameVariables.maxValue = undefined;
    // gameVariables.tries = undefined;
    // gameVariables.maxTries = undefined;
    // gameVariables.difficulty = undefined;
    dom.guessTheNumberDiv.css("display", "none");
    dom.playingLevel.css("display", "none");
    dom.selectLevelDropDown.css("display", "inline-block");
    dom.dropDown.css("display", "inline");
    dom.playButton.css("display", "inline-block");
    dom.guessTableDiv.css("display", "none");
    document.querySelectorAll("table tbody tr").forEach(function(e){
        e.remove();
    });
    dom.level.innerHTML = "";
    dom.startNewGameButton.css("display", "none");
    dom.guessingInput.val("");
    dom.endMessage.css("display", "none");
    dom.endMessage.text("");
}

function resetGame(){
    if(window.prompt(`Start new game?`, `yes`)){
        startNewGame();
    }
}

dom.playButton.on("click", playGame);
dom.guessButton.on("click", checkNumber);
dom.resetButton.on("click", resetGame);
dom.startNewGameButton.on("click", startNewGame);

//From https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Execute a function when the user releases a key on the keyboard
dom.guessingInput.on("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        guessButton.click();
    }
});