import React, { useState, useEffect } from 'react'
import './TicTacToe.css';

export default function TicTacToe() {
	var player1 = 'X'
	const [board, setBoard] = useState(Array(9).fill(''));
	const [currentPlayer, setCurrentPlayer] = useState(player1);
	const [winner, setWinner] = useState(null)

	function CellClick(index) {
		if (winner) return null;
		if (board[index] !== '') return null;
		setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item))
		setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
	}
	function checkResult() {
		const possibleWaysToWin = [
			board[0]+ board[1]+ board[2],
			board[3]+ board[4]+ board[5],
			board[6]+ board[7]+ board[8],
					
			board[0]+ board[3]+ board[6],
			board[1]+ board[4]+ board[7],
			board[2]+ board[5]+ board[8],
					
			board[0]+ board[4]+ board[8],
			board[6]+ board[4]+ board[2]
		];
		if (possibleWaysToWin.includes('XXX')) {
			setWinner('X venceu !')
		}
		else if (possibleWaysToWin.includes('OOO')) {
			setWinner('O venceu !')
		} else if (winner === null && !board.includes("")) {
			setWinner('Deu velha !')
		}
	}
	function resetGame() {
		setCurrentPlayer(player1)
		setBoard(Array(9).fill(""));
		setWinner(null);
	}
	useEffect(checkResult, [board]);
	return (
		<main>
			<h1 className="title"> Tic-Tac-Toe</h1>
			<div className='board'>
				{board.map((item, index) => (
					<div
						key={index}
						className={`cell ${(item)}`}
						onClick={() => CellClick(index)}>
						{item}
					</div>))}
			</div>
			<div className="footer">
				<button onClick={resetGame}>Recomeçar</button>
				{
					winner &&
					<h2 className="winner-message">
						<span className={winner}>{winner}</span>
					</h2>
				}
			</div>
		</main>
	);
}

