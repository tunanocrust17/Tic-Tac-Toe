let boardBox = document.querySelectorAll('.box');

boardBox.forEach((item)=>{
    item.addEventListener('click', ()=>{
        alert("hi!")
    })
})

function createGameboard () {
    const board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;

    const inputMarker = (position, player) => {
            board[position] = player;
    };
    
    const printBoard = () => {
        console.log(getBoard());
    }

    return {getBoard,inputMarker, printBoard};
}

function GameController(playerOne = "Player One", playerTwo = "Player Two"){
    
    const board = createGameboard();

    const players = [
        {
            name: playerOne,
            token: 1,
        },
        {
            name: playerTwo,
            token: 2,
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

    const playRound = (position) => {
        if (board.getBoard()[position] === 0) {
        board.inputMarker(position, getActivePlayer().token)
        switchPlayerTurn();
        printNewRound();
        } else {
            console.log("Whoops, this spots already taken. Try again!")
            return
        }
    }

    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();