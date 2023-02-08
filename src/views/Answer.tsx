import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import useColyseus from "../hooks/useColyseus";
import useValidRoom from "../hooks/useValidRoom";
import { Answer, Question } from "../types/Game";

export default function AnswerView() {
  const { gameState, self, submitAnswer } = useColyseus();
  // Used for submitting an answer
  const [newAnswer, setNewAnswer] = useState(0);
  const navigate = useNavigate();
  useValidRoom({ withGameState: true });

  useEffect(() => {
    if (!gameState) return;
    if (gameState.roundState === "guess") {
      navigate("/guess");
    }
  }, [gameState, navigate]);

  if (!gameState) return <></>;

  const activeQuestion: Question =
    gameState.questions[Math.max(0, gameState.questions.length - 1)];

  const answer: Answer | null =
    activeQuestion.answers.find(
      (answer) => answer.player.sessionId === self?.sessionId
    ) || null;

  const handleSubmitAnswer = () => {
    try {
      submitAnswer(newAnswer);
    } catch (e) {
      toast.error("Can't submit guess");
    }
  };

  const handleAnswerChange = (str: string) => {
    if (str.length <= 0) {
      setNewAnswer(NaN);
    } else {
      setNewAnswer(parseInt(str));
    }
  };

  return (
    <div>
      <p>Question: {activeQuestion.question}</p>
      {!answer ? (
        <>
          <p>Enter your answer</p>
          <Input onChange={handleAnswerChange} />
          <Button onClick={handleSubmitAnswer}>Submit</Button>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <p className="mr-2">You answered {answer.value}</p>
          </div>
        </>
      )}
      <p>Time left: {Math.floor(gameState.timer / 1000)}</p>
    </div>
  );
}
