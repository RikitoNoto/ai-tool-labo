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

function CryptoGame() {
  const [numbers, setNumbers] = React.useState([]);  // 手段の数字5枚
  const [target, setTarget] = React.useState(null);  // 目的の数字
  const [formula, setFormula] = React.useState('');  // プレイヤーの計算式
  const [gameState, setGameState] = React.useState('start');  // start, playing, checking, won
  const [score, setScore] = React.useState(0);
  const [consecutiveWins, setConsecutiveWins] = React.useState(0);

  // カードデッキの生成（1-25の数字）
  const generateDeck = () => {
    const deck = [];
    // 1-6は各3枚
    for (let i = 1; i <= 6; i++) {
      for (let j = 0; j < 3; j++) deck.push(i);
    }
    // 7-10は各3枚
    for (let i = 7; i <= 10; i++) {
      for (let j = 0; j < 3; j++) deck.push(i);
    }
    // 11-17は各2枚
    for (let i = 11; i <= 17; i++) {
      for (let j = 0; j < 2; j++) deck.push(i);
    }
    // 18-25は各1枚
    for (let i = 18; i <= 25; i++) {
      deck.push(i);
    }
    return deck;
  };

  // 新しいゲームの開始
  const startNewGame = () => {
    const deck = generateDeck();
    // デッキをシャッフル
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    setNumbers(deck.slice(0, 5));  // 最初の5枚
    setTarget(deck[5]);  // 6枚目
    setFormula('');
    setGameState('playing');
  };

  // 計算式の評価
  const evaluateFormula = () => {
    try {
      // 使用された数字をチェック
      const usedNumbers = formula.match(/\d+/g).map(Number);
      const sortedNumbers = [...numbers].sort((a, b) => a - b);
      const sortedUsedNumbers = [...usedNumbers].sort((a, b) => a - b);
      
      if (JSON.stringify(sortedNumbers) !== JSON.stringify(sortedUsedNumbers)) {
        alert('与えられた5つの数字をすべて1回ずつ使用してください');
        return;
      }

      const result = eval(formula);
      if (result === target) {
        const points = Math.pow(2, consecutiveWins);
        setScore(score + points);
        setConsecutiveWins(consecutiveWins + 1);
        setGameState('won');
      } else {
        setConsecutiveWins(0);
        alert('不正解です。もう一度試してください。');
      }
    } catch (e) {
      alert('正しい計算式を入力してください');
    }
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      <h1>クリプト</h1>
      <div style={{ marginBottom: '20px' }}>
        <p>スコア: {score} (連続勝利: {consecutiveWins})</p>
      </div>

      {gameState === 'start' && (
        <div>
          <p>5つの数字を使って、目標の数字を作りましょう！</p>
          <button 
            onClick={startNewGame}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ゲームスタート
          </button>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'won') && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3>手持ちの数字:</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              {numbers.map((num, index) => (
                <div 
                  key={index}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    borderRadius: '5px'
                  }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3>目標の数字: {target}</h3>
          </div>

          {gameState === 'playing' && (
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  width: '300px',
                  marginRight: '10px'
                }}
                placeholder="計算式を入力 (例: 2+3*4-1/5)"
              />
              <button 
                onClick={evaluateFormula}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                確認
              </button>
            </div>
          )}

          {gameState === 'won' && (
            <div>
              <h2>正解！</h2>
              <p>おめでとうございます！</p>
              <button 
                onClick={startNewGame}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                次のゲームへ
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Appコンポーネント
function App() {
  return (
    <div className="App">
      <CryptoGame />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
