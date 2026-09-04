import { useState, useEffect } from 'react';

const MOVIE_POOL = [
  { title: "Star Wars: A New Hope", quote: "May the Force be with you." },
  { title: "The Matrix", quote: "There is no spoon." },
  { title: "Avatar", quote: "I see you." },
  { title: "Titanic", quote: "I'll never let go, Jack." },
  { title: "Inception", quote: "Your mind is the scene of the crime." },
  { title: "Jaws", quote: "You're gonna need a bigger boat." },
  { title: "The Lion King", quote: "Remember who you are." },
  { title: "The Dark Knight", quote: "Why so serious?" },
  { title: "Toy Story", quote: "To infinity and beyond!" },
  { title: "Gladiator", quote: "Are you not entertained?" },
  { title: "The Wizard of Oz", quote: "There's no place like home." },
  { title: "Forrest Gump", quote: "Life is like a box of chocolates." },
  { title: "The Terminator", quote: "I'll be back." },
  { title: "Back to the Future", quote: "Roads? Where we're going, we don't need roads." },
  { title: "Jurassic Park", quote: "Welcome to Jurassic Park." },
  { title: "Spider-Man", quote: "With great power comes great responsibility." },
  { title: "Finding Nemo", quote: "Just keep swimming." },
  { title: "The Avengers", quote: "I am Iron Man." },
  { title: "The Godfather", quote: "I'm gonna make him an offer he can't refuse." },
  { title: "The Shining", quote: "Here's Johnny!" },
  { title: "E.T. the Extra-Terrestrial", quote: "E.T. phone home." },
  { title: "Scarface", quote: "Say 'hello' to my little friend!" },
  { title: "Fight Club", quote: "The first rule of Fight Club is: You do not talk about Fight Club." },
  { title: "Pulp Fiction", quote: "They call it a Royale with cheese." },
  { title: "The Sixth Sense", quote: "I see dead people." },
  { title: "Braveheart", quote: "They may take our lives, but they'll never take our freedom!" },
  { title: "Rocky", quote: "Yo, Adrian!" },
  { title: "The Shawshank Redemption", quote: "Get busy living, or get busy dying." },
  { title: "Top Gun", quote: "I feel the need... the need for speed!" },
  { title: "Shrek", quote: "Ogres are like onions." },
  { title: "Monsters Inc", quote: "Put that thing back where it came from, or so help me!" },
  { title: "Up", quote: "Adventure is out there!" },
  { title: "The Incredibles", quote: "Where is my super suit?" },
  { title: "Cars", quote: "Ka-chow!" },
  { title: "Home Alone", quote: "Keep the change, ya filthy animal." },
  { title: "Elf", quote: "The best way to spread Christmas cheer is singing loud for all to hear." },
  { title: "Mean Girls", quote: "On Wednesdays we wear pink." },
  { title: "The Hunger Games", quote: "May the odds be ever in your favor." },
  { title: "Harry Potter and the Sorcerer's Stone", quote: "You're a wizard, Harry." },
  { title: "Ghostbusters", quote: "Who you gonna call?" },
  { title: "The Princess Bride", quote: "Hello. My name is Inigo Montoya. You killed my father. Prepare to die." },
  { title: "The Breakfast Club", quote: "Don't you forget about me." },
  { title: "Ferris Bueller's Day Off", quote: "Life moves pretty fast." },
  { title: "The Hangover", quote: "What happens in Vegas stays in Vegas." },
  { title: "Superbad", quote: "I am McLovin." },
  { title: "Step Brothers", quote: "Did we just become best friends?" },
  { title: "Twilight", quote: "About three things I was absolutely positive." },
  { title: "Black Panther", quote: "Wakanda forever!" },
  { title: "Guardians of the Galaxy", quote: "We are Groot." }
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

  const blurLevels =[10, 7, 4, 2, 0];

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
    const matches = MOVIE_POOL.map(m => m.title).filter((title, index, self) => 
      title.toLowerCase().includes(val.toLowerCase()) && self.indexOf(title) === index
    ).slice(0, 8);
    setSuggestions(matches);
    setShowSuggestions(true);
  };

  const submitGuess = () => {
    if (!inputVal.trim() || gameOver) return;

    const guess = inputVal.trim();
    const isValidMovie = MOVIE_POOL.some(m => m.title.toLowerCase() === guess.toLowerCase());
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
          <p style={{ fontSize: '14px', color: '#aaa', margin: '6px 0 0 0', letterSpacing: '2px', fontWeight: 'bold' }}>ULTIMATE SHUFFLE MODE</p>
        </div>

        {!gameOver ? (
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
                placeholder="Search across dozens of blockbuster movies..." 
                style={{ width: '100%', boxSizing: 'border-box', padding: '16px 22px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: '#0f0f15', color: '#fff', fontSize: '16px', outline: 'none' }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div style={{ position: 'absolute', width: '100%', background: '#161622', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', maxHeight: '180px', overflowY: 'auto', zIndex: 10, marginTop: '6px', textAlign: 'left', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                  {suggestions.map((title, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => { setInputVal(title); setShowSuggestions(false); }}
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
             </button>
</div>
)}
</div>
</div>
);
};

export default App;
