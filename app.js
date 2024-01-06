function createGameboard () {
    const board = [0,0,0,0,0,0,0,0,0];

    const getBoard = () => board;

    const inputMarker = (position, player) => {
        if(board[position] === 0 ){
            board[position]= player;
        } else {
            return
        }
    };
    
    const printBoard = () => {
        // const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(getBoard());
    }

    return {getBoard,inputMarker, printBoard};

}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {getValue, addToken}
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
        board.inputMarker(position, getActivePlayer().token)

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {playRound, getActivePlayer};
}

const game = GameController();