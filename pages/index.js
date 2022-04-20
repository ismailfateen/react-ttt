import Head from 'next/head'
import Square from "../components/Square"
import { useState } from "react"

const styles = {
    status: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center'
    },
    board: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: '100px',
        height: '100px',
        border: '1px solid #ccc',
        margin: '0 auto',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        cursor: 'pointer'
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '0 auto',
        width: '100%',
        textAlign: 'center'
    }
}

export default function Home() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(true)
    const [winner, setWinner] = useState(null)
    const [draw, setDraw] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [computer, setComputer] = useState(false)
    const [computerTurn, setComputerTurn] = useState(false)
    const [computerMove, setComputerMove] = useState(null)

    const handleClick = (index) => {
      checkWinner()
        if (winner || draw || gameOver) {
            return
        }
        if (board[index] !== null) {
            return
        }
        if (turn) {
            setBoard(board.map((square, i) => i === index ? "X" : square))
            setTurn(false)
        } else {
            setBoard(board.map((square, i) => i === index ? "O" : square))
            setTurn(true)
        }
    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],  
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i]
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a])
                setGameOver(true)
                return  
            }
        }
        if (board.every(square => square !== null)) {
            setDraw(true)
            setGameOver(true) 
            return
        }
        return null
    }

    const handleComputer = () => {
        setComputer(true)
        setComputerTurn(true)
       let moves = [];
       for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                moves.push(i);
            }
        }
        const move = moves[Math.floor((Math.random()*moves.length))]
        setComputerMove(move)
        handleClick(computerMove)
        checkWinner()
        setComputerTurn(false)
        setComputer(false)
    }

    const handleRestart = () => {
        setBoard(Array(9).fill(null))
        setWinner(null)
        setDraw(false)
        setGameOver(false)
        setComputer(false)
        setComputerTurn(false)
        setComputerMove(null)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Tic Tac Toe</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.title}>
                <h1>Tic Tac Toe</h1>
            </div>
            <div className={styles.board}>
                <div className={styles.row}>
                    <Square value={board[0]} onClick={() => handleClick(0)} />
                    <Square value={board[1]} onClick={() => handleClick(1)} /> 
                    <Square value={board[2]} onClick={() => handleClick(2)} />
                </div>
                <div className={styles.row}>
                    <Square value={board[3]} onClick={() => handleClick(3)} />
                    <Square value={board[4]} onClick={() => handleClick(4)} /> 
                    <Square value={board[5]} onClick={() => handleClick(5)} />
                </div>
                <div className={styles.row}>
                    <Square value={board[6]} onClick={() => handleClick(6)} />
                    <Square value={board[7]} onClick={() => handleClick(7)} />
                    <Square value={board[8]} onClick={() => handleClick(8)} />
                </div>
            </div>
            <div className={styles.status}>
                {winner && <h2>{winner} wins!</h2>}
                {draw && <h2>Draw!</h2>}
                {gameOver && <h2>Game Over!</h2>}
                {computer && <h2>Computer&apos;s Turn</h2>}
                {computerTurn && <h2>Computer&apos;s Turn</h2>}
                {!computer && !computerTurn && <h2>Your Turn</h2>}
                {!computer && !computerTurn && <button onClick={() => handleComputer()}>Computer&apos;s Turn</button>}
                {!computer && !computerTurn && <button onClick={() => handleRestart()}>Restart</button>}
            </div>
        </div>
    )
}

