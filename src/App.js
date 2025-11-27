import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // СОСТОЯНИЕ ПРИЛОЖЕНИЯ
  const [example, setExample] = useState({ num1: 0, num2: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // ФУНКЦИЯ ГЕНЕРАЦИИ НОВОГО ПРИМЕРА
  const generateExample = () => {
    const num1 = Math.floor(Math.random() * 50) + 1;
    const num2 = Math.floor(Math.random() * 50) + 1;
    setExample({ num1, num2 });
    setUserAnswer('');
    setResult('');
  };

  // ФУНКЦИЯ ПРОВЕРКИ ОТВЕТА
  const checkAnswer = () => {
    const correctAnswer = example.num1 + example.num2;
    const userAnswerNumber = parseInt(userAnswer);
    
    if (isNaN(userAnswerNumber)) {
      setResult('Пожалуйста, введите число!');
      return;
    }
    
    const isCorrect = userAnswerNumber === correctAnswer;
    
    if (isCorrect) {
      setResult('Правильно! ✅');
      setCorrectCount(correctCount + 1);
    } else {
      setResult(`Неправильно! ❌ Правильный ответ: ${correctAnswer}`);
    }
    
    setTotalCount(totalCount + 1);
  };

  // ОБРАБОТЧИК КЛАВИШИ ENTER
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  // ГЕНЕРАЦИЯ ПЕРВОГО ПРИМЕРА ПРИ ЗАГРУЗКЕ
  useEffect(() => {
    generateExample();
  }, []);

  // JSX РАЗМЕТКА ИНТЕРФЕЙСА
  return (
    <div className="App">
      <header className="App-header">
        <h1>Тренажёр по математике</h1>
        <p>Решите пример на сложение:</p>
        
        <div className="example-block">
          <span>{example.num1} + {example.num2} = </span>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="?"
            autoFocus
          />
        </div>

        <div className="controls">
          <button onClick={checkAnswer}>Проверить</button>
          <button onClick={generateExample}>Следующий пример</button>
        </div>

        {result && <div className="result">{result}</div>}

        <div className="scoreboard">
          <h3>Ваш счёт:</h3>
          <p>Правильно: {correctCount} из {totalCount}</p>
          {totalCount > 0 && (
            <p>Успеваемость: {((correctCount / totalCount) * 100).toFixed(0)}%</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;