'use client';

import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

export default function Result() {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score'), 10) || 0;
  const total = parseInt(searchParams.get('total'), 10) || 10;

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score >= 6) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); 
    }
  }, [score]);

  let message = "💡 Keep Practicing!";
  if (score >= 8) {
    message = "🎯 You Nailed It!";
  } else if (score >= 6) {
    message = "🔥 Awesome Job!";
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      {showConfetti && <Confetti />}
      
      <h1 className="text-4xl font-bold mb-4">{message}</h1>
      <p className="text-lg">You scored <span className="font-bold text-green-400">{score}</span> out of <span className="font-bold text-blue-400">{total}</span></p>
      
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Play Again
      </button>
    </div>
  );
}
