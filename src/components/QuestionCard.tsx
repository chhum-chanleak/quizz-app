import React from "react";
//types
import { AnswerObject } from "../App";
//styles
import { Wrapper, ButtonWrapper } from "./QuestionCard-style";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

export const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p>
        Question: {questionNr}/{totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers">
        {answers.map((answer) => (
          <div key={answer}>
            <ButtonWrapper
              key={answer}
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={!!userAnswer}
                value={answer}
                onClick={callback}
              ></button>
            </ButtonWrapper>

            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};
