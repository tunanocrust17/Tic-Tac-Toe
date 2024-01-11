function createGameboard () {
    const board = [0,0,0,0,0,0,0,0,0];

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

    const getBoard = () => board;

    const inputMarker = (position, player) => {
            board[position] = player;
    };

    const checkForWin = () => {
        let didTheyWin = false;

        for(let i = 0 ; i <= 7 ; i++){
            const winningComboCheck = winningCombos[i];
            let a = board[winningComboCheck[0]];
            let b = board[winningComboCheck[1]];
            let c = board[winningComboCheck[2]];

            console.log(a);
            console.log(b);
            console.log(c);

            if( a === 0 || b === 0 || c === 0 ){
                continue
            } else if( a === b && b === c) {
                didTheyWin = true;
            }
        }

        console.log(didTheyWin)
        return didTheyWin;
    }

    const checkForTie = () => {
        let didTheyTie = board.includes(0);
        console.log(didTheyTie);
        console.log("did they tie? " + didTheyTie);
        // if(a === false){
        //     didTheyTie = true;
        // }
        return didTheyTie;
    }

    const checkIfEmpty = (position) => {
        if(board[position] != 0){
            domControl.playerNotification.innerHTML="Whoops, this spots already taken. Try again!";
            return
        }
    }
    
    const printBoard = () => {
        console.log(getBoard());
    }

    return {getBoard,inputMarker, checkForWin, checkForTie, checkIfEmpty, printBoard};
}

function GameController(playerOne = "Player One", playerTwo = "Player Two"){
    
    const board = createGameboard();

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

    const gameStatus = () => {
        let checkWin = board.checkForWin();
        let checkTie = board.checkForTie();
        if(checkTie === false){
            console.log(`oh dang looks like you tied, play again!`)
        } else if (checkWin === false ){
            switchPlayerTurn();
            printNewRound();
        } else {
            console.log(`whoohoo! ${getActivePlayer().name} you won!`)
        }
    }

    const playRound = (position) => {
        if (board.getBoard()[position] === 0) {
            board.inputMarker(position, getActivePlayer().token)
            gameStatus();
        } else {
            board.checkIfEmpty(position);
        }
    }

    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();

const domControl = {
    box: document.querySelectorAll('.box'),
    welcomeMessage: document.getElementById('welcomeMessage'),
    insertToken: function(e){
        const clickedBox = e.target.id;
        this.innerHTML = game.getActivePlayer().token;
        game.playRound(clickedBox);
        },
    playerNotification: document.querySelector('.notificationsH2')
    }

domControl.box.forEach((item)=>{
    item.addEventListener('click', domControl.insertToken)
    })





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