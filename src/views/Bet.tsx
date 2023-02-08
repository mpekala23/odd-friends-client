import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useColyseus from "../hooks/useColyseus";
import useValidRoom from "../hooks/useValidRoom";
import { Guess, Question } from "../types/Game";

export default function Bet() {
  const { gameState } = useColyseus();
  // Used for submitting a guess
  const navigate = useNavigate();
  useValidRoom({ withGameState: true });

  useEffect(() => {
    if (!gameState) return;
    if (gameState.roundState === "reveal") {
      navigate("/reveal");
    }
  }, [gameState, navigate]);

  if (!gameState) return <></>;

  const activeQuestion: Question =
    gameState.questions[Math.max(0, gameState.questions.length - 1)];

  const sortedGuesses: Guess[] = activeQuestion.guesses.sort((a, b) => {
    if (a.value < b.value) return -1;
    if (a.value === b.value) return 0;
    return 1;
  });

  return (
    <div>
      <p>Question: {activeQuestion.question}</p>
      {sortedGuesses.map((guess) => (
        <>
          <div>Author: {guess.player.name}</div>
          <div>Value: {guess.value}</div>
        </>
      ))}
      <p>Time left: {Math.floor(gameState.timer / 1000)}</p>
    </div>
  );
}
