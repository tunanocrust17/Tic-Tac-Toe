let boardBox = document.querySelectorAll('.box');

boardBox.forEach((item)=>{
    item.addEventListener('click', (e)=>{
        const clickedBox = e.target.id;
        game.playRound(clickedBox);
    })
})

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
    
    const printBoard = () => {
        console.log(getBoard());
    }

    return {getBoard,inputMarker, checkForWin, printBoard};
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

    const playRound = (position) => {
        if (board.getBoard()[position] === 0) {
            board.inputMarker(position, getActivePlayer().token)
            let checkWin = board.checkForWin();
            if(checkWin === false ){
                switchPlayerTurn();
                printNewRound();
            } else {
                console.log(`whoohoo! ${getActivePlayer().name} you won!`)
            }
        } else {
            console.log("Whoops, this spots already taken. Try again!")
            return
        }
    }

    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();