import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import PlayerChip from "../components/PlayerChip";
import useColyseus from "../hooks/useColyseus";
import useValidRoom from "../hooks/useValidRoom";

export default function Lobby() {
  const { gameState, self, identifyPlayer, updateRoundState } = useColyseus();
  // Used for submitting a name
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  useValidRoom();

  const handleSubmitName = () => {
    if (newName.length <= 0) return;
    try {
      identifyPlayer(newName);
    } catch (e) {
      toast.error("Can't identify");
    }
  };

  const handleStartGame = () => {
    if (!gameState?.players || gameState.players.length < 2) {
      toast.error("You need at least two players");
      return;
    }
    try {
      updateRoundState("answer");
    } catch (e) {
      toast.error("Can't update round");
    }
  };

  useEffect(() => {
    if (!gameState) return;
    if (gameState.roundState === "answer") {
      navigate("/answer");
    }
  }, [gameState, navigate]);

  return (
    <div className="flex flex-col  w-full">
      {!self ? (
        <>
          <p className="text-xl mb-4">Enter a name:</p>
          <Input onChange={setNewName} />
          <Button onClick={handleSubmitName}>Submit</Button>
        </>
      ) : (
        <>
          <p className="text-xl mb-8">
            <span className="font-bold italic">You're in!</span> When everyone
            is in, the leader can press "Start game!" to, well, start the game.
          </p>
          <div className="flex items-center mb-4">
            <p className="mr-2">You:</p>
            <PlayerChip player={self} />
          </div>
          {gameState?.leader && (
            <div className="flex items-center mb-4">
              <p className="mr-2">Leader:</p>
              <PlayerChip player={gameState?.leader} />
            </div>
          )}
          <p>Other Players:</p>
          <div className="flex">
            {gameState?.players
              .filter((player) => player.sessionId !== self.sessionId)
              .map((player) => (
                <PlayerChip
                  key={player.sessionId}
                  player={player}
                  className="mr-2"
                />
              ))}
          </div>
          {gameState?.leader &&
            gameState.leader.sessionId === self.sessionId && (
              <Button onClick={handleStartGame} className="mt-8">
                Start game!
              </Button>
            )}
        </>
      )}
    </div>
  );
}
