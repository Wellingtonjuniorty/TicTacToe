import React, { useState, useEffect } from 'react'
import './TicTacToe.css';

export default function TicTacToe() {
	var player1 = 'X'
	const [board, setBoard] = useState(Array(9).fill(""));
	const [currentPlayer, setCurrentPlayer] = useState(player1);
	const [winner, setWinner] = useState()
	function CellClick(index) {
		if (winner) return null;
		if (board[index] !== '') return null;
		setBoard(board.map((item, itemIndex) => itemIndex === index ? currentPlayer : item))
		setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O');
	}
	function checkResult() {
		const possibleWaysToWin = [
			[board[0], board[1], board[2]],
			[board[3], board[4], board[5]],
			[board[6], board[7], board[8]],

			[board[0], board[3], board[6]],
			[board[1], board[4], board[7]],
			[board[2], board[5], board[8]],

			[board[0], board[4], board[8]],
			[board[6], board[4], board[2]]
		];
		possibleWaysToWin.forEach(cells => {
			if (cells.every(cell => cell === 'O')) setWinner('O venceu !');
			if (cells.every(cell => cell === 'X')) setWinner('X venceu !');
		})
		if (!board.includes("") && winner === undefined) setWinner('Deu Velha !');
	}
	function resetGame() {
		setCurrentPlayer(player1)
		setBoard(Array(9).fill(""));
		setWinner(undefined);
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
				<button on onClick={resetGame}>Recomeçar</button>
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

