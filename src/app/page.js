'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const startQuiz = () => {
    document.cookie = "startedQuiz=true; path=/";
    router.push('/quiz');
  };

  const text = "Quiz Game!"; 
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 200; 
    const delayBetweenLoops = isDeleting && charIndex === 0 ? 1000 : typingSpeed;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        setDisplayText(text.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }

      if (!isDeleting && charIndex === text.length) {
        setTimeout(() => setIsDeleting(true), 1000); 
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
      }
    }, delayBetweenLoops);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting]);

  return (
    <div 
      className="font-poppins h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >

      <h1 className="text-4xl font-bold text-white mb-6">
        Welcome to <span className="text-yellow-300">{displayText}</span>
        <span className="animate-blink">|</span> 
      </h1>

      <button 
        onClick={startQuiz} 
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Start Quiz
      </button>

      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}
