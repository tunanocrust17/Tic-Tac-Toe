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

function GameController(playerOne, playerTwo){
    
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

    // printNewRound();

    return {playRound, printNewRound, getActivePlayer, switchPlayerTurn, checkForWin, checkForTie, checkIfEmpty};
}


function ControlScreen() {
    const playerOneName = document.getElementById('playerOne').value;
    const playerTwoName = document.getElementById('playerTwo').value;
    console.log(playerOneName);
    
    const game = GameController(playerOneName, playerTwoName);
    // const  welcomeMessage = document.getElementById('welcomeMessage');
    // const container = document.querySelector('.container');
    const box = document.querySelectorAll('.box');


    const playerNotification = document.querySelector('.notificationsH2');

    const updateScreen = () => {
        let checkWin = game.checkForWin();
        let checkTie = game.checkForTie();
        if(checkWin === true){
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

        console.log(game.printNewRound())

    }

    box.forEach((item) => {
        item.addEventListener('click', playTheGame)
    })

    return {playTheGame};
}

//setting the opening message **********
function setOpeningMessage(){
    const game = GameController();

    const  welcomeMessage = document.getElementById('welcomeMessage');
    let openingMessage = "Hello Gamers! Let's play Tic Tac Toe!";
    let gamePlayMessage = "Choose your name:"

    const printOpeningMessage = ()=>{
        let count = 0;

        let intervalID = setInterval(() => {
            welcomeMessage.innerHTML += openingMessage.charAt(count);
            count++;
            if(count === openingMessage.length){
                clearInterval(intervalID);
                let newWelcome = setInterval(()=>{
                    welcomeMessage.innerHTML= gamePlayMessage;
                    const startButton = document.querySelector(".start-btn");
                    startButton.addEventListener('click', renderGame)
                    clearInterval(newWelcome)
                },1000)
            }
        },50)
    }

    // const getUserNames = () => {
    //     const formContainer = document.createElement("div");
    //     formContainer.setAttribute("id", "form-container");


    //     const createPlayerOne = ()=>{
    //     //create player one input
    //     const newDiv = document.createElement("div");
    //     newDiv.setAttribute("class", "form-row");
    //     let playerOneLabel = document.createElement("label");
    //     let playerOneText = document.createTextNode("Player One Name:")
    //     playerOneLabel.setAttribute("for", "playerOne");
    //     playerOneLabel.appendChild(playerOneText);
    //     newDiv.appendChild(playerOneLabel);
        
    //     let playerOneInput = document.createElement("input");
    //     playerOneInput.setAttribute("type", "text");
    //     playerOneInput.setAttribute("id", "playerOne");
    //     playerOneInput.setAttribute("placeholder", "Player One")
    //     newDiv.appendChild(playerOneInput);

    //     formContainer.appendChild(newDiv);
    //     document.body.appendChild(formContainer);
    // }

    //     const createPlayerTwo = ()=>{
    //     //create player two input
    //     const newDiv = document.createElement("div");
    //     newDiv.setAttribute("class", "form-row");
    //     let playerTwoLabel = document.createElement("label");
    //     let playerTwoText = document.createTextNode("Player Two Name:")
    //     playerTwoLabel.setAttribute("for", "playerTwo");
    //     playerTwoLabel.appendChild(playerTwoText);
    //     newDiv.appendChild(playerTwoLabel);
        
    //     let playerTwoInput = document.createElement("input");
    //     playerTwoInput.setAttribute("type", "text");
    //     playerTwoInput.setAttribute("id", "playerTwo");
    //     playerTwoInput.setAttribute("placeholder", "Player Two")
    //     newDiv.appendChild(playerTwoInput);

    //     formContainer.appendChild(newDiv);
    //     document.body.appendChild(formContainer);
    // }

    // const createStartButton = ()=>{
    //     const startButton = document.createElement("button");
    //     const startTextNode = document.createTextNode("Start Game");
    //     startButton.setAttribute("class", "start-btn")
    //     startButton.setAttribute("type", "submit");
    //     startButton.appendChild(startTextNode);


    //     formContainer.appendChild(startButton);
    //     document.body.appendChild(formContainer);
    // }

    //     createPlayerOne();
    //     createPlayerTwo();
    //     createStartButton();
    // }

    const startupScreen = () => {
        printOpeningMessage();
    }

    // const createGameBoard = () => {
    //     const container = document.createElement("div");
    //     container.setAttribute('class', 'container');

    //     const newBoard = document.createElement("div");
    //     newBoard.setAttribute('class', 'board');

    //     const boardRow = document.createElement("div");
    //     boardRow.setAttribute('class', 'boardRow')

    //     const playerNotifications = document.createElement('div');
    //     playerNotifications.setAttribute('class', 'playerNotifications');

    //     const notificationsH2 = document.createElement('h2');
    //     notificationsH2.setAttribute('class', 'notificationsH2');
    //     playerNotifications.appendChild(notificationsH2);


    //     for( i = 0 ; i <= 8 ; i++){
    //         var newDiv = document.createElement("div");

    //         newDiv.setAttribute('id', i);
    //         newDiv.setAttribute("class", "box");

    //         boardRow.appendChild(newDiv);
    //     }

    //     newBoard.appendChild(boardRow);
    //     container.appendChild(newBoard);
    //     document.body.appendChild(container);
    //     document.body.appendChild(playerNotifications);
    // }

    const displayToggle = () => {
        const formContainer = document.getElementById("pregame-display");
        const container = document.getElementById("game-display");


        formContainer.classList.toggle("inactive");
        container.classList.toggle("inactive");
    }

    const renderGame = () => {
        const  welcomeMessage = document.getElementById('welcomeMessage');



        // const formRow = document.getElementById("form-container");
        // formRow.classList.toggle('inactive')
        // formRow.style.display = "none";

        welcomeMessage.innerHTML = "Tic Tac Toe!"

        // createGameBoard();
        ControlScreen();
        displayToggle();
        



        console.log('testing')
    }
    
    return{startupScreen}
}

const message = setOpeningMessage();

window.addEventListener("load", message.startupScreen());
//******************************** */