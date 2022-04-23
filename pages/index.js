import Head from 'next/head'
import styles from "../styles/Home.module.css"
import { useEffect, useState } from "react";

const MODAL_TYPES = {
  0: "It's a draw",
  1: "X",
  2: "O"
}

const Modal = ({ type, onClose, isVisible }) => {
  return (
    <div className="modalBG">
      <div className="modal_container">
        <div className="modal_content">
          <h1>
            {MODAL_TYPES[type]}{MODAL_TYPES[type] !== "It's a draw" ? " won!" : "!"}
          </h1>
          <div className="footer">
            <button className="close" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
};



const Square = (props) => {
    if (!props.value) {
      return (
        <button
          className={`square sus_${props.sus}`}
          onClick={props.onClick}
          disabled={Boolean(props.winner)}
        />
      );
    }
    return (
      <button className={`square sus_${props.sus} square_${props.value.toLocaleLowerCase()}`} disabled>
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
    const [modalIsVisible, setModal] = useState(false);
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
          if (checkWinner(squaresCopy)) {
              setModal(true);
          } else {
          setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
          }
      }
  
      function restart() {
          setSquares(Array(9).fill(null));
          setWinner(null)
      }
  
      useEffect(() => {
          const winner = checkWinner(squares);
          if (winner) {
              setModal(true)
              setWinner(winner)
          }
          if (!winner && !squares.filter((square) => !square).length) {
              setWinner("draw");
              setModal(true)
          }
      })
  
      return (
          <div className="board-main">
              <div className="title"> Player {currentPlayer}&apos;s turn </div>
              {modalIsVisible && <Modal type={winner === "X" ? 1 : winner === "O" ? 2 : winner === "draw" ? 0 : false} onClose={() => 
                {
                  setModal(false)
                  restart()
  }} isVisible={modalIsVisible} />}
              <>
              {currentPlayer  && !modalIsVisible && <h1 className={currentPlayer.toLowerCase() + "turn"}>&nbsp;{currentPlayer}</h1>}
              </>
              {!modalIsVisible && <div className="grid">
                  {squares.map((square, i) => (
                      <Square
                          key={i}
                          sus={i}
                          value={square}
                          onClick={() => setSquare(i)}
                          winner={winner}
                      />
                  ))}
              </div>}
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
