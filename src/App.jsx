javascriptimport { useState, useEffect } from 'react';

const MOVIE_POOL = [
  { title: "Star Wars: A New Hope", quote: "May the Force be with you." },
  { title: "The Matrix", quote: "There is no spoon." },
  { title: "Avatar", quote: "I see you." },
  { title: "Titanic", quote: "I'll never let go, Jack." },
  { title: "Inception", quote: "Your mind is the scene of the crime." }
];

const App = () => {
  const [secretMovie, setSecretMovie] = useState({ title: "", quote: "" });
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [maxAttempts] = useState(5);
  const [inputVal, setInputVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const blurLevels =;

  const startNewGame = () => {
    const randomMovie = MOVIE_POOL[Math.floor(Math.random() * MOVIE_POOL.length)];
    setSecretMovie(randomMovie);
    setCurrentAttempt(0);
    setInputVal('');
    setPastGuesses([]);
    setGameOver(false);
    setIsWin(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    if (!val) {
      setSuggestions([]);
      return;
    }
    const matches = MOVIE_POOL.map(m => m.title).filter(title => 
      title.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(matches);
    setShowSuggestions(true);
  };

  const submitGuess = () => {
    if (!inputVal.trim() || gameOver) return;

    const guess = inputVal.trim();
    const updatedGuesses = [...pastGuesses, guess];
    setPastGuesses(updatedGuesses);

    if (guess.toLowerCase() === secretMovie.title.toLowerCase()) {
      setIsWin(true);
      setGameOver(true);
    } else {
      const nextAttempt = currentAttempt + 1;
      setCurrentAttempt(nextAttempt);
      setInputVal('');
      if (nextAttempt >= maxAttempts) {
        setGameOver(true);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#000', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', fontFamily: 'system-ui, sans-serif', background: '#111', color: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        
        {/* Header */}
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '12px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '800', letterSpacing: '2px', background: 'linear-gradient(45deg, #ff4e50, #f9d423)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MOVIELE</h1>
          <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0 0' }}>DAILY MOVIE PUZZLE</p>
        </div>

        {!gameOver ? (
          <div>
            {/* Poster Clue Box */}
            <div style={{ position: 'relative', width: '200px', height: '300px', margin: '0 auto 20px auto', borderRadius: '8px', overflow: 'hidden', background: '#222' }}>
              <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%', filter: `blur(${blurLevels[currentAttempt]}px)`, transition: 'filter 0.5s ease' }}>
                <rect width="200" height="300" fill="#1b263b"/>
                <circle cx="100" cy="110" r="45" fill="#e63946" opacity="0.8"/>
                <polygon points="40,300 100,160 160,300" fill="#000814"/>
                <rect x="85" y="200" width="30" height="40" fill="#ffb703" opacity="0.6"/>
              </svg>
            </div>

            {/* Quote Clue */}
            <div style={{ background: '#222', borderLeft: '4px solid #ff4e50', padding: '12px', borderRadius: '4px', marginBottom: '20px', textAlign: 'left' }}>
              <span style={{ fontSize: '11px', color: '#ff4e50', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>QUOTE HINT:</span>
              <p style={{ margin: 0, fontStyle: 'italic', fontSize: '15px', color: '#eee' }}>"{secretMovie.quote}"</p>
            </div>

            {/* Tracker Dots */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', justifyContent: 'center' }}>
              {[...Array(maxAttempts)].map((_, i) => (
                <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: i < currentAttempt ? '#f44336' : '#444' }} />
              ))}
            </div>

            {/* Input System */}
            <div style={{ position: 'relative', marginBottom: '12px' }}>
              <input 
                type="text" 
                value={inputVal}
                onChange={handleInputChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Search & select a movie title..." 
                style={{ width: '100%', boxSizing: 'border-box', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: '#1a1a1a', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div style={{ position: 'absolute', width: '100%', background: '#1a1a1a', border: '1px solid #444', borderRadius: '8px', maxHeight: '150px', overflowY: 'auto', zIndex: 10, marginTop: '4px', textAlign: 'left' }}>
                  {suggestions.map((title, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setInputVal(title); setShowSuggestions(false); }}
                      style={{ padding: '10px 12px', cursor: 'pointer', fontSize: '14px', borderBottom: '1px solid #2a2a2a', color: '#fff' }}
                    >
                      {title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={submitGuess} style={{ width: '100%', padding: '12px', border: 'none', borderRadius: '8px', background: 'linear-gradient(45deg, #ff4e50, #f9d423)', color: '#fff', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
              SUBMIT GUESS
            </button>

            {/* Past Guesses Logs */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
              {pastGuesses.map((g, i) => (
                <div key={i} style={{ padding: '8px 12px', borderRadius: '6px', fontSize: '13px', background: '#222', color: '#aaa' }}>❌ {g}</div>
              ))}
            </div>
          </div>
        ) : (
          /* Results Window State */
          <div style={{ padding: '10px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>{isWin ? '🎉' : '💀'}</div>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '22px' }}>{isWin ? 'You Got It!' : 'Game Over'}</h2>
            <p style={{ color: '#aaa', margin: '0 0 20px 0', fontSize: '14px' }}>
              {isWin ? `Splendid! You guessed the movie in ${currentAttempt + 1}/${maxAttempts} attempts.` : 'Better luck next time!'}
            </p>
            <div style={{ background: '#222', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', color: '#888', display: 'block', marginBottom: '4px' }}>THE ANSWER WAS:</span>
              <strong style={{ fontSize: '18px', color: '#fff' }}>{secretMovie.title}</strong>
            </div>
            <button onClick={startNewGame} style={{ padding: '10px 20px', border: 'none', background: 'linear-gradient(45deg, #ff4e50, #f9d423)', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
