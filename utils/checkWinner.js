export default function checkWinner(squares) {
    const twodsquare = [
        [squares[0], squares[1], squares[2]],
        [squares[3], squares[4], squares[5]],
        [squares[6], squares[7], squares[8]],
    ]
    for (let i = 0; i < twodsquare.length; i++) {
        if (twodsquare[0][i] && twodsquare[0][i] === twodsquare[1][i] && twodsquare[1][i] === twodsquare[2][i]) {
            return twodsquare[0][i];
        }
        if (twodsquare[i][0] && twodsquare[i][0] === twodsquare[i][1] && twodsquare[i][1] === twodsquare[i][2]) {
            return twodsquare[i][0];
        }
        if (twodsquare[0][0] && twodsquare[0][0] === twodsquare[1][1] && twodsquare[1][1] === twodsquare[2][2]) {
            return twodsquare[0][0];
        }
        if (twodsquare[0][2] && twodsquare[0][2] === twodsquare[1][1] && twodsquare[1][1] === twodsquare[2][0]) {
            return twodsquare[0][2];
        }
    }
    return null;
}