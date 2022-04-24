import Square from "./square";
import Modal from "./modal";
import {
    useState,
    useEffect
} from "react";
import checkWinner from "../utils/checkWinner";

export default   function Board() {
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
      }, [squares])
  
      return (
          <div className="board-main">
              <div className="title"> Player {currentPlayer}&apos;s turn </div>
              {modalIsVisible && <Modal type={winner === "X" ? 1 : winner === "O" ? 2 : winner === "draw" ? 0 : false} onClose={() => 
                {
                  setModal(false)
                  restart()
  }} />}
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