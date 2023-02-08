import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useColyseus from "../hooks/useColyseus";

export default function Home() {
  const navigate = useNavigate();
  const { createRoom, joinRoom, clearColyseus } = useColyseus();

  const handleNewGame = async () => {
    try {
      await createRoom("game_room");
      navigate("lobby");
    } catch (e) {
      toast.error("Can't create room");
      clearColyseus();
    }
  };

  const handleJoinGame = async () => {
    try {
      await joinRoom("game_room");
      navigate("lobby");
    } catch (e) {
      toast.error("Can't join room");
      clearColyseus();
    }
  };

  return (
    <div>
      <p className="text-2xl">ODD FRIENDS</p>
      <p className="text-md mb-8">
        The game of quantifying <span className="italic">everything</span> about
        your friends.
      </p>
      <Button async onClick={handleNewGame}>
        New Game
      </Button>
      <Button async onClick={handleJoinGame}>
        Join Game
      </Button>
    </div>
  );
}
