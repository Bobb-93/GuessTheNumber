const playButton = document.getElementById("playButton");
const guessButton = document.getElementById("guessButton");
const resetButton = document.getElementById("resetButton");
const startNewGameButton = document.getElementById("startNewGameButton");

const selectLevelDiv = document.getElementById("selectLevelDiv");
const guessTheNumberDiv = document.getElementById("guessTheNumberDiv");
const guessTableDiv = document.getElementById("guessTableDiv");
const numberOfTriesRemaining = document.getElementById("numberOfTriesRemaining");
const numberOfTries = document.getElementById("numberOfTries");
const guessingInput = document.getElementById("guessingInput");
const from = document.getElementById("from");
const to = document.getElementById("to");

const guessTable = document.getElementById("guess-table");
const tbodyRef = guessTable.tBodies[0];
//let tableRows = guessTable.rows;
// let rowCount = tableRows.length;  

//another way:
//let tbodyRef = document.getElementById("guess-table").getElementsByTagName("tbody")[0];
//let tableRows = guessTable.getElementsByTagName("tr");

const labelForSelectLevelDropDown = document.querySelector("label[for=selectLevelDropDown]");
const selectLevelDropDown = document.getElementById("selectLevelDropDown");
const playingLevel = document.getElementById("playingLevel");

let randomNumber, count = 1, minValue = 1, maxValue, tries, maxTries, difficulty;

function playGame(){
    difficulty = selectLevelDropDown.value;
    console.log(`difficulty = ${difficulty}`);
    if(difficulty === "easy"){
        maxValue = 10;
        maxTries = 5;
        playingLevel.innerText = "Playing Level: Easy";
    }else if(difficulty === "basic"){
        maxValue = 50;
        maxTries = 7;
        playingLevel.innerText = "Playing Level: Basic";
    }else{
        maxValue = 100;
        maxTries = 8;
        playingLevel.innerText = "Playing Level: Advanced";
    }
    
    tries = maxTries;
    numberOfTriesRemaining.innerText = maxTries;
    numberOfTries.innerText = maxTries;
    from.innerText=`${minValue}`;
    to.innerText=`${maxValue}`;
    
    let min = minValue;
    let max = maxValue;
    
    randomNumber =  Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    // console.log(randomNumber);
    
    selectLevelDropDown.style.display = "none";
    playButton.style.display = "none";
    labelForSelectLevelDropDown.style.display = "none";
    playingLevel.style.display = "block";
    guessTheNumberDiv.style.display = "block";
}

function checkNumber(){
    let guessNumber; 
    let newRow, newCellText, newCellNumber, insertedText;
    
    guessNumber = Number(guessingInput.value);
    guessTableDiv.style.display = "block";
    
    if(guessNumber < minValue || guessNumber > maxValue){
        alert(`Please, enter a number in range: ${minValue},${maxValue}`);
        
        //prevent displaying of table, if our first guess is a number, that is out of range
        if(count === 1){
            guessTableDiv.style.display = "none";
        }
    }else if(guessNumber > randomNumber && count < maxTries){
        count++;
        tries--;
        numberOfTriesRemaining.innerText = tries;
        
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin", `<tr><td>${guessNumber}</td><td>high</td></tr>`);
        newRow = tbodyRef.insertRow(0);
        
        newCellNumber = newRow.insertCell();
        newCellText = newRow.insertCell();
        
        insertedText = document.createTextNode(`${guessNumber}`);
        newCellNumber.appendChild(insertedText);
        
        insertedText = document.createTextNode(`high`);
        newCellText.appendChild(insertedText);
        // console.log(`count = ${count}`);
    }else if(guessNumber < randomNumber && count < maxTries){
        count++;
        tries--;
        numberOfTriesRemaining.innerText = tries;
        
        //NOT working:
        // tableRows[tableRows.length-1].insertAdjacentHTML("afterbegin", `<tr><td>${guessNumber}</td><td>low</td></tr>`);
        
        newRow = tbodyRef.insertRow(0);
        
        newCellNumber = newRow.insertCell();
        newCellText = newRow.insertCell();
        insertedText = document.createTextNode(`${guessNumber}`);
        newCellNumber.appendChild(insertedText);
        
        insertedText = document.createTextNode(`low`);
        newCellText.appendChild(insertedText);
        // console.log(`count = ${count}`);
    }else if(guessNumber === randomNumber){
        newRow = tbodyRef.insertRow(0);
        
        newCellNumber = newRow.insertCell();
        newCellText = newRow.insertCell();
        insertedText = document.createTextNode(`${guessNumber}`);
        newCellNumber.appendChild(insertedText);
        
        insertedText = document.createTextNode(`win`);
        newCellText.appendChild(insertedText);
        
        guessTheNumberDiv.style.display = "none";
        playingLevel.innerText = `Bravo! You guessed my number (${randomNumber}) from ${count} tries`;
        startNewGameButton.style.display = "block";
    }else{
        newRow = tbodyRef.insertRow(0);
        
        newCellNumber = newRow.insertCell();
        newCellText = newRow.insertCell();
        insertedText = document.createTextNode(`${guessNumber}`);
        newCellNumber.appendChild(insertedText);
        
        insertedText = document.createTextNode(`loss`);
        newCellText.appendChild(insertedText);
        
        guessTheNumberDiv.style.display = "none";
        playingLevel.innerText = `You lose! My number was (${randomNumber})`;
        startNewGameButton.style.display = "block";
    }
}

function startNewGame(){
    randomNumber = undefined;
    count = 1;
    maxValue = undefined;
    tries = undefined;
    maxTries = undefined; 
    difficulty = undefined;
    
    guessTheNumberDiv.style.display = "none";
    playingLevel.style.display = "none";
    selectLevelDropDown.style.display = "inline-block";
    labelForSelectLevelDropDown.style.display = "inline";
    playButton.style.display = "inline-block";
    
    guessTableDiv.style.display = "none";
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()});
    playingLevel.innerHTML = "Playing Level: <span></span>";
    startNewGameButton.style.display="none";
    guessingInput.value="";
}

function resetGame(){
    if(window.prompt(`Start new game?`, `yes`)){
        startNewGame();
    }
}

playButton.addEventListener("click", playGame);
guessButton.addEventListener("click", checkNumber);
resetButton.addEventListener("click", resetGame);
startNewGameButton.addEventListener("click", startNewGame);

//From https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
// Execute a function when the user releases a key on the keyboard
guessingInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        guessButton.click();
    }
});