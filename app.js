function createGameboard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue))
        console.log(boardWithCellValues);
    }

    return {getBoard, printBoard};

}

function Cell() {
    let value = 5;

    const getValue = () => value;

    return {getValue}
}