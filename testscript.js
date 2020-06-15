var scores, roundScore, activePlayer, gamePlaying; //def global var's
var lastScore = 0;
var lastScore2 = 0;

startGame();//runs the startGame function
var newGame = document.querySelector(".btn-new");
var rollDice = document.querySelector(".btn-roll");
var hold = document.querySelector(".btn-hold");

function startGame() {//puts all scores to 0 and clears the current score
    scores = [0, 0];//start score in array player 1 is index 0/ player 2 is index 1
    roundScore = 0; 
    activePlayer = 0;
    gamePlaying = true;
    clearBoard();
}
function clearBoard(){
    let playerPanel1 = document.querySelector(".player-0-panel");
    let playerPanel2 = document.querySelector(".player-1-panel");
    playerPanel1.classList.remove("winner");
    playerPanel2.classList.remove("winner");
    playerPanel1.classList.remove("active");
    playerPanel2.classList.remove("active");
    playerPanel1.classList.add("active");
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    diceDiplayNone();
}
function rolling(){//main game play function selects active player, dice number 
    if(gamePlaying) {
        var currentPlayer = document.querySelector(`#current-${activePlayer}`);//grabs index to detrimine current player
        var dice = Math.ceil(Math.random() * 6);
        var dice2 = Math.ceil(Math.random() * 6);
        var diceDisplay = document.querySelector("#dice");//picture of dice
        var diceDisplay2 = document.querySelector("#dice2");
        diceDisplay.style.display = "block";
        diceDisplay2.style.display = "block";
        diceDisplay.src = (`images/dice-${dice}.png`);//changes the images
        diceDisplay2.src = (`images/dice-${dice2}.png`);
        if ((lastScore === 6 || lastScore2 === 6) && (dice === 6  || dice2 === 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            //document.querySelector('#dice').style.display = 'none';
            //document.querySelector('#dice2').style.display = 'none';
            console.log(dice, dice2)
            rolledASix(diceDisplay, diceDisplay2);
        } else if (dice !== 1 && dice2 !== 1){ // uses game rules to set points and current player css 
            lastScore = dice;
            lastScore2 = dice2;
            roundScore += dice + dice2;
            currentPlayer.textContent = roundScore;
        } else {
            rolledAOne(diceDisplay, diceDisplay2);
        }
    } 
}
function rolledAOne(diceDisplay, diceDisplay2){
    diceDisplay.classList.add("oneDice");//rotating dice .class
    diceDisplay2.classList.add("oneDice");
    rollDice.style.display = "none";//hides the roll dice button while changing players
    setTimeout(() => {//So you can see you rolled a  but then clears the board
        diceDisplay.style.display = "none";//clears dice picture for next players roll
        diceDisplay.classList.remove("oneDice");//removes spinning dice
        diceDisplay2.style.display = "none";//clears dice picture for next players roll
        diceDisplay2.classList.remove("oneDice");
        rollDice.style.display = "block";//shows roll dice button again
    }, 900) 
    nextPlayer();
        
}
function rolledASix(diceDisplay, diceDisplay2) {
    diceDisplay.src = ("images/dice-66.png");//changes the images to red dice
    diceDisplay2.src = ("images/dice-66.png");
    rollDice.style.display = "none";//hides the roll dice button while changing players
    setTimeout(() => {//So you can see you rolled a  but then clears the board
        diceDisplay.style.display = "none";//clears dice picture for next players roll
        diceDisplay2.style.display = "none";
        rollDice.style.display = "block";//shows roll dice button again
        
    }, 1000) 
    nextPlayer();
    
}
function nextPlayer (){
    lastScore = 0;
    lastScore2 = 0;
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;//if rolls a 1 then clears score
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(".player-0-panel").classList.toggle("active");//clears/ adds css
    document.querySelector(".player-1-panel").classList.toggle("active");
}
function holdCheckWinner(){
    if(gamePlaying){
        var newUserScore = document.querySelector('#userScore').value;
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        diceDiplayNone();
        if (scores[activePlayer] >= (newUserScore > 0? newUserScore: 100)) {
            diceDiplayNone();
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }  
}
function diceDiplayNone() {
    document.querySelector('#dice').style.display = 'none';
    document.querySelector('#dice2').style.display = 'none';

} 
hold.addEventListener("click", holdCheckWinner)
newGame.addEventListener("click", startGame);
rollDice.addEventListener("click", rolling);
window.document.addEventListener("click", function(){
    document.querySelector(".rules").style.display = "none";
})