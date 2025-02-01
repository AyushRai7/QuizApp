'use client';
import { useEffect, useState } from 'react';
import { fetchQuizData } from '@/utils/fetchquiz';
import { useRouter } from 'next/navigation';

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchQuizData()
      .then((data) => {
        console.log('Fetched quiz data:', data);
        if (data.questions) {
          setQuestions(data.questions);
        } else {
          console.error('No questions found in the data');
        }
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, []);

  const handleAnswer = (selectedIndex) => {
    console.log('Selected Option Index:', selectedIndex);
    if (questions[currentIndex]?.options[selectedIndex]?.is_correct) {
      console.log('Correct answer selected');
      setScore(score + 1);
    }
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push(`/result?score=${score + 1}&total=${questions.length}`);
    }
  };

  if (questions.length === 0) {
    return <p className="text-white text-center mt-10">Loading or No Data Available...</p>;
  }

  return (
    <div
      className="font-poppins min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bg3.jpg')" }}
    >
      <div className="max-w-lg w-full p-6 bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
        <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden mb-4">
          <div className="h-full bg-green-500" style={{ width: `${(currentIndex / questions.length) * 100}%` }}></div>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-white">
          {questions[currentIndex]?.description}
        </h2>

        {questions[currentIndex]?.options?.map((opt, index) => (
          <button
            key={opt.id}
            className="w-full p-3 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => handleAnswer(index)}
          >
            {opt.description}
          </button>
        ))}
      </div>
    </div>
  );
}
