const gametime = (() => {
    const Gameboard = (() => {
        let board = [0,0,0,0,0,0,0,0,0];
    
        const getBoard = () => board;
    
        const inputMarker = (position, player) => {
                board[position] = player;
        };
        
        const printBoard = () => {
            console.log(getBoard());
        }

        const box = document.querySelectorAll('.box');

        const resetGame = () => {
            
            for(let i = 0; i < board.length ; i++) {
                board[i] = 0
            }

            box.forEach((item) => {
                item.innerHTML = "";
            })
            Gameboard.printBoard(); 
        }

    
        return {
            getBoard, 
            inputMarker, 
            printBoard,
            resetGame};
    })();

    const GameController = ((playerOne, playerTwo) => {

        const players = [
            {
                name: playerOne,
                token: "X",
                score: 0,
            },
            {
                name: playerTwo,
                token: "O",
                score: 0,
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
            Gameboard.printBoard();
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
                let a = Gameboard.getBoard()[winningComboCheck[0]];
                let b = Gameboard.getBoard()[winningComboCheck[1]];
                let c = Gameboard.getBoard()[winningComboCheck[2]];

                if( a === 0 || b === 0 || c === 0 ){
                    continue
                } else if( a === b && b === c) {
                    didTheyWin = true;
                }
            }
            return didTheyWin;
        }

        const checkForTie = () => {
            let didTheyTie = Gameboard.getBoard().includes(0);
            return didTheyTie;
        }

        const checkIfEmpty = (position) => {
            let emptyCheck = true;
            if(Gameboard.getBoard()[position] != 0){
                emptyCheck = false;
            }
            return emptyCheck;
        }

        const playRound = (position) => {
                Gameboard.inputMarker(position, getActivePlayer().token)
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


    const ControlScreen = (() => {
        
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
            setScoreHeading();

        }

        const box = document.querySelectorAll('.box');

        const playerNotification = document.querySelector('.notificationsH2');

        const updateScreen = () => {
            let checkWin = GameController.checkForWin();
            let checkTie = GameController.checkForTie();
            if(checkWin === true){
                GameController.switchPlayerTurn();
                playerNotification.innerHTML = `whoohoo! ${GameController.getActivePlayer().name} you won!`
                GameController.getActivePlayer().score++;
                updateScores();
                console.log(GameController.getActivePlayer().score)
            } else if(checkWin === false && checkTie === true){
                playerNotification.innerHTML = `${GameController.getActivePlayer().name}'s turn`
            } else if(checkTie === false){
                playerNotification.innerHTML = "Ah it's a tie, play again!";
            }
        }

        const playTheGame = (e) => {
            const clickedBox = e.target.id;
            let target = document.getElementById(clickedBox)
            if(GameController.checkIfEmpty(clickedBox) === true){
                target.innerHTML = GameController.getActivePlayer().token;
                GameController.playRound(clickedBox)
                updateScreen();
            } else if(GameController.checkIfEmpty(clickedBox) === false){
                playerNotification.innerHTML = "whoops this spot is taken!";
            }
        }

        box.forEach((item) => {
            item.addEventListener('click', playTheGame)
        })

        const setScoreHeading = () => {
            const playerOneHeading = document.querySelector('.playerOneHeading');
            playerOneHeading.innerHTML = `${GameController.players[0].name}'s Score`

            const playerTwoHeading = document.querySelector('.playerTwoHeading');
            playerTwoHeading.innerHTML = `${GameController.players[1].name}'s Score`
        }

        const updateScores = () => {
            const playerOneScore = document.querySelector('.playerOneScore');
            playerOneScore.innerHTML = GameController.players[0].score;

            const playerTwoScore = document.querySelector('.playerTwoScore');
            playerTwoScore.innerHTML = GameController.players[1].score;
        }

        const startButton = document.querySelector(".start-btn");
        startButton.addEventListener('click', renderGame)

        const resetBtn = document.getElementById('reset-btn');
        resetBtn.addEventListener('click', (e) => {
            Gameboard.resetGame();
            playerNotification.innerHTML = "Remember X goes first!"
        })

        return {playTheGame};
    })();

//Openning message, and starting game with displayToggle **********
    const setOpeningMessage = (() => {
        const  welcomeMessage = document.getElementById('welcomeMessage');
        let openingMessage = "Hello Gamers! Let's play Tic Tac Toe!";
        let gamePlayMessage = "Choose your name:"

        const printOpeningMessage = () => {
            let count = 0;

            let intervalID = setInterval(() => {
                welcomeMessage.innerHTML += openingMessage.charAt(count);
                count++;
                if(count === openingMessage.length){
                    clearInterval(intervalID);
                    let newWelcome = setInterval(() => {
                        welcomeMessage.innerHTML= gamePlayMessage;
                        clearInterval(newWelcome)
                    },1000)
                }
            },50)
        }
   
        window.addEventListener("load", printOpeningMessage());

    })();

})();
//******************************** */