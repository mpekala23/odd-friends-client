import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import useColyseus from "../hooks/useColyseus";
import useValidQuestion from "../hooks/useValidQuestion";
import useValidRoom from "../hooks/useValidRoom";
import { Guess } from "../types/Game";

export default function GuessView() {
  const { gameState, self, submitGuess } = useColyseus();
  // Used for submitting a guess
  const [newGuess, setNewGuess] = useState(0);
  const navigate = useNavigate();
  useValidRoom({ withGameState: true });
  const activeQuestion = useValidQuestion();

  useEffect(() => {
    if (!gameState) return;
    if (gameState.roundState === "bet") {
      navigate("/bet");
    }
  }, [gameState, navigate]);

  if (!gameState) return <></>;

  const guess: Guess | null =
    activeQuestion.guesses.find(
      (guess) => guess.player.sessionId === self?.sessionId
    ) || null;

  const handleSubmitGuess = () => {
    try {
      submitGuess(newGuess);
    } catch (e) {
      toast.error("Can't submit guess");
    }
  };

  const handleGuessChange = (str: string) => {
    if (str.length <= 0) {
      setNewGuess(NaN);
    } else {
      setNewGuess(parseInt(str));
    }
  };

  return (
    <div>
      <p>Question: {activeQuestion.question}</p>
      {!guess ? (
        <>
          <p>Enter your guess</p>
          <Input onChange={handleGuessChange} />
          <Button onClick={handleSubmitGuess}>Submit</Button>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <p className="mr-2">You guessed {guess.value}</p>
          </div>
        </>
      )}
      <p>Time left: {Math.floor(gameState.timer / 1000)}</p>
    </div>
  );
}
