function Gameboard () {
    const board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;

    const inputMarker = (position, player) => {
            board[position] = player;
    };
    
    const printBoard = () => {
        console.log(getBoard());
    }

    const checkIfEmpty = (position)=>{
        let emptyCheck = true;
        if(board[position] != 0){
            emptyCheck = false;
            domControl.playerNotification.innerHTML = "whoops this spot is taken!";
        }
        return emptyCheck;
    }

    return {getBoard, inputMarker, checkIfEmpty, printBoard};
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
        domControl.playerNotification.innerHTML = "Ah it's a tie, play again!";
        return didTheyTie;
    }


    const gameStatus = () => {
        let checkWin = checkForWin();
        let checkTie = checkForTie();
        if(checkWin === true){
            domControl.playerNotification.innerHTML = `whoohoo! ${getActivePlayer().name} you won!`
        } else if(checkWin === false && checkTie === true){
            switchPlayerTurn();
            printNewRound();
            domControl.playerNotification.innerHTML = `${getActivePlayer().name}'s turn`
        } 
    }

    const playRound = (position) => {
            board.inputMarker(position, getActivePlayer().token)
            gameStatus();
    }

    printNewRound();

    return {playRound, getActivePlayer, switchPlayerTurn, board};
}

const game = GameController();

const domControl = {
    box: document.querySelectorAll('.box'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    playTheRound: function(e){
        const clickedBox = e.target.id;
        if(game.board.checkIfEmpty(clickedBox) === true){
            this.innerHTML = game.getActivePlayer().token;
            game.playRound(clickedBox)
        } else {
            return
        }
    },
    playerNotification: document.querySelector('.notificationsH2')
    }

    domControl.box.forEach((item)=>{
        item.addEventListener('click', domControl.playTheRound)
        })

//setting the opening message **********
function setOpeningMessage(){
    let openingMessage = "Hello Gamers! Let's play Tic Tac Toe!";
    let gamePlayMessage = "Tic Tac Toe"


    const printOpeningMessage = ()=>{
        let count = 0;

        let intervalID = setInterval(() => {
            domControl.welcomeMessage.innerHTML += openingMessage.charAt(count);
            count++;
            if(count === openingMessage.length){
                clearInterval(intervalID);
                setInterval(()=>{
                    domControl.welcomeMessage.innerHTML=gamePlayMessage;
                },3000)
            }
        },50)
    }

    const startMessages = ()=> {        
        printOpeningMessage()
        };
    
    return{startMessages}
}

const message = setOpeningMessage();

window.addEventListener("load", message.startMessages());
//******************************** */