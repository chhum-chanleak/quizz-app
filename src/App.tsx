import React, { useState } from "react";
import { fetchQuestions } from "./API";
//components
import { QuestionCard } from "./components/QuestionCard";
//types
import { Difficulty, QuestionState } from "./API";
//styles
import { Wrapper, GlobalStyle } from "./app-style";
import Footer from "./components/footer";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  //hooks
  const [loading, loadingSet] = useState(false);
  const [questions, questionsSet] = useState<QuestionState[]>([]);
  const [number, numberSet] = useState(0);
  const [userAnswers, userAnswersSet] = useState<AnswerObject[]>([]);
  const [score, scoreSet] = useState(0);
  const [gameOver, gameOverSet] = useState(true);

  const TOTAL_QUESTIONS = 10;

  console.log(questions);

  //functions
  const startTrivia = async () => {
    loadingSet(true);
    gameOverSet(false);

    const newQuestion = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY);

    questionsSet(newQuestion);
    scoreSet(0);
    userAnswersSet([]);
    numberSet(0);
    loadingSet(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value;
      // check answer with correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) {
        scoreSet((prev) => prev + 1);
      }
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      userAnswersSet((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    //go to the next question
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      gameOverSet(true);
    } else {
      numberSet(nextQ);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quizz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            {" "}
            Start Quiz
          </button>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}

        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
