function Gameboard () {
    const board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;

    const inputMarker = (position, player) => {
            board[position] = player;
    };
    
    const printBoard = () => {
        console.log(getBoard());
    }

    return {getBoard, inputMarker, printBoard};
}

function GameController(playerOne = "Player One", playerTwo = "Player Two"){
    
    const board = Gameboard();

    const players = [
        {
            name: playerOne,
            token: "X",
        },
        {
            name: playerTwo,
            token: "O",
        }
    ];

    let currentPlayer = players[0];

    const switchPlayerTurn = () => {
        if (currentPlayer === players[0]){
            currentPlayer = players[1]
        } else{
            currentPlayer = players[0]
        }
    };

    const getActivePlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn!`)
    }

    const winningCombos = [
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6]
    ];

    const checkForWin = () => {
        let didTheyWin = false;

        for(let i = 0 ; i <= 7 ; i++){
            const winningComboCheck = winningCombos[i];
            let a = board.getBoard()[winningComboCheck[0]];
            let b = board.getBoard()[winningComboCheck[1]];
            let c = board.getBoard()[winningComboCheck[2]];

            if( a === 0 || b === 0 || c === 0 ){
                continue
            } else if( a === b && b === c) {
                didTheyWin = true;
            }
        }
        return didTheyWin;
    }

    const checkForTie = () => {
        let didTheyTie = board.getBoard().includes(0);
        return didTheyTie;
    }

    const checkIfEmpty = (position)=>{
        let emptyCheck = true;
        if(board.getBoard()[position] != 0){
            emptyCheck = false;
        }
        return emptyCheck;
    }

    const playRound = (position) => {
            board.inputMarker(position, getActivePlayer().token)
            switchPlayerTurn();
    }

    printNewRound();

    return {playRound, getActivePlayer, switchPlayerTurn, checkForWin, checkForTie, checkIfEmpty};
}


function ControlScreen() {
    const game = GameController();
    const  welcomeMessage = document.getElementById('welcomeMessage');
    const container = document.querySelector('.container');
    const box = document.querySelectorAll('.box');

    const bodyTest = document.body;

    const playerNotification = document.querySelector('.notificationsH2');

    const updateScreen = () => {
        let checkWin = game.checkForWin();
        let checkTie = game.checkForTie();
        if(checkWin === true){
            bodyTest.replaceChildren(welcomeMessage);
            game.switchPlayerTurn();
            playerNotification.innerHTML = `whoohoo! ${game.getActivePlayer().name} you won!`
        } else if(checkWin === false && checkTie === true){
            playerNotification.innerHTML = `${game.getActivePlayer().name}'s turn`
        } else if(checkTie === false){
            playerNotification.innerHTML = "Ah it's a tie, play again!";
        }
    }

    const playTheGame = (e)=>{
        const clickedBox = e.target.id;
        let target = document.getElementById(clickedBox)
        if(game.checkIfEmpty(clickedBox) === true){
            target.innerHTML = game.getActivePlayer().token;
            game.playRound(clickedBox)
            updateScreen();
        } else if(game.checkIfEmpty(clickedBox) === false){
            playerNotification.innerHTML = "whoops this spot is taken!";
        }

    }

    box.forEach((item) => {
        item.addEventListener('click', playTheGame)
    })

    return {playTheGame};
}

ControlScreen();


//setting the opening message **********
function setOpeningMessage(){
    const  welcomeMessage = document.getElementById('welcomeMessage');
    let openingMessage = "Hello Gamers! Let's play Tic Tac Toe!";
    let gamePlayMessage = "Choose your name:"

    // const newDiv = document.createElement("div");

    // let nameInputField = document.createElement("input")
    // nameInputField.setAttribute("type", "text");


    const printOpeningMessage = ()=>{
        let count = 0;

        let intervalID = setInterval(() => {
            welcomeMessage.innerHTML += openingMessage.charAt(count);
            count++;
            if(count === openingMessage.length){
                clearInterval(intervalID);
                setInterval(()=>{
                    welcomeMessage.innerHTML=gamePlayMessage;
 
                },3000)
            }
        },50)
    }

    const getUserNames = () => {
        const newDiv = document.createElement("div");

        //create player one input
        let playerOneLabel = document.createElement("label");
        let playerOneText = document.createTextNode("Player One Name:")
        playerOneLabel.setAttribute("for", "playerOne");
        playerOneLabel.appendChild(playerOneText);
        newDiv.appendChild(playerOneLabel);
        
        let playerOneInput = document.createElement("input");
        playerOneInput.setAttribute("type", "text");
        playerOneInput.setAttribute("id", "playerOne");
        playerOneInput.setAttribute("placeholder", "Player One")
        newDiv.appendChild(playerOneInput);

        //create player two input
        let playerTwoLabel = document.createElement("label");
        let playerTwoText = document.createTextNode("Player Two Name:")
        playerTwoLabel.setAttribute("for", "playerTwo");
        playerTwoLabel.appendChild(playerTwoText);
        newDiv.appendChild(playerTwoLabel);
        
        let playerTwoInput = document.createElement("input");
        playerTwoInput.setAttribute("type", "text");
        playerTwoInput.setAttribute("id", "playerTwp");
        playerTwoInput.setAttribute("placeholder", "Player Two")
        newDiv.appendChild(playerTwoInput);

        document.body.appendChild(newDiv)
    }

    const startupScreen = () => {
        printOpeningMessage();
        getUserNames();
    }

    
    return{startupScreen}
}

const message = setOpeningMessage();

window.addEventListener("load", message.startupScreen());
//******************************** */