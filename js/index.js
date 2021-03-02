const dom = {};
dom.playButton = document.getElementById("playButton");
dom.guessButton = document.getElementById("guessButton");
dom.resetButton = document.getElementById("resetButton");
dom.startNewGameButton = document.getElementById("startNewGameButton");
dom.selectLevelDiv = document.getElementById("selectLevelDiv");
dom.guessTheNumberDiv = document.getElementById("guessTheNumberDiv");
dom.guessTableDiv = document.getElementById("guessTableDiv");
dom.numberOfTriesRemaining = document.getElementById("numberOfTriesRemaining");
dom.numberOfTries = document.getElementById("numberOfTries");
dom.guessingInput = document.getElementById("guessingInput");
dom.from = document.getElementById("from");
dom.to = document.getElementById("to");
dom.guessTable = document.getElementById("guess-table");
dom.tbodyRef = dom.guessTable.tBodies[0];
//dom.tableRows = guessTable.rows;
//dom.rowCount = tableRows.length;  

//another way:
//dom.tbodyRef = document.getElementById("guess-table").getElementsByTagName("tbody")[0];
//dom.tableRows = guessTable.getElementsByTagName("tr");

dom.labelForSelectLevelDropDown = document.querySelector("label[for=selectLevelDropDown]");
dom.selectLevelDropDown = document.getElementById("selectLevelDropDown");
dom.playingLevel = document.getElementById("playingLevel");

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
        gameVariables.maxTries = 5;
        dom.playingLevel.innerText = "Playing Level: Easy";
    }else if(gameVariables.difficulty === "basic"){
        gameVariables.maxValue = 50;
        gameVariables.maxTries = 7;
        dom.playingLevel.innerText = "Playing Level: Basic";
    }else{
        gameVariables.maxValue = 100;
        gameVariables.maxTries = 8;
        dom.playingLevel.innerText = "Playing Level: Advanced";
    }
    
    gameVariables.tries = gameVariables.maxTries;
    dom.numberOfTriesRemaining.innerText = gameVariables.maxTries;
    dom.numberOfTries.innerText = gameVariables.maxTries;
    dom.from.innerText=`${gameVariables.minValue}`;
    dom.to.innerText=`${gameVariables.maxValue}`;
    
    gameVariables.randomNumber =  Math.floor(Math.random() * (gameVariables.maxValue - gameVariables.minValue + 1)) + gameVariables.minValue;
    // console.log(randomNumber);
    
    dom.selectLevelDropDown.style.display = "none";
    dom.playButton.style.display = "none";
    dom.labelForSelectLevelDropDown.style.display = "none";
    dom.playingLevel.style.display = "block";
    dom.guessTheNumberDiv.style.display = "block";
}

function checkNumber(){
    let tableVariables = {
        guessNumber: undefined,
        newRow: undefined,
        newCellText: undefined,
        newCellNumber: undefined,
        insertedText: undefined
    };

    tableVariables.guessNumber = Number(guessingInput.value);
    dom.guessTableDiv.style.display = "block";
    
    if(tableVariables.guessNumber < gameVariables.minValue || tableVariables.guessNumber > gameVariables.maxValue){
        alert(`Please, enter a number in range: ${gameVariables.minValue},${gameVariables.maxValue}`);
        
        //prevent displaying of table, if our first guess is a number, that is out of range
        if(gameVariables.count === 1){
            dom.guessTableDiv.style.display = "none";
        }
    }else if(tableVariables.guessNumber > gameVariables.randomNumber && gameVariables.count < gameVariables.maxTries){
        gameVariables.count++;
        gameVariables.tries--;
        dom.numberOfTriesRemaining.innerText = gameVariables.tries;
        
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin", `<tr><td>${guessNumber}</td><td>high</td></tr>`);
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        
        tableVariables.insertedText = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        
        tableVariables.insertedText = document.createTextNode(`high`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        // console.log(`count = ${count}`);
    }else if(tableVariables.guessNumber < gameVariables.randomNumber && gameVariables.count < gameVariables.maxTries){
        gameVariables.count++;
        gameVariables.tries--;
        dom.numberOfTriesRemaining.innerText = gameVariables.tries;
        
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin", `<tr><td>${guessNumber}</td><td>low</td></tr>`);
        
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        
        tableVariables.insertedText = document.createTextNode(`low`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        // console.log(`count = ${count}`);
    }else if(tableVariables.guessNumber === gameVariables.randomNumber){
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        
        tableVariables.insertedText = document.createTextNode(`win`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        
        dom.guessTheNumberDiv.style.display = "none";
        dom.playingLevel.innerText = `Bravo! You guessed my number (${gameVariables.randomNumber}) from ${gameVariables.count} tries`;
        dom.startNewGameButton.style.display = "block";
    }else{
        tableVariables.newRow = dom.tbodyRef.insertRow(0);
        
        tableVariables.newCellNumber = tableVariables.newRow.insertCell();
        tableVariables.newCellText = tableVariables.newRow.insertCell();
        tableVariables.insertedText = document.createTextNode(`${tableVariables.guessNumber}`);
        tableVariables.newCellNumber.appendChild(tableVariables.insertedText);
        
        tableVariables.insertedText = document.createTextNode(`loss`);
        tableVariables.newCellText.appendChild(tableVariables.insertedText);
        
        dom.guessTheNumberDiv.style.display = "none";
        dom.playingLevel.innerText = `You lose! My number was (${gameVariables.randomNumber})`;
        dom.startNewGameButton.style.display = "block";
    }
}

function startNewGame(){
    gameVariables.randomNumber = undefined;
    gameVariables.count = 1;
    gameVariables.maxValue = undefined;
    gameVariables.tries = undefined;
    gameVariables.maxTries = undefined; 
    gameVariables.difficulty = undefined;
    
    dom.guessTheNumberDiv.style.display = "none";
    dom.playingLevel.style.display = "none";
    dom.selectLevelDropDown.style.display = "inline-block";
    dom.labelForSelectLevelDropDown.style.display = "inline";
    dom.playButton.style.display = "inline-block";
    
    dom.guessTableDiv.style.display = "none";
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()});
    dom.playingLevel.innerHTML = "Playing Level: <span></span>";
    dom.startNewGameButton.style.display="none";
    dom.guessingInput.value="";
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