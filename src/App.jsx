import { useState, useEffect } from 'react';

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
  const [moviePool, setMoviePool] = useState([]);

  const blurLevels =[30, 20, 10, 5, 0];

  // Automatically fetches your 500 movie registry on launch
  useEffect(() => {
    fetch('https://jsonbin.io')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMoviePool(data);
          const randomMovie = data[Math.floor(Math.random() * data.length)];
          setSecretMovie(randomMovie);
        }
      })
      .catch(err => console.error("Database syncing failed: ", err));
  }, []);

  const startNewGame = () => {
    if (moviePool.length === 0) return;
    const randomMovie = moviePool[Math.floor(Math.random() * moviePool.length)];
    setSecretMovie(randomMovie);
    setCurrentAttempt(0);
    setInputVal('');
    setPastGuesses([]);
    setGameOver(false);
    setIsWin(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);
    if (!val || moviePool.length === 0) {
      setSuggestions([]);
      return;
    }
    const matches = moviePool.map(m => m.title).filter((title, index, self) => 
      title.toLowerCase().includes(val.toLowerCase()) && self.indexOf(title) === index
    ).slice(0, 8); // Limits autocomplete list to top 8 items so it stays sleek
    setSuggestions(matches);
    setShowSuggestions(true);
  };

  const submitGuess = () => {
    if (!inputVal.trim() || gameOver) return;

    const guess = inputVal.trim();
    const isValidMovie = moviePool.some(m => m.title.toLowerCase() === guess.toLowerCase());
    if (!isValidMovie) {
      alert("Please select a movie title directly from the autocomplete dropdown list!");
      return;
    }

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
    <div style={{ 
      minHeight: '100vh', 
      width: '100vw',
      backgroundColor: '#111116',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #201335 0%, #07050c 100%)',
      padding: '40px 20px', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        maxWidth: '1000px', 
        width: '100%', 
        fontFamily: 'system-ui, -apple-system, sans-serif', 
        background: 'rgba(22, 22, 34, 0.8)', 
        backdropFilter: 'blur(16px)',
        color: '#fff', 
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: '0 25px 50px rgba(0,0,0,0.7)', 
        border: '1px solid rgba(255,255,255,0.06)',
        textAlign: 'center' 
      }}>
        
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '42px', margin: 0, fontWeight: '900', letterSpacing: '6px', background: 'linear-gradient(45deg, #ff4e50, #f9d423)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MOVIELE</h1>
          <p style={{ fontSize: '14px', color: '#aaa', margin: '6px 0 0 0', letterSpacing: '2px', fontWeight: 'bold' }}>500 MOVIE MEGALIST MODE</p>
        </div>

        {moviePool.length === 0 ? (
          <p style={{ color: '#ffb703', fontSize: '18px', fontWeight: 'bold' }}>🎬 Loading up your 500 movie database... One brief moment!</p>
        ) : !gameOver ? (
          <div>
            <div style={{ position: 'relative', width: '260px', height: '370px', margin: '0 auto 30px auto', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg viewBox="0 0 200 300" style={{ width: '100%', height: '100%', filter: `blur(${blurLevels[currentAttempt]}px)`, transition: 'filter 0.5s ease' }}>
                <rect width="200" height="300" fill="#1b263b"/>
                <circle cx="100" cy="110" r="45" fill="#e63946" opacity="0.8"/>
                <polygon points="40,300 100,160 160,300" fill="#000814"/>
                <rect x="85" y="200" width="30" height="40" fill="#ffb703" opacity="0.6"/>
              </svg>
            </div>

            <div style={{ background: 'rgba(255, 78, 80, 0.08)', borderLeft: '5px solid #ff4e50', padding: '18px 24px', borderRadius: '8px', marginBottom: '24px', textAlign: 'left' }}>
              <span style={{ fontSize: '12px', color: '#ff4e50', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>QUOTE HINT:</span>
              <p style={{ margin: 0, fontStyle: 'italic', fontSize: '18px', color: '#eee', lineHeight: '1.4' }}>"{secretMovie.quote}"</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', justifyContent: 'center' }}>
              {[...Array(maxAttempts)].map((_, i) => (
                <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', background: i < currentAttempt ? '#f44336' : '#2b2b3d' }} />
              ))}
            </div>

            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input 
                type="text" 
                value={inputVal}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 250)}
                placeholder="Search across 500 cinematic blockbusters..." 
                style={{ width: '100%', boxSizing: 'border-box', padding: '16px 22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: '#0f0f15', color: '#fff', fontSize: '16px', outline: 'none' }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div style={{ position: 'absolute', width: '100%', background: '#161622', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', maxHeight: '180px', overflowY: 'auto', zIndex: 10, marginTop: '6px', textAlign: 'left', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                  {suggestions.map((title, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setInputVal(title); setShowSuggestions(false); }}
                      style={{ padding: '14px 16px', cursor: 'pointer', fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}
                      onMouseOver={(e) => e.target.style.background = '#252538'}
                      onMouseOut={(e) => e.target.style.background = 'transparent'}
                    >
                      {title}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button onClick={submitGuess} style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '12px', background: 'linear-gradient(45deg, #ff4e50, #f9d423)', color: '#fff', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(255, 78, 80, 0.2)' }}>
              SUBMIT GUESS
            </button>

            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
              {pastGuesses.map((g, i) => (
                <div key={i} style={{ padding: '12px 16px', borderRadius: '8px', fontSize: '15px', background: '#1f1f2e', color: '#aaa', border: '1px solid rgba(255,255,255,0.05)' }}>❌ {g}</div>
              ))}
            </div>

          </div>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '12px' }}>{isWin ? '🎉' : '💀'}</div>
            <h2 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: '800' }}>{isWin ? 'You Got It!' : 'Game Over'}</h2>
            <p style={{ color: '#aaa', margin: '0 0 24px 0', fontSize: '16px' }}>
              {isWin ? `Splendid! You guessed the movie in ${currentAttempt + 1}/${maxAttempts} attempts.` : 'Better luck next time!'}
            </p>
            <div style={{ maxWidth: '500px', margin: '0 auto 24px auto', background: '#1f1f2e', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '13px', color: '#7a7a9a', display: 'block', marginBottom: '4px', letterSpacing: '0.5px' }}>THE ANSWER WAS:</span>
              <strong style={{ fontSize: '24px', color: '#fff' }}>{secretMovie.title}</strong>
            </div>
            <button onClick={startNewGame} style={{ padding: '16px 40px', border: 'none', background: 'linear-gradient(45deg, #ff4e50, #f9d423)', color: '#fff', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 5px 15px rgba(255, 78, 80, 0.3)' }}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
