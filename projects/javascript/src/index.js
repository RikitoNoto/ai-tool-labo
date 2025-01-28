///////////////////////
// Welcome to Cursor //
///////////////////////

/*
Step 1: Try generating a react component that lets you play tictactoe with Cmd+K or Ctrl+K on a new line.
  - Then integrate it into the code below and run with npm start

Step 2: Try highlighting all the code with your mouse, then hit Cmd+k or Ctrl+K. 
  - Instruct it to change the game in some way (e.g. add inline styles, add a start screen, make it 4x4 instead of 3x3)

Step 3: Hit Cmd+L or Ctrl+L and ask the chat what the code does

Step 4: To try out cursor on your own projects, go to the file menu (top left) and open a folder.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';

// 四目並べコンポーネント
function TicTacToe() {
  const [board, setBoard] = React.useState(Array(48).fill("")); // 8×6マス
  const [currentPlayer, setCurrentPlayer] = React.useState("X");
  const [winner, setWinner] = React.useState(null);

  // 勝者判定
  const checkWinner = (squares) => {
    // 横のチェック
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 5; col++) {
        const index = row * 8 + col;
        if (squares[index] && 
            squares[index] === squares[index + 1] && 
            squares[index] === squares[index + 2] &&
            squares[index] === squares[index + 3]) {
          return squares[index];
        }
      }
    }

    // 縦のチェック
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 8; col++) {
        const index = row * 8 + col;
        if (squares[index] &&
            squares[index] === squares[index + 8] &&
            squares[index] === squares[index + 16] &&
            squares[index] === squares[index + 24]) {
          return squares[index];
        }
      }
    }

    // 斜め（右下）のチェック
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const index = row * 8 + col;
        if (squares[index] &&
            squares[index] === squares[index + 9] &&
            squares[index] === squares[index + 18] &&
            squares[index] === squares[index + 27]) {
          return squares[index];
        }
      }
    }

    // 斜め（左下）のチェック
    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 8; col++) {
        const index = row * 8 + col;
        if (squares[index] &&
            squares[index] === squares[index + 7] &&
            squares[index] === squares[index + 14] &&
            squares[index] === squares[index + 21]) {
          return squares[index];
        }
      }
    }

    return null;
  };

  // マス目クリック時の処理
  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // ゲームリセット
  const resetGame = () => {
    setBoard(Array(48).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>四目並べ</h1>
      <div style={{ display: 'inline-block' }}>
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <div key={row} style={{ display: 'flex' }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
              const index = row * 8 + col;
              return (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  style={{
                    width: '50px',
                    height: '50px',
                    margin: '2px',
                    fontSize: '24px',
                    color: board[index] === 'X' ? 'red' : 'blue'
                  }}
                >
                  {board[index]}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        {winner ? (
          <div>
            <p>プレイヤー{winner}の勝利です！</p>
            <button onClick={resetGame}>もう一度プレイ</button>
          </div>
        ) : board.every(cell => cell) ? (
          <div>
            <p>引き分けです！</p>
            <button onClick={resetGame}>もう一度プレイ</button>
          </div>
        ) : (
          <p>プレイヤー{currentPlayer}の番です</p>
        )}
      </div>
    </div>
  );
}

// Appコンポーネント
function App() {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);