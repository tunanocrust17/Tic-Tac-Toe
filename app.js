const gametime = (() => {
    function Gameboard () {
        const board = [0,0,0,0,0,0,0,0,0];
    
        const getBoard = () => board;
    
        const inputMarker = (position, player) => {
                board[position] = player;
        };
        
        const printBoard = () => {
            console.log(getBoard());
        }
    
        return {getBoard, 
            inputMarker, 
            printBoard};
    }

    const GameController = ((playerOne, playerTwo)=>{
        
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

        return {players,
            playRound, 
            printNewRound, 
            getActivePlayer, 
            switchPlayerTurn, 
            checkForWin, 
            checkForTie, 
            checkIfEmpty};
    })();


    const ControlScreen = (()=> {
        
        const displayToggle = () => {
            const formContainer = document.getElementById("pregame-display");
            const container = document.getElementById("game-display");


            formContainer.classList.toggle("inactive");
            container.classList.toggle("inactive");
        }

        const renderGame = () => {
            
            const  welcomeMessage = document.getElementById('welcomeMessage');
            welcomeMessage.innerHTML = "Tic Tac Toe!"
    
            GameController.players[0].name = document.getElementById('playerOne').value;
            GameController.players[1].name = document.getElementById('playerTwo').value;

            
            displayToggle();

        }

        const startButton = document.querySelector(".start-btn");
        startButton.addEventListener('click', renderGame)

        // const playerOneName = document.getElementById('playerOne').value;
        // const playerTwoName = document.getElementById('playerTwo').value;

        // GameController(playerOneName, playerTwoName);

        const box = document.querySelectorAll('.box');


        const playerNotification = document.querySelector('.notificationsH2');

        const updateScreen = () => {
            let checkWin = GameController.checkForWin();
            let checkTie = GameController.checkForTie();
            if(checkWin === true){
                GameController.switchPlayerTurn();
                playerNotification.innerHTML = `whoohoo! ${GameController.getActivePlayer().name} you won!`
            } else if(checkWin === false && checkTie === true){
                playerNotification.innerHTML = `${GameController.getActivePlayer().name}'s turn`
            } else if(checkTie === false){
                playerNotification.innerHTML = "Ah it's a tie, play again!";
            }
        }

        const playTheGame = (e)=>{
            const clickedBox = e.target.id;
            let target = document.getElementById(clickedBox)
            if(GameController.checkIfEmpty(clickedBox) === true){
                target.innerHTML = GameController.getActivePlayer().token;
                GameController.playRound(clickedBox)
                updateScreen();
            } else if(GameController.checkIfEmpty(clickedBox) === false){
                playerNotification.innerHTML = "whoops this spot is taken!";
            }

            console.log(GameController.printNewRound())

        }

        box.forEach((item) => {
            item.addEventListener('click', playTheGame)
        })

        return {playTheGame};
    })();

//Openning message, and starting game with displayToggle **********
    function setOpeningMessage () {
        // const game = GameController();

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

                        clearInterval(newWelcome)
                    },1000)
                }
            },50)
        }

        const startupScreen = () => {
            printOpeningMessage();
        }
        
        return{startupScreen}

    };


const message = setOpeningMessage();

window.addEventListener("load", message.startupScreen());
})();
//******************************** */