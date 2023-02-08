import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ColyseusContext } from "./useColyseus";

const useValidQuestion = () => {
  const { room, gameState, setRoom, setGameState, setSelf } =
    useContext(ColyseusContext);
  const navigate = useNavigate();

  const roundValid =
    gameState &&
    0 <= gameState.gameRound &&
    gameState.gameRound < gameState.questions.length;

  useEffect(() => {
    if (!room || !roundValid) {
      setRoom(null);
      setGameState(null);
      setSelf(null);
      toast.error("Question invalidated");
      navigate("/");
    }
  }, [room, gameState, setRoom, setGameState, setSelf, navigate]);

  if (!roundValid) {
    const dummyQuestion = {
      question: "dummy",
      answers: [],
      guesses: [],
    };
    return dummyQuestion;
  }
  return gameState.questions[gameState.gameRound];
};

export default useValidQuestion;
