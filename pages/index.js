import Head from 'next/head'
import styles from "../styles/Home.module.css"
import { useEffect, useState } from "react";

const Square = (props) => {
    if (!props.value) {
      return (
        <button
          className="square"
          onClick={props.onClick}
          disabled={Boolean(props.winner)}
        />
      );
    }
    return (
      <button className={`square square_${props.value.toLocaleLowerCase()}`} disabled>
        {props.value}
      </button>
    );
  };
  
  function checkWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
   
  function Board() {
      const [squares, setSquares] = useState(Array(9).fill(null));
      const [currentPlayer, setCurrentPlayer] = useState(
          Math.round(Math.random() * 1) === 1 ? "X" : "O"
      );
      const [winner, setWinner] = useState(null);
  
      function setSquare(i) {
          const squaresCopy = [...squares];
          if (winner || squaresCopy[i]) {
              return;
          }
          squaresCopy[i] = currentPlayer;
          setSquares(squaresCopy);
          setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
  
      function restart() {
          setSquares(Array(9).fill(null));
          setWinner(null)
      }
  
      useEffect(() => {
          const winner = checkWinner(squares);
          if (winner) {
              setWinner(winner);
          }
          if (!winner && !squares.filter((square) => !square).length) {
              setWinner("draw");
          }
      })
  
      return (
          <div className="board-main">
              <div className="title"> Player {currentPlayer}&apos;s turn </div>
              {winner && winner != "draw" && <p>Congratulations {winner}, you have won!</p>}
              {winner && winner == "draw" && <p>It&apos;s a draw!</p>}
              <div className="grid">
                  {squares.map((square, i) => (
                      <Square
                          key={i}
                          value={square}
                          onClick={() => setSquare(i)}
                          winner={winner}
                      />
                  ))}
              </div>
              <button className="restart" onClick={restart}>Restart</button>
          </div>
      );
  }
 

const Home = () => {
   return (
     <div className={styles.container}>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>

      <main className={styles.main}>
          <Board />
      </main>
    </div>
   )
}

export default Home
