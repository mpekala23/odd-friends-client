import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ColyseusContext } from "./useColyseus";

const useValidRoom = (data?: { withGameState: boolean }) => {
  const { room, gameState, setRoom, setGameState, setSelf } =
    useContext(ColyseusContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!room || (data?.withGameState && !gameState)) {
      setRoom(null);
      setGameState(null);
      setSelf(null);
      toast.error("Game state invalidated");
      navigate("/");
    }
  }, [room, gameState, setRoom, setGameState, setSelf, navigate, data]);
};

export default useValidRoom;
